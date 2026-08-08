"use client";

import { Certification } from "@/app/types/resume";

interface CertificationsStepProps {
  data: Certification[];
  onChange: (data: Certification[]) => void;
}

export default function CertificationsStep({
  data,
  onChange,
}: CertificationsStepProps) {

  function handleChange(
    index: number,
    field: keyof Certification,
    value: string
  ) {
    const updated = [...data];
    updated[index][field] = value;
    onChange(updated);
  }

  function addCertification() {
    onChange([
      ...data,
      {
        name: "",
        organization: "",
        issueDate: "",
        credentialId: "",
        credentialUrl: "",
      },
    ]);
  }

  function removeCertification(index: number) {
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
            Certifications
          </h2>

          <p className="text-base-content/70 mt-2">
            Add your certifications, courses and professional credentials.
          </p>

        </div>

        <button
          className="btn btn-primary"
          onClick={addCertification}
        >
          + Add Certification
        </button>

      </div>

      {data.map((certification, index) => (

        <div
          key={index}
          className="card bg-base-200 border border-base-300"
        >

          <div className="card-body">

            <div className="flex justify-between items-center">

              <h3 className="font-bold text-xl">
                Certification {index + 1}
              </h3>

              {data.length > 1 && (
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => removeCertification(index)}
                >
                  Remove
                </button>
              )}

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <input
                className="input input-bordered"
                placeholder="Certification Name"
                value={certification.name}
                onChange={(e) =>
                  handleChange(index, "name", e.target.value)
                }
              />

              <input
                className="input input-bordered"
                placeholder="Issuing Organization"
                value={certification.organization}
                onChange={(e) =>
                  handleChange(index, "organization", e.target.value)
                }
              />

              <input
                type="date"
                className="input input-bordered"
                value={certification.issueDate}
                onChange={(e) =>
                  handleChange(index, "issueDate", e.target.value)
                }
              />

              <input
                className="input input-bordered"
                placeholder="Credential ID (Optional)"
                value={certification.credentialId}
                onChange={(e) =>
                  handleChange(index, "credentialId", e.target.value)
                }
              />

              <input
                className="input input-bordered md:col-span-2"
                placeholder="Credential URL (Optional)"
                value={certification.credentialUrl}
                onChange={(e) =>
                  handleChange(index, "credentialUrl", e.target.value)
                }
              />

            </div>

          </div>

        </div>

      ))}

    </div>
  );
}