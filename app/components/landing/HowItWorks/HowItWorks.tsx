"use client";

import {
  UserPlus,
  FileText,
  BrainCircuit,
  Rocket,
} from "lucide-react";

const steps = [
  {
    title: "Create Account",
    description:
      "Sign up securely with Clerk authentication and set up your profile.",
    icon: UserPlus,
  },
  {
    title: "Build Resume",
    description:
      "Add your education, skills, projects and experience with ease.",
    icon: FileText,
  },
  {
    title: "AI Optimization",
    description:
      "Improve your resume with AI suggestions and ATS analysis.",
    icon: BrainCircuit,
  },
  {
    title: "Land Your Dream Job",
    description:
      "Export your resume and confidently apply to internships and jobs.",
    icon: Rocket,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 bg-base-100"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <div className="badge badge-secondary badge-outline mb-4">
            How It Works
          </div>

          <h2 className="text-5xl font-bold">
            Get Started in 4 Simple Steps
          </h2>

          <p className="mt-5 text-lg opacity-70 max-w-3xl mx-auto">
            DevGenome AI simplifies your journey from student
            to software engineer with intelligent tools
            designed for developers.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="card bg-base-200 shadow-lg hover:shadow-2xl transition duration-300 border border-base-300"
              >
                <div className="card-body items-center text-center">

                  <div className="w-16 h-16 rounded-full bg-primary text-primary-content flex items-center justify-center mb-5">

                    <Icon size={30} />

                  </div>

                  <div className="badge badge-primary mb-3">
                    Step {index + 1}
                  </div>

                  <h2 className="card-title text-2xl">
                    {step.title}
                  </h2>

                  <p className="opacity-70">
                    {step.description}
                  </p>

                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}