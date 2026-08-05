"use client";

import Link from "next/link";

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

interface ResumeCardProps {
  resume: Resume;
  onDelete: (id: string) => void;
}

export default function ResumeCard({
  resume,
  onDelete,
}: ResumeCardProps) {
  return (
    <div className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-all duration-300">

      <div className="card-body">

        {/* Title */}
        <div className="flex justify-between items-start">

          <div>

            <h2 className="card-title text-xl">
              📄 {resume.title}
            </h2>

            <p className="text-sm text-base-content/70 mt-1">
              {resume.template} Template
            </p>

          </div>

          <div className="badge badge-primary">
            Resume
          </div>

        </div>

        <div className="divider my-2"></div>

        {/* Resume Info */}

        <div className="space-y-2 text-sm">

          <div className="flex justify-between">

            <span className="opacity-70">
              Created
            </span>

            <span>
              {new Date(
                resume.createdAt
              ).toLocaleDateString()}
            </span>

          </div>

          <div className="flex justify-between">

            <span className="opacity-70">
              Updated
            </span>

            <span>
              {new Date(
                resume.updatedAt
              ).toLocaleDateString()}
            </span>

          </div>

        </div>

        <div className="divider my-3"></div>

        {/* Actions */}

        <div className="card-actions justify-between">

          <Link
            href={`/resume/${resume.id}`}
            className="btn btn-primary btn-sm"
          >
            Edit
          </Link>

          <Link
            href={`/resume/preview?id=${resume.id}`}
            className="btn btn-outline btn-sm"
          >
            Preview
          </Link>

          <button
            className="btn btn-error btn-sm"
            onClick={() => onDelete(resume.id)}
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}