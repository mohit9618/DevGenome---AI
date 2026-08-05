interface ResumeStatsProps {
  totalResumes: number;
  templatesUsed: number;
  atsScore: number;
  lastEdited: string;
}

export default function ResumeStats({
  totalResumes,
  templatesUsed,
  atsScore,
  lastEdited,
}: ResumeStatsProps) {
  const stats = [
    {
      title: "Total Resumes",
      value: totalResumes,
    },
    {
      title: "Templates",
      value: templatesUsed,
    },
    {
      title: "ATS Score",
      value: `${atsScore}%`,
    },
    {
      title: "Last Edited",
      value: lastEdited,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

      {stats.map((stat) => (
        <div
          key={stat.title}
          className="stats shadow bg-base-100"
        >
          <div className="stat">

            <div className="stat-title">
              {stat.title}
            </div>

            <div className="stat-value text-primary">
              {stat.value}
            </div>

          </div>
        </div>
      ))}

    </div>
  );
}