"use client";
import SourcesPanel from "@/components/SourcesPanel";
import { useState } from "react";

export default function Home() {
  const [audioUrl, setAudioUrl] = useState(null);

  return (
    <main className="flex min-h-screen gap-5 bg-slate-100 p-8">
      <div className="w-1/5 rounded-2xl bg-background p-5">
        <SourcesPanel setAudioUrl={setAudioUrl} />
      </div>
      <div className="flex-1 rounded-2xl bg-background p-8">
        <h1 className="text-2xl font-bold">PodPanda</h1>
        {audioUrl && (
          <audio controls className="">
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
    </main>
  );
}
