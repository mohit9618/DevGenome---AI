"use client";

interface SummaryStepProps {
  data: string;
  onChange: (data: string) => void;
}

export default function SummaryStep({
  data,
  onChange,
}: SummaryStepProps) {
  return (
    <div className="space-y-6">

      <h2 className="text-3xl font-bold">
        Professional Summary
      </h2>

      <textarea
        className="textarea textarea-bordered h-48 w-full"
        placeholder="Write a professional summary..."
        value={data}
        onChange={(e) => onChange(e.target.value)}
      />

    </div>
  );
}