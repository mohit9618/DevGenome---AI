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
  <div className="flex justify-center py-10 bg-base-200 min-h-screen print:bg-white print:py-0">
    <div 
    ref={ref} className="bg-white text-black shadow-2xl rounded-md w-[210mm] h-auto px-8 py-6
               print:shadow-none print:rounded-none print:m-0">

      {/* Header */}

<div className="text-center ">

  <h1 className="text-3xl font-semibold tracking-wide uppercase text-slate-900">
    {resume.personalInfo.fullName}
  </h1>

  <div className="mt-2 flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-[15px] text-slate-700">

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

  <div className="mt-2 flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-[15px]">

    {resume.personalInfo.github && (
      <>
        <a
          href={resume.personalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:text-blue-900 hover:underline"
        >
          GitHub
        </a>

        {(resume.personalInfo.linkedIn ||
          resume.personalInfo.portfolio) && <span>|</span>}
      </>
    )}

    {resume.personalInfo.linkedIn && (
      <>
        <a
          href={resume.personalInfo.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:text-blue-900 hover:underline"
        >
          LinkedIn
        </a>

        {resume.personalInfo.portfolio && <span>|</span>}
      </>
    )}

    {resume.personalInfo.portfolio && (
      <a
        href={resume.personalInfo.portfolio}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-700 hover:text-blue-900 hover:underline"
      >
        Portfolio
      </a>
    )}

  </div>

</div>

      {/* Summary */}

      {resume.summary && (
        <div className="mt-5">

          <h2 className="text-[15px] font-semibold uppercase tracking-[0.20em] border-b border-slate-400 pb-2 mb-2 text-slate-800">
            Professional Summary
          </h2>

          <p className="leading-7 text-[13px]  text-slate-700">
            {resume.summary}
          </p>

        </div>
      )}

      {/* Education */}

{resume.education.length > 0 && (
  <section className="mt-5">

    <h2 className="text-[15px] font-semibold uppercase tracking-[0.20em] border-b border-slate-400 pb-2 mb-2 text-slate-800">
      Education
    </h2>

    {resume.education.map((edu, index) => (
  <div
    key={index}
    className="flex justify-between items-center text-[14px] mb-2"
  >

    <div className="flex-1">

      <span className="font-semibold">
        {edu.institute}
      </span>

      {" | "}

      <span>
        {edu.degree}
      </span>

      {" | "}

      <span>
        CGPA: {edu.cgpa}
      </span>

    </div>

    <span className="text-[13px] text-slate-600 whitespace-nowrap">
      {edu.startYear} - {edu.endYear}
    </span>

  </div>
))}

  </section>
)}
      {/* Experience */}


{resume.experience.length > 0 && (
<section className="mt-5">

<h2 className="text-[15px] font-semibold uppercase tracking-[0.20em] border-b border-slate-400 pb-2 mb-2 text-slate-800">
Experience
</h2>

{resume.experience.map((exp, index) => (
  <div
    key={index}
    className="mb-2"
  >

    <div className="flex justify-between items-center">

      <div className="text-[14px]">

        <span className="font-semibold">
          {exp.company}
        </span>

        {" | "}

        <span>
          {exp.role}
        </span>

        {" | "}

        <span>
          {exp.location}
        </span>

      </div>

      <span className="text-[13px] text-slate-600 whitespace-nowrap">
        {formatDate(exp.startDate)}
      </span>

    </div>

    <ul className="mt-2 list-disc pl-5 text-[13px]  leading-6 text-slate-700">

      {exp.description
        .split("\n")
        .filter((line) => line.trim() !== "")
        .map((line, i) => (
          <li key={i}>{line}</li>
        ))}

    </ul>

  </div>
))}

</section>
)}

      {/* Projects */}

{resume.projects.length > 0 && (
<section className="mt-5">

<h2 className="text-[15px] font-semibold uppercase tracking-[0.20em] border-b border-slate-400 pb-2 mb-2 text-slate-800">
Projects
</h2>

{resume.projects.map((project, index) => (
<div
key={index}
className="mb-2 break-inside-avoid"
>

<div className="flex justify-between">


<h3 className="text-[13px] font-bold">
{project.title}
</h3>

<div className="flex gap-4 text-[12px] text-blue-700">

{project.github && (
<a href={project.github}>
GitHub
</a>
)}

{project.liveDemo && (
<a href={project.liveDemo}>
Live Demo
</a>
)}

</div>

</div>

{/* {project.techStack && (
<p className="text-[12px] italic text-slate-600 mt-1">
Tech Stack: {project.techStack}
</p>
)} */}

<ul className="mt-2 list-disc pl-5 text-[13px]  leading-6 text-slate-700">

{project.description
.split("\n")
.filter((line) => line.trim() !== "")
.map((line, i) => (
<li key={i}>{line}</li>
))}

</ul>

</div>
))}

</section>
)}


{/* Technical Skills */}

<section className="mt-5">

<h2 className="text-[15px] font-semibold uppercase tracking-[0.20em] border-b border-slate-400 pb-2 mb-2 text-slate-800">
Technical Skills
</h2>

<div className="space-y-1 text-[13px]">

{resume.technicalSkills.languages.length > 0 && (
<div className="flex">
<span className="w-28 font-semibold">
Languages:
</span>
<span className="text-[13px]  font-medium text-slate-700">{resume.technicalSkills.languages.join(", ")}</span>
</div>
)}

{resume.technicalSkills.coreCS.length > 0 && (
<div className="flex">
<span className="w-28 font-semibold">
Core CS:
</span>
<span className="text-[13px]  font-medium text-slate-700">{resume.technicalSkills.coreCS.join(", ")}</span>
</div>
)}

{resume.technicalSkills.frontend.length > 0 && (
<div className="flex">
<span className="w-28 font-semibold">
Frontend:
</span>
<span className="text-[13px]  font-medium text-slate-700">{resume.technicalSkills.frontend.join(", ")}</span>
</div>
)}

{resume.technicalSkills.backend.length > 0 && (
<div className="flex">
<span className="w-28 font-semibold">
Backend:
</span>
<span className="text-[13px]  font-medium text-slate-700">{resume.technicalSkills.backend.join(", ")}</span>
</div>
)}

{resume.technicalSkills.database.length > 0 && (
<div className="flex">
<span className="w-28 font-semibold">
Database:
</span>
<span className="text-[13px]  font-medium text-slate-700">{resume.technicalSkills.database.join(", ")}</span>
</div>
)}

{resume.technicalSkills.tools.length > 0 && (
<div className="flex">
<span className="w-28 font-semibold">
Tools:
</span>
<span className="text-[13px]  font-medium text-slate-700">{resume.technicalSkills.tools.join(", ")}</span>
</div>
)}

{resume.technicalSkills.technologies.length > 0 && (
<div className="flex">
<span className="w-28 font-semibold">
Technologies:
</span>
<span className="text-[13px]  font-medium text-slate-700">{resume.technicalSkills.technologies.join(", ")}</span>
</div>
)}

</div>

</section>

      {/* Certifications */}

      {resume.certifications.length > 0 && (
  <section className="mt-5">

    <h2 className="text-[15px] font-semibold uppercase tracking-[0.20em] border-b border-slate-400 pb-2 mb-2 text-slate-800">
      Certifications
    </h2>

    {resume.certifications.map((cert, index) => (
      <div
        key={index}
        className="mb-2 break-inside-avoid"
      >

        <div className="flex justify-between items-start text-[14px]">

          <div>

        <span className="font-semibold">
          {cert.organization}
        </span>

        {" | "}

        <span>
          {cert.name}
        </span>


      </div>

          {cert.issueDate && (
            <div className="text-right text-[13px] text-slate-600 whitespace-nowrap">
              {cert.issueDate}
            </div>
          )}

        </div>

      </div>
    ))}

  </section>
)}

      {/* Achievements */}


{resume.achievements.length > 0 && (
  <section className="mt-5">

    <h2 className="text-[15px] font-semibold uppercase tracking-[0.20em] border-b border-slate-400 pb-2 mb-2 text-slate-800">
      Achievements
    </h2>

    <ul className="list-disc pl-5 text-[14px]  leading-7 text-slate-700">
  {resume.achievements
    .map((a) => a.description)
    .join("\n")
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line, index) => (
      <li key={index}>{line}</li>
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