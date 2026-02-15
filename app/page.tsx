"use client";

import { useRef } from "react";

import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import BookmarkForm from "./components/BookmarkForm"
import BookmarkList from "./components/BookmarkList"

export default function Home() {
  const refreshRef = useRef<() => void>(() => {});
  return(
     <main className="min-h-screen bg-neutral-900 text-neutral-100">
      <Header />
      <div className="flex">
        <Sidebar />
        <section className="flex-1 p-6 space-y-4">
           <BookmarkForm onAdd={() => refreshRef.current()} />

          <BookmarkList onReady={(refresh) => (refreshRef.current = refresh)} />
        </section>
      </div>
    </main>
  )
}
