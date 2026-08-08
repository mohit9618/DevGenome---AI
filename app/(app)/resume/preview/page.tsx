"use client";

"use client";

import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { ResumeData } from "@/app/types/resume";
import ResumePreview from "./components/ResumePreview";

interface Resume {
  id: string;
  title: string;
  template: string;
  content: ResumeData;
}



export default function ResumePreviewPage() {
    const resumeRef = useRef<HTMLDivElement>(null);
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    async function fetchResume() {
      try {
        const response = await fetch("/api/resume");

        if (!response.ok) {
          throw new Error("Failed to fetch resume");
        }

        const data = await response.json();
        setResume(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchResume();
  }, []);

  const handlePrint = useReactToPrint({
  contentRef: resumeRef,
  documentTitle: `${resume?.content.personalInfo.fullName || "Resume"}_Resume`,
});

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold">
          No Resume Found
        </h2>
      </div>
    );
  }

  return (
  <main className="min-h-screen bg-base-200 py-10">

    <div className="max-w-7xl mx-auto px-6">

      {/* Header */}

      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Resume Preview
          </h1>

          <p className="text-base-content/70 mt-2">
            Review your resume before downloading or AI analysis.
          </p>

        </div>

        <div className="flex gap-3">

          <button
  className="btn btn-outline"
  onClick={handlePrint}
>
  Print
</button>

          {/* <button
            className="btn btn-primary"
          >
            Download PDF
          </button> */}

        </div>

      </div>

      {/* Resume */}

      <div className="flex justify-center">

        <ResumePreview ref={resumeRef} resume={resume.content} />

      </div>

    </div>

  </main>
);
}