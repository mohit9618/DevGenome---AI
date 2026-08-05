"use client";

import ResumeCard from "./ResumeCard";

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

interface ResumeGridProps {
  resumes: Resume[];
  onDelete: (id: string) => void;
}

export default function ResumeGrid({
  resumes,
  onDelete,
}: ResumeGridProps) {
  if (resumes.length === 0) {
    return (
      <div className="hero mt-10 bg-base-200 rounded-2xl">
        <div className="hero-content text-center py-16">

          <div>

            <h1 className="text-6xl">📄</h1>

            <h2 className="text-3xl font-bold mt-5">
              No Resume Yet
            </h2>

            <p className="opacity-70 mt-3">
              Create your first ATS-friendly resume.
            </p>

          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-10">

      {resumes.map((resume) => (
        <ResumeCard
          key={resume.id}
          resume={resume}
          onDelete={onDelete}
        />
      ))}

    </div>
  );
}