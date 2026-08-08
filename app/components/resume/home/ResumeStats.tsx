interface ResumeStatsProps {
  hasResume: boolean;
  aiReviewed: boolean;
  aiScore?: number;
  lastUpdated: string;
}

export default function ResumeStats({
  hasResume,
  aiReviewed,
  aiScore,
  lastUpdated,
}: ResumeStatsProps) {
  const stats = [
    {
      title: "Resume Status",
      value: hasResume ? "Available" : "Not Created",
    },
    {
      title: "AI Review",
      value: aiReviewed ? "Completed" : "Pending",
    },
    {
      title: "AI Score",
      value: aiScore !== undefined ? `${aiScore}%` : "--",
    },
    {
      title: "Last Updated",
      value: lastUpdated,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 my-10">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="stats shadow bg-base-100"
        >
          <div className="stat">

            <div className="stat-title">
              {stat.title}
            </div>

            <div className="stat-value text-primary text-3xl">
              {stat.value}
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}