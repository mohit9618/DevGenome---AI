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

    </div>
  );
}