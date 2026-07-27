// Supabase connection settings for optional cloud sync.
//
// Fill these in with the values from your Supabase project
// (Dashboard -> Project Settings -> API). See SUPABASE_SETUP.md.
//
// The anon key is a public, browser-safe key: it only grants what the
// Row Level Security policies in supabase-schema.sql allow. It is not a
// secret and is meant to be committed. Never put the service_role key here.
//
// While these stay as placeholders, the app runs in guest mode only —
// no login button is shown and nothing is ever sent off the browser.
(function (global) {
  global.RoundClockSupabaseConfig = {
    url: "YOUR_SUPABASE_PROJECT_URL",
    anonKey: "YOUR_SUPABASE_ANON_KEY"
  };
})(window);
