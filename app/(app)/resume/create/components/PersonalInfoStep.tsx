"use client";

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedIn: string;
  github: string;
  portfolio: string;
}

interface PersonalInfoStepProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export default function PersonalInfoStep({
  data,
  onChange,
}: PersonalInfoStepProps) {
  return (
    <div className="space-y-6">

      <h2 className="text-3xl font-bold">
        Personal Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <input
          className="input input-bordered w-full"
          placeholder="Full Name"
          value={data.fullName}
          onChange={(e) =>
            onChange({
              ...data,
              fullName: e.target.value,
            })
          }
        />

        <input
          className="input input-bordered w-full"
          placeholder="Email"
          value={data.email}
          onChange={(e) =>
            onChange({
              ...data,
              email: e.target.value,
            })
          }
        />

        <input
          className="input input-bordered w-full"
          placeholder="Phone Number"
          value={data.phone}
          onChange={(e) =>
            onChange({
              ...data,
              phone: e.target.value,
            })
          }
        />

        <input
          className="input input-bordered w-full"
          placeholder="Location"
          value={data.location}
          onChange={(e) =>
            onChange({
              ...data,
              location: e.target.value,
            })
          }
        />

        <input
          className="input input-bordered w-full"
          placeholder="LinkedIn URL"
          value={data.linkedIn}
          onChange={(e) =>
            onChange({
              ...data,
              linkedIn: e.target.value,
            })
          }
        />

        <input
          className="input input-bordered w-full"
          placeholder="GitHub URL"
          value={data.github}
          onChange={(e) =>
            onChange({
              ...data,
              github: e.target.value,
            })
          }
        />

        <input
          className="input input-bordered w-full md:col-span-2"
          placeholder="Portfolio Website"
          value={data.portfolio}
          onChange={(e) =>
            onChange({
              ...data,
              portfolio: e.target.value,
            })
          }
        />

      </div>

    </div>
  );
}