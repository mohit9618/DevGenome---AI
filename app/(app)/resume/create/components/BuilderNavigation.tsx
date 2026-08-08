interface BuilderNavigationProps {
  currentStep: number;
  totalSteps: number;

  onPrevious: () => void;
  onNext: () => void;
  onFinish: () => void;
  saving: boolean;
}

export default function BuilderNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onFinish,
  saving
}: BuilderNavigationProps) {

  return (
    <div className="flex justify-between mt-10">

      <button
        className="btn btn-outline"
        disabled={currentStep === 0}
        onClick={onPrevious}
      >
        Previous
      </button>

      <button
  className="btn btn-primary"
  onClick={
    currentStep === totalSteps - 1
      ? onFinish
      : onNext
  }
  disabled={saving}
>
  {currentStep === totalSteps - 1
    ? saving
      ? "Saving..."
      : "Finish"
    : "Next"}
</button>

    </div>
  );
}