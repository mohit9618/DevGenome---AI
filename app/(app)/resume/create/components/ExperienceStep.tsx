"use client";

import { Experience } from "@/app/types/resume";
import { useState } from "react";

interface ExperienceStepProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}


export default function ExperienceStep({
  data,
  onChange,
}: ExperienceStepProps) {

  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  const [aiSuggestions, setAiSuggestions] = useState<
    Record<number, string[]>
  >({});

  const [aiError, setAiError] = useState<
    Record<number, string>
  >({});

  function handleChange(
    index: number,
    field: keyof Experience,
    value: string
  ) {
    const updated = [...data];
    updated[index][field] = value;
    onChange(updated);
  }

  function addExperience() {
    onChange([
      ...data,
      {
        company: "",
        role: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  }

  function removeExperience(index: number) {
    if (data.length === 1) return;

    onChange(
      data.filter((_, i) => i !== index)
    );

    setAiSuggestions((prev) => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });

    setAiError((prev) => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });
  }

  async function improveWithAI(index:number){
    const experience = data[index];

    if(!experience.company.trim()){
      setAiError((prev)=>({
        ...prev,
        [index]:"Please enter a company name first."
      }));
      return;
    }

    if(!experience.role.trim()){
      setAiError((prev)=>({
        ...prev,
        [index]:"Please enter a role or position first."
      }));
      return;
    }

    if(!experience.description.trim()){
      setAiError((prev)=>({
        ...prev,
        [index]:"Please enter an experience description first."
      }));
      return;
    }

    setLoadingIndex(index);

    setAiError((prev) => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });


    setAiSuggestions((prev) => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });

    try {
      const response = await fetch(
        "/api/ai/resume-content",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            type: "experience",
            company: experience.company,
            role: experience.role,
            location: experience.location,
            description: experience.description,
          }),
        }
      );


      const contentType = response.headers.get("content-type");

if (!contentType?.includes("application/json")) {
  throw new Error(
    "AI API returned a non-JSON response. Please check authentication or API routing."
  );
}

const result = await response.json();

if (!response.ok || !result.success) {
  throw new Error(
    result.error ||
    "Failed to generate AI suggestions."
  );
}

      setAiSuggestions((prev) => ({
        ...prev,
        [index]: result.result.bullets,
      }));

    } catch (error:any) {
      console.error("AI Error:", error);

      setAiError((prev) => ({
        ...prev,
        [index]:
          error?.message ||
          "Something went wrong while generating AI suggestions.",
      }));
    }finally{
      setLoadingIndex(null);
    }
  }

  function useSuggestions(index: number) {
  const suggestions = aiSuggestions[index];

  if (!suggestions || suggestions.length === 0) {
    return;
  }

  handleChange(
    index,
    "description",
    suggestions.join("\n")
  );

  setAiSuggestions((prev) => {
    const updated = { ...prev };
    delete updated[index];
    return updated;
  });
}

function dismissSuggestions(index: number) {
  setAiSuggestions((prev) => {
    const updated = { ...prev };
    delete updated[index];
    return updated;
  });
}

  return (
    <div className="space-y-8">

      <div className="flex justify-between items-center">

        <div>

          <h2 className="text-3xl font-bold">
            Experience
          </h2>

          <p className="text-base-content/70 mt-2">
            Add your internships, jobs or freelance work.
          </p>

        </div>

        <button
          className="btn btn-primary"
          onClick={addExperience}
        >
          + Add Experience
        </button>

      </div>

      {data.map((experience, index) => (

        

        <div
          key={index}
          className="card bg-base-200 border border-base-300"
        >

          <div className="card-body">

            <div className="flex justify-between items-center">

              <h3 className="font-bold text-xl">
                Experience {index + 1}
              </h3>

              {data.length > 1 && (
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => removeExperience(index)}
                >
                  Remove
                </button>
              )}

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <input
                className="input input-bordered"
                placeholder="Company"
                value={experience.company}
                onChange={(e) =>
                  handleChange(index, "company", e.target.value)
                }
              />

              <input
                className="input input-bordered"
                placeholder="Role / Position"
                value={experience.role}
                onChange={(e) =>
                  handleChange(index, "role", e.target.value)
                }
              />

              <input
                className="input input-bordered"
                placeholder="Location"
                value={experience.location}
                onChange={(e) =>
                  handleChange(index, "location", e.target.value)
                }
              />

              <input
                type="date"
                className="input input-bordered"
                value={experience.startDate}
                onChange={(e) =>
                  handleChange(index, "startDate", e.target.value)
                }
              />

              {/* <input
                type="date"
                className="input input-bordered"
                value={experience.endDate}
                onChange={(e) =>
                  handleChange(index, "endDate", e.target.value)
                }
              /> */}

              <textarea
                className="textarea textarea-bordered md:col-span-2"
                rows={5}
                placeholder="Describe your responsibilities and achievements..."
                value={experience.description}
                onChange={(e) =>
                  handleChange(index, "description", e.target.value)
                }
              />

            </div>

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