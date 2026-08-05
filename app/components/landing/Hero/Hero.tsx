"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero min-h-screen bg-base-100 pt-20">
      <div className="hero-content flex-col-reverse gap-16 lg:flex-row-reverse lg:justify-between">

        {/* Dashboard Preview */}

        <div className="mockup-window border border-base-300 bg-base-200 shadow-2xl w-full max-w-xl">

          <div className="bg-base-100 p-6">

            <div className="stats stats-vertical lg:stats-horizontal shadow w-full">

              <div className="stat">
                <div className="stat-title">ATS Score</div>
                <div className="stat-value text-success">92%</div>
              </div>

              <div className="stat">
                <div className="stat-title">Projects</div>
                <div className="stat-value text-primary">12</div>
              </div>

              <div className="stat">
                <div className="stat-title">Skills</div>
                <div className="stat-value text-secondary">18</div>
              </div>

            </div>

            <div className="divider"></div>

            <div className="space-y-4">

              <progress
                className="progress progress-primary w-full"
                value={92}
                max="100"
              ></progress>

              <progress
                className="progress progress-success w-full"
                value={75}
                max="100"
              ></progress>

              <progress
                className="progress progress-warning w-full"
                value={60}
                max="100"
              ></progress>

            </div>

          </div>

        </div>

        {/* Left */}

        <div className="max-w-2xl">

          <div className="badge badge-primary badge-outline mb-6 p-4">
            🚀 AI Powered Career Platform
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">

            Build Your Career

            <br />

            <span className="text-primary">
              Smarter with AI
            </span>

          </h1>

          <p className="py-8 text-lg opacity-80">

            DevGenome AI helps developers create professional resumes,
            analyze ATS scores, prepare for interviews,
            manage projects, and track coding profiles—
            all in one platform.

          </p>

          <div className="flex flex-wrap gap-4">

            <Link
              href="/sign-up"
              className="btn btn-primary btn-lg"
            >
              Get Started
            </Link>

            <Link
              href="/sign-in"
              className="btn btn-outline btn-lg"
            >
              Sign In
            </Link>

          </div>

          <div className="mt-10 flex flex-wrap gap-8">

            <div>
              <h2 className="text-3xl font-bold text-primary">
                50+
              </h2>

              <p className="opacity-70">
                Resume Templates
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-success">
                AI
              </h2>

              <p className="opacity-70">
                Resume Review
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-warning">
                24/7
              </h2>

              <p className="opacity-70">
                Career Assistant
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}