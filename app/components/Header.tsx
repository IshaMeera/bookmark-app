"use client";

import useAuth from "./Auth";

export default function Header() {
  const { user, signInWithGoogle, signOut } = useAuth();

  const name =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    "there";

  return (
    <header className="h-14 flex items-center justify-between px-6 bg-neutral-800 border-b border-neutral-700">
      <h1 className="text-lg font-semibold">Bookmarks</h1>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm text-neutral-300">
              Welcome, <span className="font-medium">{name}</span>
            </span>
            <button
              onClick={signOut}
              className="px-3 py-1.5 text-sm bg-red-500 rounded hover:bg-red-400"
            >
              Sign out
            </button>
          </>
        ) : (
          <button
            onClick={signInWithGoogle}
            className="px-3 py-1.5 text-sm bg-black text-white rounded"
          >
            Sign in with Google
          </button>
        )}
      </div>
    </header>
  );
}