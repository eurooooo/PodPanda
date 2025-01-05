"use client";
import { Caladea } from "next/font/google";
import { useState, useRef } from "react";

export default function Home() {
  const [audioUrl, setAudioUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetchaudioUrl = "http://localhost:8000/local-audio";

  const fetchAndPlayAudio = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(fetchaudioUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (error) {
      console.error("Error fetching audio:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Audio Player</h1>

        <button
          onClick={fetchAndPlayAudio}
          disabled={isLoading}
          className={`bg-blue-500 text-white px-4 py-2 rounded 
            ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
        >
          {isLoading ? "Loading..." : "Fetch Audio"}
        </button>

        {audioUrl && (
          <audio controls className="mt-4 w-full">
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
    </main>
  );
}
