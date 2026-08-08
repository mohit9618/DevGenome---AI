interface BuilderHeaderProps {
  currentStep: number;
  totalSteps: number;
  title: string;
}

export default function BuilderHeader({
  currentStep,
  totalSteps,
  title,
}: BuilderHeaderProps) {
  return (
    <div className="mb-8">

      <h1 className="text-4xl font-bold">
        Resume Builder
      </h1>

      <p className="text-base-content/70 mt-2">
        Step {currentStep} of {totalSteps}
      </p>

      <h2 className="text-2xl font-semibold mt-6">
        {title}
      </h2>

    </div>
  );
}