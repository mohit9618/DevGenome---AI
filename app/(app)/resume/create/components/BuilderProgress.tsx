interface BuilderProgressProps {
  currentStep: number;
  totalSteps: number;
}

export default function BuilderProgress({
  currentStep,
  totalSteps,
}: BuilderProgressProps) {

  const progress =
    (currentStep / totalSteps) * 100;

  return (
    <div className="mt-4">

      <progress
        className="progress progress-primary w-full"
        value={progress}
        max={100}
      />

      <div className="flex justify-between mt-2 text-sm opacity-70">

        <span>
          {currentStep}/{totalSteps}
        </span>

        <span>
          {Math.round(progress)}%
        </span>

      </div>

    </div>
  );
}