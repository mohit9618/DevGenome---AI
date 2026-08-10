import { forwardRef } from "react";
import { ResumeData } from "@/app/types/resume";

interface ResumePreviewProps {
  resume: ResumeData;
}

function formatDate(date: string) {
  if (!date) return "Present";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ resume }, ref) => {
  return (
  <div className="flex justify-center py-6 bg-base-200 min-h-screen print:bg-white print:py-0">

    <div
      ref={ref}
      className="
        bg-white text-black
        shadow-2xl rounded-md
        w-[210mm]
        min-h-[297mm]
        px-8 py-6
        print:shadow-none
        print:rounded-none
        print:m-0
      "
    >

      {/* ================= HEADER ================= */}

      <div className="text-center border-b border-slate-700 pb-3">

        <h1 className="text-[25px] font-bold tracking-tight text-slate-900">
          {resume.personalInfo.fullName}
        </h1>

        <div className="mt-1 flex flex-wrap justify-center items-center gap-x-2 text-[10.5px] text-slate-700">

          {resume.personalInfo.location && (
            <span>{resume.personalInfo.location}</span>
          )}

          {resume.personalInfo.location &&
            (resume.personalInfo.phone || resume.personalInfo.email) && (
              <span>|</span>
            )}

          {resume.personalInfo.phone && (
            <span>{resume.personalInfo.phone}</span>
          )}

          {resume.personalInfo.phone &&
            resume.personalInfo.email && (
              <span>|</span>
            )}

          {resume.personalInfo.email && (
            <span>{resume.personalInfo.email}</span>
          )}

        </div>

        <div className="mt-1 flex flex-wrap justify-center items-center gap-x-2 text-[10.5px]">

          {resume.personalInfo.github && (
            <>
              <a
                href={resume.personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline"
              >
                GitHub
              </a>

              {(resume.personalInfo.linkedIn ||
                resume.personalInfo.portfolio) && (
                <span className="text-slate-500">|</span>
              )}
            </>
          )}

          {resume.personalInfo.linkedIn && (
            <>
              <a
                href={resume.personalInfo.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline"
              >
                LinkedIn
              </a>

              {resume.personalInfo.portfolio && (
                <span className="text-slate-500">|</span>
              )}
            </>
          )}

          {resume.personalInfo.portfolio && (
            <a
              href={resume.personalInfo.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline"
            >
              Portfolio
            </a>
          )}

        </div>

      </div>


      {/* ================= SUMMARY ================= */}

      {resume.summary && (
        <section className="mt-3">

          <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] border-b border-slate-500 pb-1 mb-1.5 text-slate-900">
            Professional Summary
          </h2>

          <p className="text-[10.5px] leading-[1.35] text-slate-700">
            {resume.summary}
          </p>

        </section>
      )}


      {/* ================= EDUCATION ================= */}

      {resume.education.length > 0 && (
        <section className="mt-3">

          <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] border-b border-slate-500 pb-1 mb-1.5 text-slate-900">
            Education
          </h2>

          {resume.education.map((edu, index) => (
            <div
              key={index}
              className="mb-1 break-inside-avoid"
            >

              <div className="flex justify-between items-center text-[10.5px]">

                <div className="flex-1">
                  <span className="font-bold">
                    {edu.degree}
                  </span>

                  {" | "}

                  <span>
                    {edu.institute}
                  </span>

                  {" | "}

                  <span>
                    CGPA: {edu.cgpa}
                  </span>
                </div>

                <span className="text-[10px] text-slate-600 whitespace-nowrap ml-4">
                  {edu.startYear} - {edu.endYear}
                </span>

              </div>

            </div>
          ))}

        </section>
      )}


      {/* ================= EXPERIENCE ================= */}

      {resume.experience.length > 0 && (
        <section className="mt-3">

          <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] border-b border-slate-500 pb-1 mb-1.5 text-slate-900">
            Experience
          </h2>

          {resume.experience.map((exp, index) => (
            <div
              key={index}
              className="mb-2 break-inside-avoid"
            >

              <div className="flex justify-between items-center">

                <div className="text-[10.5px]">
                  <span className="font-bold">
                    {exp.role}
                  </span>

                  {" | "}

                  <span>
                    {exp.company}
                  </span>

                  {" | "}

                  <span>
                    {exp.location}
                  </span>
                </div>

                <span className="text-[10px] text-slate-600 whitespace-nowrap ml-4">
                  {formatDate(exp.startDate)}
                  {" - "}
                  {exp.endDate
                    ? formatDate(exp.endDate)
                    : "Present"}
                </span>

              </div>

              <ul className="mt-0.5 list-disc pl-4 text-[10.5px] leading-[1.35] text-slate-700">

                {exp.description
                  .split("\n")
                  .filter((line) => line.trim() !== "")
                  .map((line, i) => (
                    <li key={i}>
                      {line.replace(/^[-•]\s*/, "")}
                    </li>
                  ))}

              </ul>

            </div>
          ))}

        </section>
      )}


      {/* ================= PROJECTS ================= */}

      {resume.projects.length > 0 && (
        <section className="mt-3">

          <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] border-b border-slate-500 pb-1 mb-1.5 text-slate-900">
            Projects
          </h2>

          {resume.projects.map((project, index) => (
            <div
              key={index}
              className="mb-2 break-inside-avoid"
            >

              <div className="flex justify-between items-center">

                <h3 className="text-[10.5px] font-bold text-slate-900">
                  {project.title}
                </h3>

                <div className="flex gap-3 text-[9.5px]">

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:underline"
                    >
                      GitHub
                    </a>
                  )}

                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:underline"
                    >
                      Live Demo
                    </a>
                  )}

                </div>

              </div>

              {project.techStack && (
                <p className="text-[9.5px] italic text-slate-600">
                  {project.techStack}
                </p>
              )}

              <ul className="mt-0.5 list-disc pl-4 text-[10.5px] leading-[1.35] text-slate-700">

                {project.description
                  .split("\n")
                  .filter((line) => line.trim() !== "")
                  .map((line, i) => (
                    <li key={i}>
                      {line.replace(/^[-•]\s*/, "")}
                    </li>
                  ))}

              </ul>

            </div>
          ))}

        </section>
      )}


      {/* ================= TECHNICAL SKILLS ================= */}

      {(resume.technicalSkills.languages.length > 0 ||
        resume.technicalSkills.coreCS.length > 0 ||
        resume.technicalSkills.frontend.length > 0 ||
        resume.technicalSkills.backend.length > 0 ||
        resume.technicalSkills.database.length > 0 ||
        resume.technicalSkills.tools.length > 0 ||
        resume.technicalSkills.technologies.length > 0) && (

        <section className="mt-3">

          <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] border-b border-slate-500 pb-1 mb-1.5 text-slate-900">
            Technical Skills
          </h2>

          <div className="text-[10px] leading-[1.45] text-slate-700">

            {resume.technicalSkills.languages.length > 0 && (
              <div>
                <span className="font-bold text-slate-900">
                  Languages:
                </span>{" "}
                {resume.technicalSkills.languages.join(", ")}
              </div>
            )}

            {resume.technicalSkills.coreCS.length > 0 && (
              <div>
                <span className="font-bold text-slate-900">
                  Core CS:
                </span>{" "}
                {resume.technicalSkills.coreCS.join(", ")}
              </div>
            )}

            {resume.technicalSkills.frontend.length > 0 && (
              <div>
                <span className="font-bold text-slate-900">
                  Frontend:
                </span>{" "}
                {resume.technicalSkills.frontend.join(", ")}
              </div>
            )}

            {resume.technicalSkills.backend.length > 0 && (
              <div>
                <span className="font-bold text-slate-900">
                  Backend:
                </span>{" "}
                {resume.technicalSkills.backend.join(", ")}
              </div>
            )}

            {resume.technicalSkills.database.length > 0 && (
              <div>
                <span className="font-bold text-slate-900">
                  Database:
                </span>{" "}
                {resume.technicalSkills.database.join(", ")}
              </div>
            )}

            {resume.technicalSkills.tools.length > 0 && (
              <div>
                <span className="font-bold text-slate-900">
                  Tools:
                </span>{" "}
                {resume.technicalSkills.tools.join(", ")}
              </div>
            )}

            {resume.technicalSkills.technologies.length > 0 && (
              <div>
                <span className="font-bold text-slate-900">
                  Technologies:
                </span>{" "}
                {resume.technicalSkills.technologies.join(", ")}
              </div>
            )}

          </div>

        </section>
      )}


      {/* ================= CERTIFICATIONS ================= */}

      {resume.certifications.length > 0 && (
        <section className="mt-3">

          <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] border-b border-slate-500 pb-1 mb-1.5 text-slate-900">
            Certifications
          </h2>

          {resume.certifications.map((cert, index) => (
            <div
              key={index}
              className="mb-1 break-inside-avoid"
            >

              <div className="flex justify-between text-[10.5px]">

                <div>
                  <span className="font-bold">
                    {cert.organization}
                  </span>

                  {" | "}

                  <span>
                    {cert.name}
                  </span>
                </div>

                {cert.issueDate && (
                  <span className="text-[10px] text-slate-600 whitespace-nowrap ml-4">
                    {cert.issueDate}
                  </span>
                )}

              </div>

            </div>
          ))}

        </section>
      )}


      {/* ================= ACHIEVEMENTS ================= */}

      {resume.achievements.length > 0 && (
        <section className="mt-3">

          <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] border-b border-slate-500 pb-1 mb-1.5 text-slate-900">
            Achievements
          </h2>

          <ul className="list-disc pl-4 text-[10.5px] leading-[1.4] text-slate-700">

            {resume.achievements
              .map((a) => a.description)
              .join("\n")
              .split("\n")
              .filter((line) => line.trim() !== "")
              .map((line, index) => (
                <li key={index}>
                  {line.replace(/^[-•]\s*/, "")}
                </li>
              ))}

          </ul>

        </section>
      )}

    </div>
  </div>
);
});

ResumePreview.displayName = "ResumePreview";

export default ResumePreview;