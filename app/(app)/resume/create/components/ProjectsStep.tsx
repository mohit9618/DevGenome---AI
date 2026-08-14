"use client";

import { Project } from "@/app/types/resume";
import { useState } from "react";

interface ProjectsStepProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

export default function ProjectsStep({
  data,
  onChange,
}: ProjectsStepProps) {

  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  const [aiSuggestions, setAiSuggestions] = useState<
    Record<number, string[]>
  >({});

  const [aiError, setAiError] = useState<
    Record<number, string>
  >({});

  function handleChange(
    index: number,
    field: keyof Project,
    value: string
  ) {
    const updated = [...data];
    updated[index] = {...updated[index],[field]: value,};
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

    setAiSuggestions((prev) => {
      const updated = {...prev};
      delete updated[index];
      return updated;
    });

    setAiError((prev) => {
      const updated = {...prev};
      delete updated[index];
      return updated;
    });
  }
    async function improveWithAI(index:number){
      const project = data[index];

      if(!project.title.trim()){
        setAiError((prev)=>({
          ...prev,
          [index]:"Please enter a project title first.",
        }));
        return;
      }

      if(!project.techStack.trim()){
        setAiError((prev)=>({
          ...prev,
          [index]: "Please enter technology stack first.",
        }));
        return;
      }

      if(!project.description.trim()){
        setAiError((prev)=>({
          ...prev,
          [index]:"Please enter a description first.",
        }));
        return;
      }

      setLoadingIndex(index);

      setAiError((prev)=>{
        const updated = {...prev};
        delete updated[index];
        return updated;
      });

      setAiSuggestions((prev)=>{
        const updated = {...prev};
        delete updated[index];
        return updated;
      });

      try {
      const response = await fetch("/api/ai/resume-content", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          type: "project",
          title: project.title,
          techStack: project.techStack,
          description: project.description,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "Failed to generate AI suggestions."
        );
      }

      setAiSuggestions((prev) => ({
        ...prev,
        [index]: result.result.bullets,
      }));
    } catch (error: any) {
      console.error("AI Error:", error);

      setAiError((prev) => ({
        ...prev,
        [index]:
          error?.message ||
          "Something went wrong while generating AI suggestions.",
      }));
    } finally {
      setLoadingIndex(null);
    }
    }
  

  function useSuggestions(index: number){
    const suggestions = aiSuggestions[index];

    if(!suggestions || suggestions.length === 0){return;}

    handleChange(
      index,
      "description",
      suggestions.join("\n")
    )

    setAiSuggestions((prev) => {
      const updated = {...prev};
      delete updated[index];
      return updated;
    });
  }

  function dismissSuggestions(index:number){
    setAiSuggestions((prev)=>{
      const updated = {...prev};
      delete updated[index];
      return updated;
    })
  }


  return (
    <div className="space-y-8">

      {/* Header */}

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


      {/* Projects */}

      {data.map((project, index) => (

        <div
          key={index}
          className="card bg-base-200 border border-base-300"
        >

          <div className="card-body">

            {/* Project Header */}

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


            {/* Inputs */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Title */}

              <input
                className="input input-bordered"
                placeholder="Project Title"
                value={project.title}
                onChange={(e) =>
                  handleChange(
                    index,
                    "title",
                    e.target.value
                  )
                }
              />


              {/* Tech Stack */}

              <input
                className="input input-bordered"
                placeholder="Tech Stack (React, Node.js...)"
                value={project.techStack}
                onChange={(e) =>
                  handleChange(
                    index,
                    "techStack",
                    e.target.value
                  )
                }
              />


              {/* GitHub */}

              <input
                className="input input-bordered"
                placeholder="GitHub Repository"
                value={project.github}
                onChange={(e) =>
                  handleChange(
                    index,
                    "github",
                    e.target.value
                  )
                }
              />


              {/* Live Demo */}

              <input
                className="input input-bordered"
                placeholder="Live Demo URL"
                value={project.liveDemo}
                onChange={(e) =>
                  handleChange(
                    index,
                    "liveDemo",
                    e.target.value
                  )
                }
              />


              {/* Description */}

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
                    handleChange(
                      index,
                      "description",
                      e.target.value
                    )
                  }
                />

              </div>

            </div>


            <div className="divider"></div>


            {/* AI Button */}

            <div className="flex justify-end">

              <button
                className="btn btn-accent"
                onClick={() => improveWithAI(index)}
                disabled={loadingIndex === index}
              >

                {loadingIndex === index ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Improving...
                  </>
                ) : (
                  <>
                    ✨ Improve with AI
                  </>
                )}

              </button>

            </div>


            {/* AI Error */}

            {aiError[index] && (

              <div className="alert alert-error mt-4">

                <span>
                  {aiError[index]}
                </span>

              </div>

            )}


            {/* AI Suggestions */}

            {aiSuggestions[index] &&
              aiSuggestions[index].length > 0 && (

                <div className="mt-5">

                  <div className="card bg-base-100 border border-accent">

                    <div className="card-body">

                      <h4 className="font-bold text-lg">
                        ✨ AI Suggestions
                      </h4>

                      <p className="text-sm text-base-content/70">
                        Review the suggestions before using them.
                      </p>


                      {/* Suggestions */}

                      <ul className="list-disc pl-5 space-y-2 mt-3">

                        {aiSuggestions[index].map(
                          (bullet, bulletIndex) => (

                            <li key={bulletIndex}>
                              {bullet}
                            </li>

                          )
                        )}

                      </ul>


                      {/* AI Actions */}

                      <div className="flex justify-end gap-3 mt-4">

                        <button
                          className="btn btn-ghost"
                          onClick={() =>
                            dismissSuggestions(index)
                          }
                        >
                          Dismiss
                        </button>

                        <button
                          className="btn btn-primary"
                          onClick={() =>
                            useSuggestions(index)
                          }
                        >
                          Use Suggestions
                        </button>

                      </div>

                    </div>

                  </div>

                </div>

              )}

          </div>

        </div>

      ))}

    </div>
  );
}