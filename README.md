⚡ Features

Google OAuth login (no passwords)
Bookmarks are private per user (Row Level Security)
Add & delete bookmarks
Realtime updates across multiple tabs/devices
Clean, Chrome-inspired UI
Logged-out users cannot add bookmarks (clear UX hint)

🛠 Tech Stack

Next.js (App Router, TypeScript)
Supabase
Auth (Google OAuth)
Postgres DB
Realtime
Tailwind CSS

🔒 Security Notes

Row Level Security (RLS) ensures users can only access their own bookmarks
user_id is mandatory and enforced at DB level
Supabase anon key is safe due to RLS (no service keys in frontend)

⚡ Realtime

Bookmarks sync instantly across tabs using Supabase Realtime on Postgres changes (INSERT, DELETE, UPDATE).