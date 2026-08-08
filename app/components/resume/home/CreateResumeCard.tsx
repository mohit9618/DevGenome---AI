"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";



interface CreateResumeCardProps {
  isEdit?: boolean;
  onDelete?: () => void;
}

export default function CreateResumeCard({
  isEdit = false,
  onDelete,
}: CreateResumeCardProps) {
  const router = useRouter();

  const [deleting, setDeleting] = useState(false);

  

  return (
    <div className="card bg-base-100 shadow-xl border border-base-300">

      <div className="card-body">

        <h2 className="card-title text-2xl">
          {isEdit ? "Edit Resume" : "Create Resume"}
        </h2>

        <p className="text-base-content/70 mt-2">
          {isEdit
            ? "Update your existing resume and keep it ready for AI review."
            : "Create your resume from scratch using our guided builder."}
        </p>


          {isEdit && (
          <button
          className="btn btn-outline"
           onClick={() => router.push("/resume/preview")}
         >
           Preview Resume
          </button>
        )}

        <div className="card-actions justify-end mt-8">

         {isEdit && (
    <button
      className="btn btn-error"
      onClick={onDelete}
    >
      Delete Resume
    </button>
  )}


          <button
            className="btn btn-primary"
            onClick={() => router.push("/resume/create")}
          >
            {isEdit ? "Edit Resume" : "Create Resume"}
          </button>

        </div>

      </div>

    </div>
  );
}