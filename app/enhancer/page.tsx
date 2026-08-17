"use client";

import { useState } from "react";

export default function ResumeEnhancerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    setError("");

    // PDF validation
    if (selectedFile.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      return;
    }

    // 5 MB limit
    const maxSize = 5 * 1024 * 1024;

    if (selectedFile.size > maxSize) {
      setError("PDF size must be less than 5 MB.");
      return;
    }

    setFile(selectedFile);
  }

  function removeFile() {
    setFile(null);
    setError("");
  }

async function handleAnalyze() {
  if (!file) {
    setError("Please upload your resume first.");
    return;
  }

  setError("");

  try {
    const formData = new FormData();

    formData.append("file", file);

    const response = await fetch(
      "/api/ai/resume-enhancer",
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(
        result.error || "Failed to analyze resume."
      );
    }

    setAnalysis(result.analysis);

    

  } catch (error: any) {
    console.error(
      "Resume Enhancer Error:",
      error
    );

    setError(
      error?.message ||
      "Something went wrong while analyzing the resume."
    );
  }
}

  return (
  <div className="max-w-4xl mx-auto space-y-10">

    {/* ========================= */}
    {/* Header */}
    {/* ========================= */}

    <div>
      <h1 className="text-4xl font-bold">
        Resume Enhancer
      </h1>

      <p className="text-base-content/70 mt-2 max-w-2xl">
        Upload your existing resume and get AI-powered
        feedback, section scores, and ATS compatibility insights.
      </p>
    </div>


    {/* ========================= */}
    {/* Upload Card */}
    {/* ========================= */}

    <div className="card bg-base-200 border border-base-300 shadow-sm">

      <div className="card-body space-y-5">

        <div>
          <h2 className="text-2xl font-bold">
            Upload Resume
          </h2>

          <p className="text-sm text-base-content/60 mt-1">
            Upload your resume in PDF format. Maximum file size: 5 MB.
          </p>
        </div>


        {/* File Input */}

        <input
          type="file"
          accept="application/pdf"
          className="file-input file-input-bordered w-full"
          onChange={handleFileChange}
        />


        {/* Error */}

        {error && (
          <div className="alert alert-error">

            <span>
              {error}
            </span>

          </div>
        )}


        {/* Selected File */}

        {file && (
          <div className="flex items-center justify-between
                          bg-base-100 border border-base-300
                          rounded-xl p-4">

            <div className="flex items-center gap-3">

              <div className="text-2xl">
                📄
              </div>

              <div>

                <p className="font-semibold">
                  {file.name}
                </p>

                <p className="text-sm text-base-content/60">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>

              </div>

            </div>


            <button
              className="btn btn-ghost btn-sm"
              onClick={removeFile}
            >
              Remove
            </button>

          </div>
        )}


        {/* Analyze Button */}

        <div className="flex justify-end">

          <button
            className="btn btn-primary px-6"
            disabled={!file}
            onClick={handleAnalyze}
          >
            ✨ Analyze Resume
          </button>

        </div>

      </div>

    </div>


    {/* ========================= */}
    {/* Resume Analysis */}
    {/* ========================= */}

    {analysis && (

      <div className="space-y-8">


        {/* Analysis Header */}

        <div>

          <h2 className="text-3xl font-bold">
            Resume Analysis
          </h2>

          <p className="text-base-content/60 mt-1">
            Here's how your resume currently performs.
          </p>

        </div>


        {/* ========================= */}
        {/* Score Cards */}
        {/* ========================= */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


          {/* Overall Score */}

          <div className="card bg-base-200 border border-base-300 shadow-sm">

            <div className="card-body">

              <div className="flex justify-between items-start">

                <div>

                  <h3 className="font-bold text-lg">
                    Overall Resume Score
                  </h3>

                  <p className="text-sm text-base-content/60 mt-1">
                    Overall quality of your resume
                  </p>

                </div>

                <div className="text-3xl">
                  📊
                </div>

              </div>


              <div className="mt-5">

                <div className="flex items-end gap-1">

                  <span className="text-5xl font-bold text-primary">
                    {analysis.overallScore}
                  </span>

                  <span className="text-lg text-base-content/50 mb-1">
                    /100
                  </span>

                </div>


                <progress
                  className="progress progress-primary w-full mt-3"
                  value={analysis.overallScore}
                  max="100"
                />

              </div>

            </div>

          </div>


          {/* ATS Score */}

          <div className="card bg-base-200 border border-base-300 shadow-sm">

            <div className="card-body">

              <div className="flex justify-between items-start">

                <div>

                  <h3 className="font-bold text-lg">
                    ATS Compatibility
                  </h3>

                  <p className="text-sm text-base-content/60 mt-1">
                    Estimated compatibility with ATS systems
                  </p>

                </div>

                <div className="text-3xl">
                  🤖
                </div>

              </div>


              <div className="mt-5">

                <div className="flex items-end gap-1">

                  <span className="text-5xl font-bold text-secondary">
                    {analysis.atsScore}
                  </span>

                  <span className="text-lg text-base-content/50 mb-1">
                    /100
                  </span>

                </div>


                <progress
                  className="progress progress-secondary w-full mt-3"
                  value={analysis.atsScore}
                  max="100"
                />

              </div>

            </div>

          </div>

        </div>


        {/* ========================= */}
        {/* Strengths + Improvements */}
        {/* ========================= */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


          {/* Strengths */}

          <div className="card bg-base-200 border border-base-300">

            <div className="card-body">

              <div className="flex items-center gap-2">

                <span className="text-xl">
                  💪
                </span>

                <h3 className="text-xl font-bold">
                  Strengths
                </h3>

              </div>


              <ul className="space-y-3 mt-4">

                {analysis.overall.strengths.map(
                  (strength: string, index: number) => (

                    <li
                      key={index}
                      className="flex gap-3"
                    >

                      <span className="text-success mt-1">
                        ✓
                      </span>

                      <span>
                        {strength}
                      </span>

                    </li>

                  )
                )}

              </ul>

            </div>

          </div>


          {/* Areas to Improve */}

          <div className="card bg-base-200 border border-base-300">

            <div className="card-body">

              <div className="flex items-center gap-2">

                <span className="text-xl">
                  ⚠️
                </span>

                <h3 className="text-xl font-bold">
                  Areas to Improve
                </h3>

              </div>


              <ul className="space-y-3 mt-4">

                {analysis.overall.weaknesses.map(
                  (weakness: string, index: number) => (

                    <li
                      key={index}
                      className="flex gap-3"
                    >

                      <span className="text-warning mt-1">
                        •
                      </span>

                      <span>
                        {weakness}
                      </span>

                    </li>

                  )
                )}

              </ul>

            </div>

          </div>

        </div>


        {/* ========================= */}
        {/* Section Analysis */}
        {/* ========================= */}

        <div className="space-y-5">

          <div>

            <h2 className="text-2xl font-bold">
              Section-wise Analysis
            </h2>

            <p className="text-sm text-base-content/60 mt-1">
              Review the quality and completeness of each resume section.
            </p>

          </div>


          {Object.entries(analysis.sections).map(
            ([sectionName, section]: any) => (

              <div
                key={sectionName}
                className="card bg-base-200 border border-base-300"
              >

                <div className="card-body">


                  {/* Section Header */}

                  <div className="flex items-center justify-between">

                    <div>

                      <h3 className="text-xl font-bold capitalize">
                        {sectionName}
                      </h3>

                      {!section.present && (
                        <p className="text-sm text-warning mt-1">
                          Section not detected
                        </p>
                      )}

                    </div>


                    {/* Score */}

                    <div className="text-right">

                      <div className="text-2xl font-bold">
                        {section.score}
                        <span className="text-sm text-base-content/50">
                          /100
                        </span>
                      </div>

                      <progress
                        className="progress progress-primary w-24"
                        value={section.score}
                        max="100"
                      />

                    </div>

                  </div>


                  {/* Missing Section */}

                  {!section.present && (

                    <div className="alert alert-warning mt-4">

                      <span>
                        This section was not detected in your resume.
                      </span>

                    </div>

                  )}


                  {/* Existing Section */}

                  {section.present && (

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">


                      {/* Feedback */}

                      <div>

                        <h4 className="font-semibold text-base">
                          Feedback
                        </h4>

                        <ul className="space-y-2 mt-3">

                          {section.feedback.map(
                            (
                              item: string,
                              index: number
                            ) => (

                              <li
                                key={index}
                                className="flex gap-2 text-sm"
                              >

                                <span className="text-info">
                                  •
                                </span>

                                <span>
                                  {item}
                                </span>

                              </li>

                            )
                          )}

                        </ul>

                      </div>


                      {/* Suggestions */}

                      <div>

                        <h4 className="font-semibold text-base">
                          Suggestions
                        </h4>

                        <ul className="space-y-2 mt-3">

                          {section.suggestions.map(
                            (
                              item: string,
                              index: number
                            ) => (

                              <li
                                key={index}
                                className="flex gap-2 text-sm"
                              >

                                <span className="text-primary">
                                  → 
                                </span>

                                <span>
                                  {item}
                                </span>

                              </li>

                            )
                          )}

                        </ul>

                      </div>

                    </div>

                  )}

                </div>

              </div>

            )
          )}

        </div>

      </div>

    )}

  </div>
);
}