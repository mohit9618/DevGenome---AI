"use client";

import { Experience } from "@/app/types/resume";

interface ExperienceStepProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

export default function ExperienceStep({
  data,
  onChange,
}: ExperienceStepProps) {

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