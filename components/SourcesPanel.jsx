"use client";
import { useState } from "react";

export default function SourcesPanel({ setAudioUrl }) {
  const [isLoading, setIsLoading] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const apiUrl = "http://localhost:8000";

  const handlePDFUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      alert("Please upload a valid PDF file");
    }
  };

  const fetchAudio = async () => {
    setIsLoading(true);

    try {
      let response;

      if (pdfFile) {
        // Handle PDF upload
        const formData = new FormData();
        formData.append("file", pdfFile);

        response = await fetch(`${apiUrl}/upload-pdf`, {
          method: "POST",
          body: formData,
        });
      } else {
        // Fallback to original URL endpoint
        response = await fetch(`${apiUrl}/local-audio`);
      }

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
    <>
      <h1 className="mb-4 text-2xl font-bold">Audio Player</h1>

      <div className="mb-4">
        <input
          type="file"
          accept=".pdf"
          onChange={handlePDFUpload}
          className="block w-full text-sm text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100"
        />
      </div>

      <button
        onClick={fetchAudio}
        disabled={isLoading}
        className={`w-full rounded bg-blue-500 px-4 py-2 text-white ${isLoading ? "cursor-not-allowed opacity-50" : "hover:bg-blue-600"}`}
      >
        {isLoading ? "Loading..." : "Generate Audio"}
      </button>
    </>
  );
}
