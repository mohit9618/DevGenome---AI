"use client";

import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-24 bg-primary text-primary-content">
      <div className="max-w-5xl mx-auto px-6 text-center">

        <div className="badge badge-outline badge-lg mb-6">
          🚀 Join Thousands of Developers
        </div>

        <h2 className="text-5xl md:text-6xl font-bold leading-tight">
          Build Your Dream Career
          <br />
          With DevGenome AI
        </h2>

        <p className="mt-8 text-lg opacity-90 max-w-3xl mx-auto">
          Create ATS-friendly resumes, improve them with AI,
          track your coding journey, prepare for interviews,
          and stand out in every application.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-5">

          <Link
            href="/sign-up"
            className="btn btn-neutral btn-lg"
          >
            Get Started Free
          </Link>

          <Link
            href="/sign-in"
            className="btn btn-outline btn-lg"
          >
            Sign In
          </Link>

        </div>

      </div>
    </section>
  );
}