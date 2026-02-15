"use client";

import { supabase } from "../lib/supabaseClient";
import { useEffect, useState } from "react";
import BookmarkItem from "./BookmarkItem";

export default function BookmarkList({
  onReady,
}: {
  onReady: (fn: () => void) => void;
}) {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchBookmarks = async () => {
    if (!userId) return;

    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false });

    setBookmarks(data || []);
  };

  useEffect(() => {
    if (!userId) {
      setBookmarks([]);
      return;
    }

    fetchBookmarks();
    onReady(fetchBookmarks);
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel(`bookmarks-${userId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
          filter: `user_id=eq.${userId}`,
        },
        () => {
          fetchBookmarks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  return (
    <div className="space-y-2">
      {bookmarks.map((bookmark) => (
        <BookmarkItem
          key={bookmark.id}
          bookmark={bookmark}
          onDelete={fetchBookmarks}
        />
      ))}

      {userId && bookmarks.length === 0 && (
        <p className="text-sm text-neutral-400">No bookmarks yet</p>
      )}
    </div>
  );
}