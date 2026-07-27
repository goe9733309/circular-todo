# Cloud sync setup (Supabase + Google login)

The app ships with cloud sync **switched off**. Until you complete these steps
`supabase-config.js` holds placeholder values, the account button stays hidden,
and the site behaves exactly as it did before — everything in localStorage,
nothing sent anywhere.

## 1. Create the Supabase project

1. Sign up at <https://supabase.com> and create a new project (the free tier is
   enough). Pick a region close to your visitors.
2. Wait for provisioning to finish (~2 minutes).

## 2. Create the tables

1. In the dashboard, open **SQL Editor → New query**.
2. Paste the entire contents of [`supabase-schema.sql`](supabase-schema.sql) and
   click **Run**.
3. Confirm under **Table Editor** that `daily_entries` and `user_settings` exist
   and both show the "RLS enabled" badge. Row Level Security is what keeps one
   account's data private from another — do not disable it.

## 3. Set up Google login

1. In the [Google Cloud console](https://console.cloud.google.com/apis/credentials),
   create an **OAuth 2.0 Client ID** of type *Web application*.
2. Under **Authorised redirect URIs**, add the callback URL Supabase shows you in
   step 3 below. It looks like:
   `https://<your-project-ref>.supabase.co/auth/v1/callback`
3. In Supabase, go to **Authentication → Providers → Google**, enable it, and
   paste in the Client ID and Client Secret from Google. Save.
4. Still in Supabase, go to **Authentication → URL Configuration** and set:
   - **Site URL**: your production origin, e.g. `https://your-domain.pages.dev`
   - **Redirect URLs**: add both your production origin and, for local testing,
     the address you serve the files from (e.g. `http://localhost:8000`).
     Sign-in redirects back to `origin + pathname`, so the page's own URL must be
     covered by one of these entries.

## 4. Point the app at your project

In Supabase open **Project Settings → API** and copy the two public values into
`supabase-config.js`:

```js
global.RoundClockSupabaseConfig = {
  url: "https://<your-project-ref>.supabase.co",
  anonKey: "eyJhbGciOi...."   // the "anon public" key
};
```

The anon key is designed to live in the browser — RLS, not secrecy, is what
protects the data, so committing it is fine. **Never** put the `service_role`
key in this file; it bypasses RLS entirely.

## 5. Test

Serve the folder over HTTP (OAuth redirects don't work from `file://`):

```sh
python -m http.server 8000
```

Then open <http://localhost:8000> and check:

- The **👤 로그인 / Sign in** button appears in the nav.
- Signing in with Google returns you to the page, showing your email.
- Because you already had schedules in this browser, a banner offers to import
  them. Accept it, then check **Table Editor → daily_entries** for the rows.
- Edit an event, reload — the change survives.
- Open the site in a different browser, sign in with the same account, and the
  schedules should appear there too.

## How the sync works

localStorage remains the app's only direct data store. `cloud-sync.js` mirrors
it to Supabase when someone is signed in:

- **On sign-in**, every remote row is written into localStorage and the UI
  re-reads it, so date browsing keeps working against local keys.
- **On every local save** (events, journal, settings), an upsert is queued and
  flushed after a short debounce.
- **Conflicts** are resolved last-write-wins via `updated_at`. Editing the same
  day in two tabs at once means the later write wins.
- **Signing out** does *not* clear localStorage — that store is also guest mode's
  data, so wiping it would delete schedules the visitor still expects to see.
  Use a private window to verify a clean-slate sign-in.

## Data the app stores per account

| Table | Contents |
| --- | --- |
| `daily_entries` | Per-day events (title, times, colour, alarm) and journal text columns |
| `user_settings` | Theme, clock style/size, band thickness, hand/title/label settings, journal font & columns, language |

Google login also gives Supabase the account's email and profile basics, held in
the managed `auth.users` table. `privacy.html` describes all of this to visitors
— keep it in sync if the schema changes.
