"use client";

import { Achievement } from "@/app/types/resume";

interface AchievementsStepProps {
  data: Achievement[];
  onChange: (data: Achievement[]) => void;
}

export default function AchievementsStep({
  data,
  onChange,
}: AchievementsStepProps) {

  function handleChange(
    index: number,
    field: keyof Achievement,
    value: string
  ) {
    const updated = [...data];
    updated[index][field] = value;
    onChange(updated);
  }

  function addAchievement() {
    onChange([
      ...data,
      {
        title: "",
        organization: "",
        date: "",
        description: "",
      },
    ]);
  }

  function removeAchievement(index: number) {
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
            Achievements
          </h2>

          <p className="text-base-content/70 mt-2">
            Add awards, recognitions, scholarships or notable accomplishments.
          </p>

        </div>

        <button
          className="btn btn-primary"
          onClick={addAchievement}
        >
          + Add Achievement
        </button>

      </div>

      {data.map((achievement, index) => (

        <div
          key={index}
          className="card bg-base-200 border border-base-300"
        >

          <div className="card-body">

            <div className="flex justify-between items-center">

              <h3 className="font-bold text-xl">
                Achievement {index + 1}
              </h3>

              {data.length > 1 && (
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => removeAchievement(index)}
                >
                  Remove
                </button>
              )}

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <input
                className="input input-bordered"
                placeholder="Achievement Title"
                value={achievement.title}
                onChange={(e) =>
                  handleChange(index, "title", e.target.value)
                }
              />

              <input
                className="input input-bordered"
                placeholder="Organization"
                value={achievement.organization}
                onChange={(e) =>
                  handleChange(index, "organization", e.target.value)
                }
              />

              <input
                type="date"
                className="input input-bordered md:col-span-2"
                value={achievement.date}
                onChange={(e) =>
                  handleChange(index, "date", e.target.value)
                }
              />

              <textarea
                className="textarea textarea-bordered md:col-span-2"
                rows={4}
                placeholder="Describe your achievement..."
                value={achievement.description}
                onChange={(e) =>
                  handleChange(index, "description", e.target.value)
                }
              />

            </div>

          </div>

        </div>

      ))}

    </div>
  );
}