"use client";

import { supabase } from "../lib/supabaseClient";
import { useState } from "react";
import useAuth from "./Auth";

export default function BookmarkForm({ onAdd }: { onAdd: () => void }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const { user } = useAuth();

  const isDisabled = !user;

  const addBookmark = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !title || !url) return;

    const { error } = await supabase.from("bookmarks").insert({
      title,
      url,
      user_id: user.id,
    });

    if (!error) {
      setTitle("");
      setUrl("");
      onAdd();
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          disabled={isDisabled}
          className={`flex-1 px-3 py-2 rounded border
            ${
              isDisabled
                ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                : "bg-neutral-800 border-neutral-700"
            }`}
        />

        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          disabled={isDisabled}
          className={`flex-1 px-3 py-2 rounded border
            ${
              isDisabled
                ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                : "bg-neutral-800 border-neutral-700"
            }`}
        />

        <button
          onClick={addBookmark}
          disabled={isDisabled}
          title={isDisabled ? "Sign in to add bookmarks" : ""}
          className={`px-4 py-2 rounded
            ${
              isDisabled
                ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500"
            }`}
        >
          Add
        </button>
      </div>

      {!user && (
        <p className="text-sm text-neutral-400">
          Sign in to add your bookmarks
        </p>
      )}
    </div>
  );
}