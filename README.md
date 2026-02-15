⚡ Features

Google OAuth login (no passwords)
Bookmarks are private per user (Row Level Security)
Add & delete bookmarks
Realtime updates across multiple tabs/devices
Clean, Chrome-inspired UI
Logged-out users cannot add bookmarks (clear UX hint)

Challenges Faced:

Supabase Realtime configuration
Realtime updates require the target table to be added to the supabase_realtime publication.
This setting is not enabled by default for new tables.
The issue was resolved by explicitly enabling realtime for the bookmarks table using SQL:

`alter publication supabase_realtime add table bookmarks;`

Auth state & data fetching timing
Initial data fetches ran before the auth session was fully restored, resulting in empty results due to Row Level Security.
This was resolved by binding data fetching and realtime subscriptions to the authenticated user state.