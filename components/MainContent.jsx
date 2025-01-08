const transcript = [
  {
    speaker: "Person1",
    text: "Welcome to PODCASTIFY  - Your Personal Generative AI Podcast!  We're diving into the world of Podcastfy – turning anything into a podcast!  Pretty cool, huh?",
    start: 0.0,
    end: 8.88,
  },
  {
    speaker: "Person2",
    text: "Absolutely! This open-source project is a game changer! It's like NotebookLM's podcast feature, but, you know, open source and way more flexible.  I mean, taking websites, PDFs, images, YouTube videos…anything, really, and making it a conversation? Genius!",
    start: 9.6,
    end: 24.52,
  },
  {
    speaker: "Person1",
    text: "Total genius.  I see, interesting.  They're even using GenAI to make the conversations engaging and multilingual.  Think about the possibilities!",
    start: 25.04,
    end: 33.44,
  },
  {
    speaker: "Person2",
    text: "It's not just about summarizing research either, like some other tools.  It's about creating a real podcast experience.  They've got testimonials raving about how easy it is to use, even for non-techies! And the audio examples?  Seriously impressive.",
    start: 33.72,
    end: 48.4,
  },
  {
    speaker: "Person1",
    text: "I listened to the Taylor Swift one – amazing! Uh, did you catch the part about local LLMs?  Privacy and control?  That's a big deal.",
    start: 49.12,
    end: 56.6,
  },
  {
    speaker: "Person2",
    text: "Huge! Got it.  And the customization?  Short podcasts, long podcasts, different languages, different TTS models...it's all there! They even have a CLI.  Talk about flexibility.",
    start: 57.24,
    end: 67.28,
  },
  {
    speaker: "Person1",
    text: "I'm really impressed with the multi-speaker TTS and the ability to generate podcasts from just a topic. Real-time web search to ground the conversation? Wow!  They've thought of everything!",
    start: 67.76,
    end: 78.6,
  },
  {
    speaker: "Person2",
    text: "They really have. I'm a bit skeptical, though, about how well it handles complex topics.  Can it really capture the nuance of, say, a scientific research paper and make it into a natural-sounding conversation?",
    start: 79.48,
    end: 91.52,
  },
  {
    speaker: "Person1",
    text: "That's a valid point.  I think the examples show they're getting pretty close. But, yeah, more complex topics could be a challenge. Still,  it's open-source!  The community can help improve it.",
    start: 92.4,
    end: 103.2,
  },
  {
    speaker: "Person2",
    text: "True! And think about the accessibility impact! Converting content to audio helps so many people.",
    start: 103.88,
    end: 109.36,
  },
  {
    speaker: "Person1",
    text: "Exactly!  Educators, researchers, content creators…the possibilities are endless. Uh, so, should we check out the code?",
    start: 110.0,
    end: 116.92,
  },
  {
    speaker: "Person2",
    text: "Let's do it! I'm curious to see how they've implemented all these features.  And maybe contribute some code ourselves!",
    start: 117.2,
    end: 124.08,
  },
  {
    speaker: "Person1",
    text: "That's the spirit! Thanks for tuning in everyone, and we'll see you next time on PODCASTIFY!",
    start: 124.48,
    end: 129.12,
  },
];

// export default function MainContent({ audioUrl }) {
//   return (
//     <div className="flex h-full flex-col gap-10">
//       <h2 className="text-2xl font-bold">PodPanda</h2>
//       <div className="flex flex-1 flex-col overflow-y-scroll">
//         {transcript.map((entry, index) => (
//           <div
//             key={index}
//             className="w-full rounded-lg bg-gray-50 p-4 shadow-sm"
//           >
//             <div className="mb-2 font-medium text-gray-600">
//               {entry.speaker}
//             </div>
//             <div className="text-gray-800">{entry.text}</div>
//             <div className="mt-2 text-xs text-gray-400">
//               {entry.start.toFixed(2)}s - {entry.end.toFixed(2)}s
//             </div>
//           </div>
//         ))}
//       </div>
//       <div>
//         {audioUrl && (
//           <audio controls className="w-full" key={audioUrl}>
//             <source src={audioUrl} type="audio/mpeg" />
//             Your browser does not support the audio element.
//           </audio>
//         )}
//       </div>
//     </div>
//   );
// }
import { useRef, useState } from "react";
export default function MainContent({ audioUrl }) {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const activeParaRef = useRef(null);

  // Find current transcript entry based on audio time
  const getCurrentEntry = (time) => {
    return transcript.findIndex(
      (entry) => time >= entry.start && time <= entry.end,
    );
  };

  // Handle time update from audio player
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
    if (activeParaRef.current) {
      activeParaRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  // Handle click on transcript entry
  const handleEntryClick = (start) => {
    if (audioRef.current) {
      audioRef.current.currentTime = start;
      if (!isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="flex h-full flex-col gap-10">
      <h2 className="text-2xl font-bold">PodPanda</h2>
      <div className="flex flex-1 flex-col overflow-y-scroll">
        {transcript.map((entry, index) => {
          const isActive = getCurrentEntry(currentTime) === index;
          return (
            <div
              key={index}
              ref={isActive ? activeParaRef : null}
              onClick={() => handleEntryClick(entry.start)}
              className={`w-full cursor-pointer rounded-lg p-4 shadow-sm transition-colors ${
                isActive ? "border-2 border-blue-200 bg-blue-50" : "bg-gray-50"
              }`}
            >
              <div className="mb-2 font-medium text-gray-600">
                {entry.speaker}
              </div>
              <div className="text-gray-800">{entry.text}</div>
              <div className="mt-2 text-xs text-gray-400">
                {entry.start.toFixed(2)}s - {entry.end.toFixed(2)}s
              </div>
            </div>
          );
        })}
      </div>
      <div>
        {audioUrl && (
          <audio
            ref={audioRef}
            controls
            className="w-full"
            key={audioUrl}
            onTimeUpdate={handleTimeUpdate}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
    </div>
  );
}
