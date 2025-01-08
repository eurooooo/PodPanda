"use client";
import MainContent from "@/components/MainContent";
import SourcesPanel from "@/components/SourcesPanel";
import { useState } from "react";

export default function Home() {
  const [audioUrl, setAudioUrl] = useState(null);

  return (
    <main className="flex h-screen gap-5 bg-slate-100 p-6">
      <div className="w-80 rounded-2xl bg-background p-5">
        <SourcesPanel setAudioUrl={setAudioUrl} />
      </div>
      <div className="h-full flex-1 rounded-2xl bg-background p-5">
        <MainContent audioUrl={audioUrl} />
      </div>
    </main>
  );
}
