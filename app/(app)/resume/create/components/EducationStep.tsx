"use client";

interface Education {
  degree: string;
  institute: string;
  startYear: string;
  endYear: string;
  cgpa: string;
}

interface EducationStepProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export default function EducationStep({
  data,
  onChange,
}: EducationStepProps) {

  function handleChange(
    index: number,
    field: keyof Education,
    value: string
  ) {
    const updatedData = [...data];
    updatedData[index][field] = value;
    onChange(updatedData);
  }

  function addEducation() {
    onChange([
      ...data,
      {
        degree: "",
        institute: "",
        startYear: "",
        endYear: "",
        cgpa: "",
      },
    ]);
  }

  function removeEducation(index: number) {
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
            Education
          </h2>

          <p className="text-base-content/70 mt-2">
            Add all your educational qualifications.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={addEducation}
        >
          + Add Education
        </button>

      </div>

      {data.map((education, index) => (

        <div
          key={index}
          className="card bg-base-200 border border-base-300"
        >

          <div className="card-body">

            <div className="flex justify-between items-center">

              <h3 className="font-bold text-xl">
                Education {index + 1}
              </h3>

              {data.length > 1 && (
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => removeEducation(index)}
                >
                  Remove
                </button>
              )}

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <input
                className="input input-bordered"
                placeholder="Degree"
                value={education.degree}
                onChange={(e) =>
                  handleChange(index, "degree", e.target.value)
                }
              />

              <input
                className="input input-bordered"
                placeholder="Institute"
                value={education.institute}
                onChange={(e) =>
                  handleChange(index, "institute", e.target.value)
                }
              />

              <input
                className="input input-bordered"
                placeholder="Start Year"
                value={education.startYear}
                onChange={(e) =>
                  handleChange(index, "startYear", e.target.value)
                }
              />

              <input
                className="input input-bordered"
                placeholder="End Year"
                value={education.endYear}
                onChange={(e) =>
                  handleChange(index, "endYear", e.target.value)
                }
              />

              <input
                className="input input-bordered md:col-span-2"
                placeholder="CGPA / Percentage"
                value={education.cgpa}
                onChange={(e) =>
                  handleChange(index, "cgpa", e.target.value)
                }
              />

            </div>

          </div>

        </div>

      ))}

    </div>
  );
}