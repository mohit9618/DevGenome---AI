interface ResumeStatusProps {
  hasResume: boolean;
  aiReviewed: boolean;
  reviewedAt?: string;
}

export default function ResumeStatus({
  hasResume,
  aiReviewed,
  reviewedAt,
}: ResumeStatusProps) {
  return (
    <div className="card bg-base-100 shadow-xl mt-8 border border-base-300">

      <div className="card-body">

        <h2 className="card-title text-2xl">
          Resume Status
        </h2>

        <p className="text-base-content/70">
          Track the current status of your resume and AI review.
        </p>

        <div className="divider"></div>

        <div className="space-y-5">

          <div className="flex justify-between items-center">

            <span className="font-medium">
              Resume
            </span>

            <span
              className={`badge ${
                hasResume
                  ? "badge-success"
                  : "badge-warning"
              }`}
            >
              {hasResume ? "Available" : "Not Created"}
            </span>

          </div>

          <div className="flex justify-between items-center">

            <span className="font-medium">
              AI Review
            </span>

            <span
              className={`badge ${
                aiReviewed
                  ? "badge-success"
                  : "badge-warning"
              }`}
            >
              {aiReviewed ? "Completed" : "Pending"}
            </span>

          </div>

          <div className="flex justify-between items-center">

            <span className="font-medium">
              Last Review
            </span>

            <span className="text-sm opacity-70">
              {reviewedAt || "Not Reviewed"}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}