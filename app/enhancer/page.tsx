"use client";

import { useState } from "react";

export default function ResumeEnhancerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

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

  function handleAnalyze() {
    if (!file) {
      setError("Please upload your resume first.");
      return;
    }

    // PDF extraction will be implemented tomorrow.
    console.log("Selected resume:", file);
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">

      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold">
          Resume Enhancer
        </h1>

        <p className="text-base-content/70 mt-2">
          Upload your existing resume and get AI-powered
          suggestions to improve it.
        </p>
      </div>


      {/* Upload Card */}

      <div className="card bg-base-200 border border-base-300">

        <div className="card-body space-y-5">

          <h2 className="card-title">
            Upload Resume
          </h2>

          <p className="text-sm text-base-content/70">
            Upload your resume in PDF format.
            Maximum file size: 5 MB.
          </p>


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
              <span>{error}</span>
            </div>
          )}


          {/* Selected File */}

          {file && (
            <div className="flex items-center justify-between
                            bg-base-100 border border-base-300
                            rounded-lg p-4">

              <div>
                <p className="font-semibold">
                  📄 {file.name}
                </p>

                <p className="text-sm text-base-content/60">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

              <button
                className="btn btn-ghost btn-sm"
                onClick={removeFile}
              >
                Remove
              </button>

            </div>
          )}


          {/* Analyze */}

          <div className="flex justify-end">

            <button
              className="btn btn-primary"
              disabled={!file}
              onClick={handleAnalyze}
            >
              Analyze Resume
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}