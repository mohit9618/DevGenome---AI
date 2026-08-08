"use client";

import { ProgrammingLanguage } from "@/app/types/resume";

interface ProgrammingLanguagesStepProps {
  data: ProgrammingLanguage[];
  onChange: (data: ProgrammingLanguage[]) => void;
}

export default function ProgrammingLanguagesStep({
  data,
  onChange,
}: ProgrammingLanguagesStepProps) {

  function handleChange(
    index: number,
    value: string
  ) {
    const updated = [...data];
    updated[index].language = value;
    onChange(updated);
  }

  function addLanguage() {
    onChange([
      ...data,
      {
        language: "",
      },
    ]);
  }

  function removeLanguage(index: number) {
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
            Programming Languages
          </h2>

          <p className="text-base-content/70 mt-2">
            Add the programming languages you are comfortable working with.
          </p>

        </div>

        <button
          className="btn btn-primary"
          onClick={addLanguage}
        >
          + Add Language
        </button>

      </div>

      {data.map((item, index) => (

        <div
          key={index}
          className="card bg-base-200 border border-base-300"
        >

          <div className="card-body">

            <div className="flex justify-between items-center">

              <h3 className="font-bold text-xl">
                Language {index + 1}
              </h3>

              {data.length > 1 && (
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => removeLanguage(index)}
                >
                  Remove
                </button>
              )}

            </div>

            <input
              className="input input-bordered w-full"
              placeholder="e.g. C++, Java, Python, JavaScript"
              value={item.language}
              onChange={(e) =>
                handleChange(index, e.target.value)
              }
            />

          </div>

        </div>

      ))}

    </div>
  );
}