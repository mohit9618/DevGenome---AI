"use client";

import { useState } from "react";

interface SkillsStepProps {
  data: string[];
  onChange: (data: string[]) => void;
}

export default function SkillsStep({
  data,
  onChange,
}: SkillsStepProps) {

  const [skill, setSkill] = useState("");

  function addSkill() {
    const value = skill.trim();

    if (!value) return;

    if (data.includes(value)) return;

    onChange([...data, value]);

    setSkill("");
  }

  function removeSkill(index: number) {
    onChange(
      data.filter((_, i) => i !== index)
    );
  }

  return (
    <div className="space-y-6">

      <div>

        <h2 className="text-3xl font-bold">
          Skills
        </h2>

        <p className="text-base-content/70 mt-2">
          Add your technical and professional skills.
        </p>

      </div>

      <div className="flex gap-3">

        <input
          className="input input-bordered flex-1"
          placeholder="React"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addSkill();
            }
          }}
        />

        <button
          className="btn btn-primary"
          onClick={addSkill}
        >
          Add
        </button>

      </div>

      <div className="flex flex-wrap gap-3">

        {data.map((item, index) => (

          <div
            key={index}
            className="badge badge-lg badge-primary gap-2 py-5 px-4"
          >

            {item}

            <button
              className="font-bold"
              onClick={() => removeSkill(index)}
            >
              ✕
            </button>

          </div>

        ))}

      </div>

      <div className="divider"></div>

      <div className="alert alert-info">

        <span>
          Add only the skills you genuinely know.
          AI will improve how they're presented.
        </span>

      </div>

    </div>
  );
}