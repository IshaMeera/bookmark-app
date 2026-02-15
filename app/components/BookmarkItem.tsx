"use client";

import { supabase } from "../lib/supabaseClient";

export default function BookmarkItem({bookmark, onDelete}: any) {
    const deleteBookmark = async () => {
        await supabase.from("bookmarks").delete().eq("id", bookmark.id);
        onDelete();
    }

    return(
        <div className="flex items-center justify-between p-3 rounded bg-neutral-800 hover:bg-neutral-700">
            <div>
                <p className="font-medium">{bookmark.title}</p>
                <a
                href={bookmark.url}
                target="_blank"
                className="text-sm text-blue-400"
                >
                    {bookmark.url}
                </a>
            </div>
            <button
                onClick={deleteBookmark}
                className="text-neutral-400 hover:text-red-400"
            >
                delete
            </button>
        </div>
    )
}