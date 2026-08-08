"use client";

import { useRouter } from "next/navigation";

export default function UploadResumeCard() {
  const router = useRouter();

  return (
    <div className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-all duration-300">

      <div className="card-body">

        <div className="text-6xl">
          📤
        </div>

        <h2 className="card-title text-3xl mt-2">
          Upload Resume
        </h2>

        <p className="text-base-content/70 leading-relaxed mt-2">
          Already have a resume? Upload your PDF and let AI
          analyze, review and improve it without changing any
          information unless you approve it.
        </p>

        <div className="divider"></div>

        <div className="space-y-3">

          <div className="flex items-center gap-3">
            <span className="text-success">✔</span>
            <span>Upload Existing Resume (PDF)</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-success">✔</span>
            <span>AI Resume Review</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-success">✔</span>
            <span>Strengths & Weaknesses Analysis</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-success">✔</span>
            <span>Interactive AI Improvements</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-success">✔</span>
            <span>Generate Improved Resume PDF</span>
          </div>

        </div>

        <div className="alert alert-warning mt-6">

          <span>
            AI will never invent new skills, projects,
            certifications or experiences. If additional
            information is needed, you'll always be asked
            before any improvement is made.
          </span>

        </div>

        <div className="card-actions justify-end mt-8">

          <button
            className="btn btn-secondary btn-wide"
            onClick={() => router.push("/resume/upload")}
          >
            Upload Resume
          </button>

        </div>

      </div>

    </div>
  );
}