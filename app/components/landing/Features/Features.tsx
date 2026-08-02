"use client";

import {
  FileText,
  BrainCircuit,
  BarChart3,
  Briefcase,
  Code2,
  Sparkles,
} from "lucide-react";

const features = [
  {
    title: "AI Resume Builder",
    description:
      "Create professional ATS-friendly resumes in minutes with AI assistance.",
    icon: FileText,
  },
  {
    title: "ATS Resume Analysis",
    description:
      "Analyze your resume and improve your ATS score before applying.",
    icon: BrainCircuit,
  },
  {
    title: "Coding Analytics",
    description:
      "Track LeetCode, Codeforces and CodeChef progress from one dashboard.",
    icon: BarChart3,
  },
  {
    title: "AI Interview Prep",
    description:
      "Practice technical and HR interviews with personalized AI feedback.",
    icon: Sparkles,
  },
  {
    title: "Project Portfolio",
    description:
      "Manage projects, skills and experiences professionally.",
    icon: Code2,
  },
  {
    title: "Job Tracker",
    description:
      "Organize applications, monitor progress and prepare for interviews.",
    icon: Briefcase,
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="py-24 bg-base-200"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <div className="badge badge-primary badge-outline mb-4">
            Features
          </div>

          <h2 className="text-5xl font-bold">
            Everything You Need
          </h2>

          <p className="mt-5 text-lg opacity-70 max-w-2xl mx-auto">
            One platform to build your resume,
            improve your skills,
            prepare for interviews,
            and manage your complete developer profile.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-base-300"
              >
                <div className="card-body">

                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">

                    <Icon
                      className="text-primary"
                      size={30}
                    />

                  </div>

                  <h2 className="card-title mt-5 text-2xl">
                    {feature.title}
                  </h2>

                  <p className="opacity-70">
                    {feature.description}
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