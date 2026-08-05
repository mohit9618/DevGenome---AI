"use client";

interface ResumeHeaderProps {
  onCreate: () => void;
}

export default function ResumeHeader({
  onCreate,
}: ResumeHeaderProps) {
  return (
    <div className="hero bg-base-200 rounded-3xl shadow-lg">
      <div className="hero-content w-full justify-between flex-col lg:flex-row">

        <div>
          <h1 className="text-5xl font-bold">
            📄 Resume Builder
          </h1>

          <p className="py-4 text-base-content/70 max-w-xl">
            Build ATS-friendly resumes, manage multiple templates,
            preview instantly and download professional resumes
            with AI assistance.
          </p>
        </div>

        <button
          className="btn btn-primary btn-lg"
          onClick={onCreate}
        >
          + New Resume
        </button>

      </div>
    </div>
  );
}