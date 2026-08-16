"use client";
import { useState } from "react";

interface SummaryStepProps {
  data: string;
  onChange: (data: string) => void;
}

export default function SummaryStep({
  data,
  onChange,
}: SummaryStepProps) {

  const [loading, setLoading] = useState(false);

const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

const [aiError, setAiError] = useState("");

const [selectedSuggestion, setSelectedSuggestion] =
  useState<number | null>(null);
  
   async function improveWithAI() {

  if (!data.trim()) {
    setAiError(
      "Please enter a professional summary first."
    );
    return;
  }

  setLoading(true);

  setAiError("");
  setAiSuggestions([]);

  try {

    const response = await fetch(
      "/api/ai/resume-content",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          type: "summary",
          summary: data,
        }),
      }
    );

    const contentType =
      response.headers.get("content-type");

    if (!contentType?.includes("application/json")) {
      throw new Error(
        "AI API returned a non-JSON response. Please check authentication or API routing."
      );
    }

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(
        result.error ||
        "Failed to generate AI suggestions."
      );
    }

    setAiSuggestions(result.result.bullets);
    setSelectedSuggestion(null);

  } catch (error: any) {

    console.error("AI Error:", error);

    setAiError(
      error?.message ||
      "Something went wrong while generating AI suggestions."
    );

  } finally {

    setLoading(false);

  }
}

  return (
  <div className="space-y-6">

    <h2 className="text-3xl font-bold">
      Professional Summary
    </h2>

    <textarea
      className="textarea textarea-bordered h-48 w-full"
      placeholder="Write a professional summary..."
      value={data}
      onChange={(e) => onChange(e.target.value)}
    />

    {/* AI Button */}

    <div className="flex justify-end">

      <button
        className="btn btn-accent"
        onClick={improveWithAI}
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="loading loading-spinner loading-sm"></span>
            Improving...
          </>
        ) : (
          <>
            ✨ Improve with AI
          </>
        )}
      </button>

    </div>

    {/* AI Error */}

    {aiError && (
      <div className="alert alert-error">
        <span>{aiError}</span>
      </div>
    )}

    {/* AI Suggestions */}

    {aiSuggestions.length > 0 && (
      <div className="card bg-base-100 border border-accent">

        <div className="card-body">

          <h4 className="font-bold text-lg">
            ✨ AI Suggestions
          </h4>

          <p className="text-sm text-base-content/70">
            Select one suggestion to use in your resume.
          </p>

          <div className="space-y-4 mt-4">

            {aiSuggestions.map((suggestion, index) => (
              <label
                key={index}
                className="flex gap-3 p-4 border border-base-300 rounded-lg cursor-pointer hover:bg-base-200"
              >

                <input
                  type="radio"
                  name="summary-suggestion"
                  className="radio radio-primary mt-1"
                  checked={selectedSuggestion === index}
                  onChange={() =>
                    setSelectedSuggestion(index)
                  }
                />

                <span className="leading-relaxed">
                  {suggestion}
                </span>

              </label>
            ))}

          </div>

          {/* AI Actions */}

          <div className="flex justify-end gap-3 mt-4">

            <button
              className="btn btn-ghost"
              onClick={() => {
                setAiSuggestions([]);
                setSelectedSuggestion(null);
              }}
            >
              Dismiss
            </button>

            <button
              className="btn btn-primary"
              disabled={selectedSuggestion === null}
              onClick={() => {
                if (selectedSuggestion !== null) {
                  onChange(
                    aiSuggestions[selectedSuggestion]
                  );

                  setAiSuggestions([]);
                  setSelectedSuggestion(null);
                }
              }}
            >
              Use Selected
            </button>

          </div>

        </div>

      </div>
    )}

  </div>
);
}