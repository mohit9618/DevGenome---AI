"use client";

import { useState } from "react";

interface TechnicalSkills {
  languages: string[];
  coreCS: string[];
  frontend: string[];
  backend: string[];
  database: string[];
  tools: string[];
  technologies: string[];
}

interface TechnicalSkillsStepProps {
  data: TechnicalSkills;
  onChange: (data: TechnicalSkills) => void;
}

const categories: {
  key: keyof TechnicalSkills;
  label: string;
  placeholder: string;
}[] = [
  {
    key: "languages",
    label: "Languages",
    placeholder: "C++, Java, Python...",
  },
  {
    key:"coreCS",
    label:"Core Computer Science Subjects",
    placeholder:"OOPs, OS, DBMS..."

  },
  {
    key: "frontend",
    label: "Frontend",
    placeholder: "React, Next.js...",
  },
  {
    key: "backend",
    label: "Backend",
    placeholder: "Node.js, Express...",
  },
  {
    key: "database",
    label: "Database",
    placeholder: "MongoDB, PostgreSQL...",
  },
  {
    key: "tools",
    label: "Tools",
    placeholder: "Git, Docker, VS Code...",
  },
  {
    key: "technologies",
    label: "Technologies",
    placeholder: "REST API, JWT, Redux...",
  },
];

export default function TechnicalSkillsStep({
  data,
  onChange,
}: TechnicalSkillsStepProps) {
  const [inputs, setInputs] = useState({
    languages: "",
    coreCS:"",
    frontend: "",
    backend: "",
    database: "",
    tools: "",
    technologies: "",
  });

  function addSkill(category: keyof TechnicalSkills) {
    const value = inputs[category].trim();

    if (!value) return;

    if (data[category].includes(value)) return;

    onChange({
      ...data,
      [category]: [...data[category], value],
    });

    setInputs({
      ...inputs,
      [category]: "",
    });
  }

  function removeSkill(
    category: keyof TechnicalSkills,
    index: number
  ) {
    onChange({
      ...data,
      [category]: data[category].filter(
        (_, i) => i !== index
      ),
    });
  }

  return (
    <div className="space-y-8">

      <div>

        <h2 className="text-3xl font-bold">
          Technical Skills
        </h2>

        <p className="text-base-content/70 mt-2">
          Organize your technical skills by category.
        </p>

      </div>

      {categories.map((category) => (
        <div
          key={category.key}
          className="space-y-3"
        >

          <label className="font-semibold text-lg">
            {category.label}
          </label>

          <div className="flex gap-3">

            <input
              className="input input-bordered flex-1"
              placeholder={category.placeholder}
              value={inputs[category.key]}
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  [category.key]: e.target.value,
                })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill(category.key);
                }
              }}
            />

            <button
              className="btn btn-primary"
              onClick={() =>
                addSkill(category.key)
              }
            >
              Add
            </button>

          </div>

          <div className="flex flex-wrap gap-3">

            {data[category.key].map((skill, index) => (
              <div
                key={index}
                className="badge badge-lg badge-primary gap-2 py-5 px-4"
              >

                {skill}

                <button
                  className="font-bold"
                  onClick={() =>
                    removeSkill(
                      category.key,
                      index
                    )
                  }
                >
                  ✕
                </button>

              </div>
            ))}

          </div>

        </div>
      ))}

      <div className="divider"></div>

      <div className="alert alert-info">

        <span>
          Organize your skills accurately. AI will use these
          categories for ATS optimization and resume
          enhancement.
        </span>

      </div>

    </div>
  );
}