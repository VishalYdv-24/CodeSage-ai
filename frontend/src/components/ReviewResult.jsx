import Prism from "prismjs";
import "prismjs/components/prism-python";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-go";
import { useEffect, useState } from "react";
import DiffView from "./DiffView";
import Editor from "@monaco-editor/react";

export default function ReviewResult({ review }) {
  const [copied, setCopied] = useState(false);
  const [view, setView] = useState("final"); // "final" | "diff"

  useEffect(() => {
    if (review) {
      Prism.highlightAll();
      setCopied(false);
      setView("final"); // reset view on new review
    }
  }, [review]);

  if (!review) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(review.improved_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      console.error("Copy failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">AI Review</h2>

        {/* View Toggle */}
        <div className="flex rounded-lg border overflow-hidden">
          <button
            onClick={() => setView("final")}
            className={`px-4 py-1 text-sm ${
              view === "final"
                ? "bg-black text-white"
                : "bg-white text-gray-700"
            }`}
          >
            Final
          </button>
          <button
            onClick={() => setView("diff")}
            className={`px-4 py-1 text-sm ${
              view === "diff" ? "bg-black text-white" : "bg-white text-gray-700"
            }`}
          >
            Diff
          </button>
        </div>
      </div>

      {/* FINAL VIEW */}
      {view === "final" && (
        <>
          <p className="mb-3 text-gray-700">{review.summary}</p>

          <h3 className="font-semibold mb-1">Issues</h3>
          <ul className="list-disc list-inside mb-4 text-sm text-red-600">
            {review.issues.map((issue, index) => (
              <li key={index}>{issue}</li>
            ))}
          </ul>

          <h3 className="font-semibold mb-2">Improved Code</h3>

          <div className="relative">
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 text-xs px-2 py-1 rounded
                         bg-gray-800 text-white hover:bg-gray-700 transition"
            >
              {copied ? "Copied!" : "Copy"}
            </button>

            <div className="relative border rounded-lg overflow-hidden">
              <button
                onClick={handleCopy}
                className="absolute top-2 right-2 z-10 text-xs px-2 py-1 rounded
               bg-gray-800 text-white hover:bg-gray-700 transition"
              >
                {copied ? "Copied!" : "Copy"}
              </button>

              <Editor
                height="220px"
                language="python"
                theme="vs-dark"
                value={review.improved_code}
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  fontSize: 14,
                  wordWrap: "on",
                  automaticLayout: true,
                }}
              />
            </div>
          </div>

          <p className="mt-3 font-semibold">
            Rating: <span className="text-blue-600">{review.rating}/10</span>
          </p>
        </>
      )}

      {/* DIFF VIEW */}
      {view === "diff" && (
        <DiffView
          oldCode={review.original_code}
          newCode={review.improved_code}
        />
      )}
    </div>
  );
}
