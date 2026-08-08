"use client";

import { useEffect, useState } from "react";

import ResumeHeader from "@/app/components/resume/home/ResumeHeader";
import ResumeStats from "@/app/components/resume/home/ResumeStats";
import ResumeStatus from "@/app/components/resume/home/ResumeStatus";
import CreateResumeCard from "@/app/components/resume/home/CreateResumeCard";
import UploadResumeCard from "@/app/components/resume/home/UploadResumeCard";
import Router, { useRouter } from "next/router";


interface Resume {
  id: string;
  title: string;
  template: string;

  profileImage?: string;
  profileImagePublicId?: string;

  resumePdf?: string;
  resumePdfPublicId?: string;

  createdAt: string;
  updatedAt: string;

  analysis?: {
    aiScore?: number;
    reviewedAt?: string;
  };
}

export default function ResumePage() {

  const [resume, setResume] = useState<Resume | null>(null);

  const [deleting, setDeleting] = useState(false);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // ---------------- GET RESUME ----------------

  async function fetchResume() {
    try {

      setLoading(true);

      const response = await fetch("/api/resume");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch resume");
      }

      setResume(data);

    } catch (err) {

      console.error(err);

      setError("Failed to load resume.");

    } finally {

      setLoading(false);

    }
  }

  useEffect(() => {
    fetchResume();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen p-8">
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      </main>
    );
  }

// /Delete Resume

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete your resume?"
    );

    if (!confirmed) return;

    try {
      setDeleting(true);

      const getResponse = await fetch("/api/resume");

      const resume = await getResponse.json();

      if (!resume?.id) {
        throw new Error("Resume not found");
      }

      const response = await fetch("/api/resume", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeId: resume.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      alert("Resume deleted successfully.");

      await fetchResume();

    } catch (error) {
      console.error(error);
      alert("Failed to delete resume.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <main className="min-h-screen bg-base-100 p-8">

      <ResumeHeader />

      <ResumeStats
        hasResume={!!resume}
        aiReviewed={!!resume?.analysis}
        aiScore={resume?.analysis?.aiScore}
        lastUpdated={
          resume
            ? new Date(resume.updatedAt).toLocaleDateString()
            : "-"
        }
      />

      <ResumeStatus
        hasResume={!!resume}
        aiReviewed={!!resume?.analysis}
        reviewedAt={
          resume?.analysis?.reviewedAt
            ? new Date(
                resume.analysis.reviewedAt
              ).toLocaleDateString()
            : undefined
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
          
      <CreateResumeCard
      isEdit={!!resume}
    onDelete={handleDelete}
    />
  {!resume && (
    <UploadResumeCard />
  )}

</div>

    </main>
  );
}