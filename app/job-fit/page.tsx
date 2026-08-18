"use client";

import { useState } from "react";

function ScoreCard({
  title,
  score,
}: {
  title: string;
  score: number;
}) {
  return (
    <div className="card bg-base-200 border border-base-300">
      <div className="card-body">

        <div className="flex items-center justify-between">
          <h4 className="font-semibold">
            {title}
          </h4>

          <span className="text-xl font-bold">
            {score}
          </span>
        </div>

        <progress
          className="progress progress-primary w-full"
          value={score}
          max="100"
        />

        <p className="text-xs text-base-content/60">
          {score}/100
        </p>

      </div>
    </div>
  );
}

export default function JobFitPage() {
  const [file, setFile] = useState<File | null>(null);
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [error, setError] = useState("");

  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const selectedFile = e.target.files?.[0];

    setError("");

    if (!selectedFile) {
      return;
    }

    if (selectedFile.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("Maximum file size is 5 MB.");
      return;
    }

    setFile(selectedFile);
  }

  function removeFile() {
    setFile(null);
    setError("");
  }


  async function handleAnalyze() {
    setError("");

    if (!file) {
      setError("Please upload your resume.");
      return;
    }

    if (!company.trim()) {
      setError("Please enter the company name.");
      return;
    }

    if (!position.trim()) {
      setError("Please enter the hiring position.");
      return;
    }

    if (!jobDescription.trim()) {
      setError("Please provide the job description.");
      return;
    }

    try{
        setLoading(true);
        setAnalysis(null);

        const formData = new FormData();

    formData.append("file", file);
    formData.append("company", company);
    formData.append("position", position);
    formData.append("jobDescription", jobDescription);

    const response = await fetch(
        "/api/ai/job-fit",
        {
        method: "POST",
        body: formData,
        }
    );

    const result = await response.json();

    if(!response.ok || !result.success){
        throw new Error(
            result.error || "Failed to analyze job fit."
        );
        }

    setAnalysis(result.analysis);

    console.log("Job Fit Analysis:");
    console.log(result.analysis);

    }catch(error: any){
        console.error("Job Fit Analyzer Error:", error);
        setError(error?.message || "Somethign went wrong while analyzing the job.");
    }finally{
        setLoading(false);
    }

  }

  const canAnalyze =
    !!file &&
    company.trim() !== "" &&
    position.trim() !== "" &&
    jobDescription.trim() !== "";


  return (
  <div className="max-w-3xl mx-auto space-y-8">

    {/* Header */}

    <div>
      <h1 className="text-4xl font-bold">
        Job Fit Analyzer
      </h1>

      <p className="text-base-content/70 mt-2">
        Find out how well your resume matches a specific
        job opportunity and what you can improve.
      </p>
    </div>


    {/* Main Card */}

    <div className="card bg-base-200 border border-base-300">

      <div className="card-body space-y-6">

        <h2 className="card-title">
          Analyze Job Opportunity
        </h2>


        {/* Resume */}

        <div className="space-y-2">

          <label className="font-semibold">
            Resume
          </label>

          <p className="text-sm text-base-content/60">
            Upload your current resume in PDF format.
            Maximum file size: 5 MB.
          </p>

          <input
            type="file"
            accept="application/pdf"
            className="file-input file-input-bordered w-full"
            onChange={handleFileChange}
          />

        </div>


        {/* Selected File */}

        {file && (
          <div
            className="
              flex items-center justify-between
              bg-base-100
              border border-base-300
              rounded-lg
              p-4
            "
          >

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


        {/* Company */}

        <div className="space-y-2">

          <label className="font-semibold">
            Company Name
          </label>

          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="e.g. Google"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

        </div>


        {/* Position */}

        <div className="space-y-2">

          <label className="font-semibold">
            Hiring Position
          </label>

          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="e.g. Software Engineer"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />

        </div>


        {/* Job Description */}

        <div className="space-y-2">

          <label className="font-semibold">
            Job Description
          </label>

          <p className="text-sm text-base-content/60">
            Paste the job description of the position
            you are applying for.
          </p>

          <textarea
            className="textarea textarea-bordered w-full h-56"
            placeholder="Paste the complete job description here..."
            value={jobDescription}
            onChange={(e) =>
              setJobDescription(e.target.value)
            }
          />

        </div>


        {/* Error */}

        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        )}


        {/* Analyze Button */}

        <div className="flex justify-end">

          <button
            className="btn btn-primary"
            disabled={!canAnalyze || loading}
            onClick={handleAnalyze}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Analyzing...
              </>
            ) : (
              "✨ Analyze Job Fit"
            )}
          </button>

        </div>

      </div>

    </div>


    {/* ================================================= */}
    {/* Job Fit Analysis */}
    {/* ================================================= */}

    {analysis && (

      <div className="space-y-8">

        {/* Analysis Header */}

        <div>
          <h2 className="text-3xl font-bold">
            Job Fit Analysis
          </h2>

          <p className="text-base-content/70 mt-2">
            Your resume match for{" "}
            <span className="font-semibold">
              {position}
            </span>{" "}
            at{" "}
            <span className="font-semibold">
              {company}
            </span>
          </p>
        </div>


        {/* Overall Score */}

        <div className="card bg-base-200 border border-base-300">

          <div className="card-body items-center text-center">

            <h3 className="text-xl font-bold">
              Overall Job Fit
            </h3>

            <div
              className="radial-progress text-primary"
              style={{
                "--value": analysis.overallFitScore,
                "--size": "10rem",
                "--thickness": "12px",
              } as React.CSSProperties}
              role="progressbar"
              aria-valuenow={analysis.overallFitScore}
            >

              <span className="text-3xl font-bold">
                {analysis.overallFitScore}
              </span>

            </div>


            {/* Recommendation */}

            <div
              className={`badge badge-lg mt-2 ${
                analysis.recommendation === "Strong Fit"
                  ? "badge-success"
                  : analysis.recommendation === "Moderate Fit"
                  ? "badge-warning"
                  : "badge-error"
              }`}
            >
              {analysis.recommendation}
            </div>

            <p className="text-sm text-base-content/60 mt-2">
              Based on your resume and the provided job description.
            </p>

          </div>

        </div>


        {/* Match Breakdown */}

        <div>

          <h3 className="text-2xl font-bold mb-4">
            Match Breakdown
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <ScoreCard
              title="Skills Match"
              score={analysis.skillsMatchScore}
            />

            <ScoreCard
              title="Experience Match"
              score={analysis.experienceMatchScore}
            />

            <ScoreCard
              title="Project Relevance"
              score={analysis.projectRelevanceScore}
            />

            <ScoreCard
              title="Education Match"
              score={analysis.educationMatchScore}
            />

          </div>

        </div>


        {/* Matching Skills */}

        <div className="card bg-base-200 border border-base-300">

          <div className="card-body">

            <h3 className="text-xl font-bold">
              ✅ Matching Skills
            </h3>

            <p className="text-sm text-base-content/60">
              Skills found in your resume that are relevant
              to this job.
            </p>


            {analysis.matchingSkills.length > 0 ? (

              <div className="flex flex-wrap gap-2 mt-3">

                {analysis.matchingSkills.map(
                  (skill: string, index: number) => (

                    <span
                      key={index}
                      className="badge badge-success badge-outline"
                    >
                      {skill}
                    </span>

                  )
                )}

              </div>

            ) : (

              <p className="text-sm text-base-content/60 mt-2">
                No direct matching skills were detected.
              </p>

            )}

          </div>

        </div>


        {/* Missing Skills */}

        <div className="card bg-base-200 border border-base-300">

          <div className="card-body">

            <h3 className="text-xl font-bold">
              ⚠️ Missing / Required Skills
            </h3>

            <p className="text-sm text-base-content/60">
              Relevant skills mentioned in the job description
              that were not clearly identified in your resume.
            </p>


            {analysis.missingSkills.length > 0 ? (

              <div className="flex flex-wrap gap-2 mt-3">

                {analysis.missingSkills.map(
                  (skill: string, index: number) => (

                    <span
                      key={index}
                      className="badge badge-error badge-outline"
                    >
                      {skill}
                    </span>

                  )
                )}

              </div>

            ) : (

              <p className="text-sm text-base-content/60 mt-2">
                No significant missing skills were detected.
              </p>

            )}

          </div>

        </div>


        {/* Strengths */}

        <div className="card bg-base-200 border border-base-300">

          <div className="card-body">

            <h3 className="text-xl font-bold">
              💪 Why You Match
            </h3>

            <ul className="list-disc pl-5 space-y-2 mt-3">

              {analysis.strengths.map(
                (strength: string, index: number) => (

                  <li key={index}>
                    {strength}
                  </li>

                )
              )}

            </ul>

          </div>

        </div>


        {/* Improvements */}

        <div className="card bg-base-200 border border-base-300">

          <div className="card-body">

            <h3 className="text-xl font-bold">
              🚀 What You Can Improve
            </h3>

            <ul className="list-disc pl-5 space-y-2 mt-3">

              {analysis.improvements.map(
                (improvement: string, index: number) => (

                  <li key={index}>
                    {improvement}
                  </li>

                )
              )}

            </ul>

          </div>

        </div>

      </div>

    )}

  </div>
);
}