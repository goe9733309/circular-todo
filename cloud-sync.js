// Optional cloud sync for the round 24-hour clock.
//
// Design: localStorage stays the app's only direct data store. This layer
// mirrors localStorage <-> Supabase when (and only when) the visitor is
// logged in. Guest mode is untouched — if the config is missing, the
// supabase-js script failed to load, or nobody is signed in, every function
// here is a no-op and the app behaves exactly as it always has.
(function (global) {
  "use strict";

  var EVENTS_PREFIX = "roundClock_events_";
  var JOURNAL_PREFIX = "roundClock_journal_";
  var IMPORT_DONE_PREFIX = "roundClock_cloudImported_";

  // Global (not per-date) settings mirrored into the user_settings row.
  var SETTINGS_KEYS = [
    "roundClock_theme",
    "roundClock_clockStyle",
    "roundClock_clockSize",
    "roundClock_bandThickness",
    "roundClock_handSettings",
    "roundClock_titleSettings",
    "roundClock_labelSettings",
    "roundClock_journalBg",
    "roundClock_journalFont",
    "roundClock_journalFontSize",
    "roundClock_journalColumns",
    "roundClock_lang"
  ];

  var PUSH_DEBOUNCE_MS = 1200;

  var client = null;
  var currentUser = null;
  var bridge = null;
  var pendingDates = {};
  var settingsDirty = false;
  var pushTimer = null;
  var syncing = false;

  function isConfigured() {
    var cfg = global.RoundClockSupabaseConfig;
    return !!(cfg &&
      cfg.url && cfg.url.indexOf("YOUR_SUPABASE") === -1 &&
      cfg.anonKey && cfg.anonKey.indexOf("YOUR_SUPABASE") === -1);
  }

  function isAvailable() {
    return !!(client && currentUser);
  }

  function lsGet(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function lsSet(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      // Storage full or blocked — the cloud copy is still authoritative.
    }
  }

  function lsRemove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      // Nothing to do.
    }
  }

  function t(key, fallback) {
    var i18n = global.RoundClockI18n;
    if (i18n && typeof i18n.t === "function") {
      var value = i18n.t(key);
      if (typeof value === "string") {
        return value;
      }
    }
    return fallback;
  }

  function notify(titleKey, titleFallback, bodyKey, bodyFallback, icon) {
    if (bridge && typeof bridge.showToast === "function") {
      bridge.showToast(t(titleKey, titleFallback), t(bodyKey, bodyFallback), icon || "☁️");
    }
  }

  // ---------------------------------------------------------------- local read

  function isDateKey(str) {
    return /^\d{4}-\d{2}-\d{2}$/.test(str);
  }

  // Every date that has any local data (events or journal text).
  function localDates() {
    var seen = {};
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (!key) {
          continue;
        }
        if (key.indexOf(EVENTS_PREFIX) === 0) {
          var d = key.slice(EVENTS_PREFIX.length);
          if (isDateKey(d)) {
            seen[d] = true;
          }
        } else if (key.indexOf(JOURNAL_PREFIX) === 0) {
          // roundClock_journal_2026-07-28 or ..._2026-07-28_c2
          var rest = key.slice(JOURNAL_PREFIX.length);
          var datePart = rest.slice(0, 10);
          if (isDateKey(datePart)) {
            seen[datePart] = true;
          }
        }
      }
    } catch (e) {
      return [];
    }
    return Object.keys(seen);
  }

  function readLocalDaily(dateStr) {
    var events = [];
    var raw = lsGet(EVENTS_PREFIX + dateStr);
    if (raw) {
      try {
        var parsed = JSON.parse(raw);
        if (Array.isArray(parsed.events)) {
          events = parsed.events;
        }
      } catch (e) {
        events = [];
      }
    }
    return {
      events: events,
      journal: {
        c1: lsGet(JOURNAL_PREFIX + dateStr) || "",
        c2: lsGet(JOURNAL_PREFIX + dateStr + "_c2") || "",
        c3: lsGet(JOURNAL_PREFIX + dateStr + "_c3") || ""
      }
    };
  }

  function isEmptyDaily(daily) {
    return daily.events.length === 0 &&
      !daily.journal.c1 && !daily.journal.c2 && !daily.journal.c3;
  }

  function readLocalSettings() {
    var out = {};
    for (var i = 0; i < SETTINGS_KEYS.length; i++) {
      var value = lsGet(SETTINGS_KEYS[i]);
      if (value != null) {
        out[SETTINGS_KEYS[i]] = value;
      }
    }
    return out;
  }

  // --------------------------------------------------------------- local write

  function writeLocalDaily(dateStr, daily) {
    var events = Array.isArray(daily.events) ? daily.events : [];
    if (events.length) {
      lsSet(EVENTS_PREFIX + dateStr, JSON.stringify({ date: dateStr, events: events }));
    } else {
      lsRemove(EVENTS_PREFIX + dateStr);
    }

    var journal = daily.journal || {};
    var cols = [
      [JOURNAL_PREFIX + dateStr, journal.c1],
      [JOURNAL_PREFIX + dateStr + "_c2", journal.c2],
      [JOURNAL_PREFIX + dateStr + "_c3", journal.c3]
    ];
    for (var i = 0; i < cols.length; i++) {
      if (cols[i][1]) {
        lsSet(cols[i][0], cols[i][1]);
      } else {
        lsRemove(cols[i][0]);
      }
    }
  }

  function writeLocalSettings(settings) {
    if (!settings) {
      return;
    }
    for (var i = 0; i < SETTINGS_KEYS.length; i++) {
      var key = SETTINGS_KEYS[i];
      if (typeof settings[key] === "string") {
        lsSet(key, settings[key]);
      }
    }
  }

  // ---------------------------------------------------------------- push queue

  function schedulePush() {
    if (!isAvailable()) {
      return;
    }
    clearTimeout(pushTimer);
    pushTimer = setTimeout(flushPush, PUSH_DEBOUNCE_MS);
  }

  function touchDaily(dateStr) {
    if (!isAvailable() || !isDateKey(dateStr)) {
      return;
    }
    pendingDates[dateStr] = true;
    schedulePush();
  }

  function touchSettings() {
    if (!isAvailable()) {
      return;
    }
    settingsDirty = true;
    schedulePush();
  }

  function flushPush() {
    if (!isAvailable()) {
      return;
    }

    var dates = Object.keys(pendingDates);
    pendingDates = {};
    var pushSettingsNow = settingsDirty;
    settingsDirty = false;

    var jobs = [];
    if (dates.length) {
      jobs.push(upsertDailyRows(dates));
    }
    if (pushSettingsNow) {
      jobs.push(upsertSettingsRow());
    }
    if (!jobs.length) {
      return;
    }

    Promise.all(jobs).catch(function (err) {
      logError("push failed", err);
      notify("auth.syncErrorTitle", "동기화 실패",
        "auth.syncErrorBody", "변경 내용은 이 브라우저에 저장되어 있습니다. 잠시 후 다시 시도합니다.", "⚠️");
      // Re-queue so the next change retries this data too.
      for (var i = 0; i < dates.length; i++) {
        pendingDates[dates[i]] = true;
      }
      if (pushSettingsNow) {
        settingsDirty = true;
      }
    });
  }

  function upsertDailyRows(dates) {
    var rows = dates.map(function (dateStr) {
      var daily = readLocalDaily(dateStr);
      return {
        user_id: currentUser.id,
        entry_date: dateStr,
        events: daily.events,
        journal: daily.journal,
        updated_at: new Date().toISOString()
      };
    });
    return client.from("daily_entries")
      .upsert(rows, { onConflict: "user_id,entry_date" })
      .then(throwOnError);
  }

  function upsertSettingsRow() {
    return client.from("user_settings")
      .upsert({
        user_id: currentUser.id,
        settings: readLocalSettings(),
        updated_at: new Date().toISOString()
      }, { onConflict: "user_id" })
      .then(throwOnError);
  }

  function throwOnError(res) {
    if (res && res.error) {
      throw res.error;
    }
    return res;
  }

  // -------------------------------------------------------------------- pull

  // Mirror every remote row into localStorage, then let the app re-read it.
  function pullAll() {
    if (!isAvailable() || syncing) {
      return Promise.resolve();
    }
    syncing = true;
    setStatus(t("auth.statusSyncing", "동기화 중…"));

    return Promise.all([
      client.from("daily_entries").select("entry_date, events, journal").then(throwOnError),
      client.from("user_settings").select("settings").maybeSingle().then(throwOnError)
    ]).then(function (results) {
      var dailyRows = results[0].data || [];
      for (var i = 0; i < dailyRows.length; i++) {
        writeLocalDaily(dailyRows[i].entry_date, {
          events: dailyRows[i].events,
          journal: dailyRows[i].journal
        });
      }

      var settingsRow = results[1].data;
      if (settingsRow && settingsRow.settings) {
        writeLocalSettings(settingsRow.settings);
      }

      syncing = false;
      if (bridge && typeof bridge.reloadFromLocal === "function") {
        bridge.reloadFromLocal();
      }
      renderAuthUI();
      return dailyRows.length;
    }).catch(function (err) {
      syncing = false;
      logError("pull failed", err);
      renderAuthUI();
      notify("auth.syncErrorTitle", "동기화 실패",
        "auth.pullErrorBody", "저장된 일정을 불러오지 못했습니다. 이 브라우저의 데이터를 계속 사용합니다.", "⚠️");
      throw err;
    });
  }

  // ------------------------------------------------------- first-login import

  function importDoneKey() {
    return IMPORT_DONE_PREFIX + currentUser.id;
  }

  // Local dates that the account has no row for yet.
  function findUnsyncedLocalDates() {
    if (!isAvailable()) {
      return Promise.resolve([]);
    }
    return client.from("daily_entries").select("entry_date").then(throwOnError)
      .then(function (res) {
        var remote = {};
        var rows = res.data || [];
        for (var i = 0; i < rows.length; i++) {
          remote[rows[i].entry_date] = true;
        }
        return localDates().filter(function (d) {
          return !remote[d] && !isEmptyDaily(readLocalDaily(d));
        });
      });
  }

  function maybeOfferImport() {
    if (!isAvailable() || lsGet(importDoneKey())) {
      return;
    }
    findUnsyncedLocalDates().then(function (dates) {
      if (!dates.length) {
        // Nothing worth importing — don't ask again for this account.
        lsSet(importDoneKey(), "1");
        return;
      }
      showImportBanner(dates);
    }).catch(function (err) {
      logError("import check failed", err);
    });
  }

  function showImportBanner(dates) {
    var banner = document.getElementById("cloud-import-banner");
    var text = document.getElementById("cloud-import-text");
    if (!banner || !text) {
      return;
    }
    text.textContent = t("auth.importPrompt", "☁️ 이 브라우저에 저장된 {count}일치 일정을 계정으로 가져올까요?")
      .split("{count}").join(String(dates.length));
    banner.hidden = false;

    var importBtn = document.getElementById("cloud-import-btn");
    var dismissBtn = document.getElementById("cloud-import-dismiss");

    function close(remember) {
      banner.hidden = true;
      if (remember) {
        lsSet(importDoneKey(), "1");
      }
    }

    if (importBtn) {
      importBtn.onclick = function () {
        importBtn.disabled = true;
        importLocalDates(dates).then(function () {
          close(true);
          notify("auth.importDoneTitle", "가져오기 완료",
            "auth.importDoneBody", "이 브라우저의 일정을 계정에 저장했습니다.", "✅");
        }).catch(function (err) {
          logError("import failed", err);
          importBtn.disabled = false;
          notify("auth.syncErrorTitle", "동기화 실패",
            "auth.importErrorBody", "가져오기에 실패했습니다. 다시 시도해주세요.", "⚠️");
        });
      };
    }
    if (dismissBtn) {
      dismissBtn.onclick = function () {
        close(true);
      };
    }
  }

  function importLocalDates(dates) {
    return upsertDailyRows(dates).then(function () {
      return upsertSettingsRow();
    });
  }

  // ----------------------------------------------------------------- auth UI

  function setStatus(text) {
    var el = document.getElementById("cloud-status");
    if (el) {
      el.textContent = text || "";
    }
  }

  function renderAuthUI() {
    var wrap = document.getElementById("account-wrap");
    if (!wrap) {
      return;
    }
    wrap.hidden = !client;

    var signedIn = isAvailable();
    var toggle = document.getElementById("account-toggle");
    var emailEl = document.getElementById("account-email");
    var signInBtn = document.getElementById("account-signin");
    var signOutBtn = document.getElementById("account-signout");

    if (toggle) {
      toggle.textContent = signedIn
        ? "☁️ " + t("auth.menuSynced", "동기화 중")
        : "👤 " + t("auth.menuSignIn", "로그인");
    }
    if (emailEl) {
      emailEl.textContent = signedIn ? (currentUser.email || "") : "";
      emailEl.hidden = !signedIn;
    }
    if (signInBtn) {
      signInBtn.hidden = signedIn;
    }
    if (signOutBtn) {
      signOutBtn.hidden = !signedIn;
    }
    if (!signedIn) {
      setStatus(t("auth.statusGuest", "이 브라우저에만 저장됩니다"));
    } else if (!syncing) {
      setStatus(t("auth.statusSynced", "계정에 저장됩니다"));
    }
  }

  function signIn() {
    if (!client) {
      return;
    }
    // Strip any leftover OAuth fragment so the redirect target stays clean.
    var redirectTo = global.location.origin + global.location.pathname;
    client.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: redirectTo }
    }).then(throwOnError).catch(function (err) {
      logError("sign-in failed", err);
      notify("auth.signInErrorTitle", "로그인 실패",
        "auth.signInErrorBody", "로그인을 시작할 수 없습니다. 잠시 후 다시 시도해주세요.", "⚠️");
    });
  }

  // Sign-out deliberately leaves localStorage intact: it is the guest-mode
  // store, and wiping it would destroy data the visitor still expects to see.
  function signOut() {
    if (!client) {
      return;
    }
    clearTimeout(pushTimer);
    flushPush();
    client.auth.signOut().then(function () {
      closeMenu();
    }).catch(function (err) {
      logError("sign-out failed", err);
    });
  }

  function closeMenu() {
    var menu = document.getElementById("account-menu");
    if (menu) {
      menu.classList.add("hidden");
    }
  }

  function initAuthMenu() {
    var toggle = document.getElementById("account-toggle");
    var menu = document.getElementById("account-menu");
    if (!toggle || !menu) {
      return;
    }

    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      menu.classList.toggle("hidden");
    });
    document.addEventListener("click", function (e) {
      if (!menu.classList.contains("hidden") && !menu.contains(e.target) && e.target !== toggle) {
        menu.classList.add("hidden");
      }
    });

    var signInBtn = document.getElementById("account-signin");
    var signOutBtn = document.getElementById("account-signout");
    if (signInBtn) {
      signInBtn.addEventListener("click", signIn);
    }
    if (signOutBtn) {
      signOutBtn.addEventListener("click", signOut);
    }
  }

  function logError(label, err) {
    if (global.console && console.warn) {
      console.warn("[cloud-sync] " + label, err);
    }
  }

  // -------------------------------------------------------------------- init

  function init(appBridge) {
    bridge = appBridge || null;

    if (!isConfigured() || !global.supabase || typeof global.supabase.createClient !== "function") {
      // Guest-only build: hide the account UI entirely.
      renderAuthUI();
      return;
    }

    var cfg = global.RoundClockSupabaseConfig;
    try {
      client = global.supabase.createClient(cfg.url, cfg.anonKey);
    } catch (e) {
      logError("client init failed", e);
      client = null;
      renderAuthUI();
      return;
    }

    initAuthMenu();
    renderAuthUI();

    client.auth.onAuthStateChange(function (event, session) {
      var previousId = currentUser ? currentUser.id : null;
      currentUser = session && session.user ? session.user : null;
      renderAuthUI();

      if (currentUser && currentUser.id !== previousId) {
        pullAll().then(function () {
          maybeOfferImport();
        }).catch(function () {
          // pullAll already surfaced the failure.
        });
      }
    });

    // Restore an existing session on load (also handles the OAuth redirect).
    client.auth.getSession().then(function (res) {
      if (res && res.data && res.data.session && res.data.session.user) {
        if (!currentUser) {
          currentUser = res.data.session.user;
          renderAuthUI();
          pullAll().then(function () {
            maybeOfferImport();
          }).catch(function () {
            // Already reported.
          });
        }
      } else {
        renderAuthUI();
      }
    }).catch(function (err) {
      logError("session restore failed", err);
      renderAuthUI();
    });

    // Last-chance flush so a quick tab close doesn't lose the debounced write.
    global.addEventListener("beforeunload", function () {
      if (pushTimer) {
        clearTimeout(pushTimer);
        flushPush();
      }
    });

    global.addEventListener("roundclock:langchange", renderAuthUI);
  }

  global.RoundClockCloud = {
    init: init,
    isConfigured: isConfigured,
    isSignedIn: isAvailable,
    touchDaily: touchDaily,
    touchSettings: touchSettings,
    signIn: signIn,
    signOut: signOut
  };
})(window);
