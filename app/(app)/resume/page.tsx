"use client";

import { useEffect, useState } from "react";

import ResumeHeader from "@/app/components/resume/dashboard/ResumeHeader";
import ResumeStats from "@/app/components/resume/dashboard/ResumeStats";
import ResumeGrid from "@/app/components/resume/dashboard/ResumeGrid";
import CreateResumeModal from "@/app/components/resume/dashboard/CreateResumeModal";
import DeleteResumeModal from "@/app/components/resume/dashboard/DeleteResumeModal";

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
}

export default function ResumePage() {
  // Modals
  const [createOpen, setCreateOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedResumeId, setSelectedResumeId] = useState("");

  // Resume Data
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ---------------- GET ALL RESUMES ----------------

  async function fetchResumes() {
  try {
    setLoading(true);
    const response = await fetch("/api/resume");
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch resumes");
    }
    setResumes(data);
  } catch (err) {
    setError("Failed to fetch resumes.");
  } finally {
    setLoading(false);
  }
}

  useEffect(() => {
    fetchResumes();
  }, []);

  // Post resumes

  async function handleCreateResume(
  title: string,
  template: string
){
    console.log("handleCreateResume called", title, template);
  try {
    console.log("Creating resume...");

    const response = await fetch("/api/resume", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        template,
      }),
    });

    console.log("POST Status:", response.status);

    const data = await response.json();
    console.log("POST Response:", data);

    if (!response.ok) {
      throw new Error(data.error || "Failed to create resume");
    }

    setCreateOpen(false);

    console.log("Refreshing resumes...");
    await fetchResumes();
    console.log("Refresh complete");

  } catch (err) {
    console.error(err);
    alert("Failed to create resume.");
  }
}

// Delete resume

async function handleDeleteResume() {
    try {
      const response = await fetch("/api/resume", {
        method: "DELETE",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          resumeId: selectedResumeId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete resume");
      }

      setDeleteOpen(false);

      fetchResumes();
    } catch (err) {
      console.log(err);
      alert("Failed to delete resume.");
    }
  }

  console.log({
  loading,
  error,
  resumes,
});
  return (
    <main className="min-h-screen bg-base-100 p-8">

      <ResumeHeader
  onCreate={() => setCreateOpen(true)}
/>

      <ResumeStats
        totalResumes={resumes.length}
        templatesUsed={
          new Set(resumes.map((r) => r.template)).size
        }
        atsScore={92}
        lastEdited={
          resumes.length
            ? new Date(
                resumes[0].updatedAt
              ).toLocaleDateString()
            : "-"
        }
      />

      {loading ? (
        <div className="flex justify-center mt-16">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : error ? (
        <div className="alert alert-error mt-10">
          <span>{error}</span>
        </div>
      ) : (
        <ResumeGrid
          resumes={resumes}
          onDelete={(id) => {
            setSelectedResumeId(id);
            setDeleteOpen(true);
          }}
        />
      )}

      {/* Create Resume Modal */}

      <CreateResumeModal
  open={createOpen}
  setOpen={setCreateOpen}
  onCreate={handleCreateResume}
/>

      {/* Delete Resume Modal */}

      <DeleteResumeModal
      open={deleteOpen}
      setOpen={setDeleteOpen}
      onDelete={handleDeleteResume}
/>

    </main>
  );
}