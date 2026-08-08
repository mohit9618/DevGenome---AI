"use client";

import { Project } from "@/app/types/resume";

interface ProjectsStepProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

export default function ProjectsStep({
  data,
  onChange,
}: ProjectsStepProps) {

  function handleChange(
    index: number,
    field: keyof Project,
    value: string
  ) {
    const updated = [...data];
    updated[index][field] = value;
    onChange(updated);
  }

  function addProject() {
    onChange([
      ...data,
      {
        title: "",
        techStack: "",
        github: "",
        liveDemo: "",
        description: "",
      },
    ]);
  }

  function removeProject(index: number) {
    if (data.length === 1) return;

    onChange(
      data.filter((_, i) => i !== index)
    );
  }

  return (
    <div className="space-y-8">

      <div className="flex justify-between items-center">

        <div>

          <h2 className="text-3xl font-bold">
            Projects
          </h2>

          <p className="text-base-content/70 mt-2">
            Showcase your best projects with technologies and descriptions.
          </p>

        </div>

        <button
          className="btn btn-primary"
          onClick={addProject}
        >
          + Add Project
        </button>

      </div>

      {data.map((project, index) => (

        <div
          key={index}
          className="card bg-base-200 border border-base-300"
        >

          <div className="card-body">

            <div className="flex justify-between items-center">

              <h3 className="font-bold text-xl">
                Project {index + 1}
              </h3>

              {data.length > 1 && (
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => removeProject(index)}
                >
                  Remove
                </button>
              )}

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <input
                className="input input-bordered"
                placeholder="Project Title"
                value={project.title}
                onChange={(e) =>
                  handleChange(index, "title", e.target.value)
                }
              />

              <input
                className="input input-bordered"
                placeholder="Tech Stack (React, Node.js...)"
                value={project.techStack}
                onChange={(e) =>
                  handleChange(index, "techStack", e.target.value)
                }
              />

              <input
                className="input input-bordered"
                placeholder="GitHub Repository"
                value={project.github}
                onChange={(e) =>
                  handleChange(index, "github", e.target.value)
                }
              />

              <input
                className="input input-bordered"
                placeholder="Live Demo URL"
                value={project.liveDemo}
                onChange={(e) =>
                  handleChange(index, "liveDemo", e.target.value)
                }
              />

              <div className="md:col-span-2">

                <label className="label">
                  <span className="label-text font-semibold">
                    Project Description
                  </span>
                </label>

                <textarea
                  rows={6}
                  className="textarea textarea-bordered w-full"
                  placeholder="Describe your project..."
                  value={project.description}
                  onChange={(e) =>
                    handleChange(index, "description", e.target.value)
                  }
                />

              </div>

            </div>

            <div className="divider"></div>

            <div className="flex justify-end">

              <button
                className="btn btn-accent"
                disabled
              >
                ✨ Improve with AI (Coming Soon)
              </button>

            </div>

          </div>

        </div>

      ))}

    </div>
  );
}