"use client";


export default function ResumeHeader() {
  return (
    <div className="hero bg-base-200 rounded-3xl mb-10">
      <div className="hero-content w-full flex-col lg:flex-row justify-between items-center py-10">

        <div className="max-w-2xl">

          <h1 className="text-5xl font-bold">
            📄 Resume AI
          </h1>

          <p className="mt-5 text-lg text-base-content/70 leading-relaxed">
            Build a professional resume from scratch or upload your existing
            resume for AI-powered review, personalized improvements, and
            ATS-friendly optimization.
          </p>

        </div>
        
      </div>
    </div>
  );
}