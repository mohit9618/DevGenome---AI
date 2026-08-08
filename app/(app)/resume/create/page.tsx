"use client";

import { useEffect, useState } from "react";
import { ResumeData } from "@/app/types/resume";

import BuilderHeader from "./components/BuilderHeader";
import BuilderProgress from "./components/BuilderProgress";
import BuilderNavigation from "./components/BuilderNavigation";

import PersonalInfoStep from "./components/PersonalInfoStep";
import SummaryStep from "./components/SummaryStep";
import EducationStep from "./components/EducationStep";
import ExperienceStep from "./components/ExperienceStep";
import ProjectsStep from "./components/ProjectsStep";
import CertificationsStep from "./components/CertificationsStep";
import AchievementsStep from "./components/AchievementsStep";
import { useRouter } from "next/navigation";
import TechnicalSkillsStep from "./components/TechnicalSkillsStep";


export default function ResumeBuilderPage() {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedIn: "",
      github: "",
      portfolio: "",
    },

    summary: "",

    education: [],

    experience: [],

    projects: [],

    technicalSkills: {
  languages: [],
  coreCS: [],
  frontend: [],
  backend: [],
  database: [],
  tools: [],
  technologies: [],
    },

    certifications: [],

    achievements: [],
  });

  function updateSection<K extends keyof ResumeData>(
    section: K,
    value: ResumeData[K]
  ) {
    setResumeData((prev) => ({
      ...prev,
      [section]: value,
    }));
  }

const steps = [
  "Personal Information",
  "Professional Summary",
  "Education",
  "Experience",
  "Projects",
  "Technical Skills",
  "Certifications",
  "Achievements",
];

  function nextStep() {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  }

  function previousStep() {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }

  useEffect(() => {
    async function loadResume() {
      try {
        const response = await fetch("/api/resume");

        if (!response.ok) {
          return;
        }

        const resume = await response.json();

        if (resume?.content) {
          setResumeData(resume.content as ResumeData);
        }
      } catch (error) {
        console.error("Failed to load resume:", error);
      } finally {
        setLoading(false);
      }
    }

    loadResume();
  }, []);

async function handleFinish() {
  try {
    setSaving(true);

    // Check if a resume already exists
    const getResponse = await fetch("/api/resume");

    if (!getResponse.ok) {
      throw new Error("Failed to fetch existing resume.");
    }

    const existingResume = await getResponse.json();

    let response: Response;

    if (existingResume?.id) {
      // Update existing resume
      response = await fetch("/api/resume", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeId: existingResume.id,
          content: resumeData,
        }),
      });
    } else {
      // Create new resume
      response = await fetch("/api/resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "My Resume",
          template: "Modern",
          content: resumeData,
        }),
      });
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to save resume.");
    }

    alert("Resume saved successfully!");

    router.push("/resume");
  } catch (error) {
    console.error("Save Resume Error:", error);
    alert("Failed to save resume.");
  } finally {
    setSaving(false);
  }
}

  function renderStep() {
  switch (currentStep) {
    case 0:
      return (
        <PersonalInfoStep
          data={resumeData.personalInfo}
          onChange={(data) =>
            updateSection("personalInfo", data)
          }
        />
      );

    case 1:
      return (
        <SummaryStep
          data={resumeData.summary}
          onChange={(data) =>
            updateSection("summary", data)
          }
        />
      );

    case 2:
      return (
        <EducationStep
          data={resumeData.education}
          onChange={(data) =>
            updateSection("education", data)
          }
        />
      );

    case 3:
      return (
        <ExperienceStep
          data={resumeData.experience}
          onChange={(data) =>
            updateSection("experience", data)
          }
        />
      );

    case 4:
      return (
        <ProjectsStep
          data={resumeData.projects}
          onChange={(data) =>
            updateSection("projects", data)
          }
        />
      );

    case 5:
  return (
    <TechnicalSkillsStep
      data={resumeData.technicalSkills}
      onChange={(data) =>
        updateSection("technicalSkills", data)
      }
    />
  );

    case 6:
      return (
        <CertificationsStep
          data={resumeData.certifications}
          onChange={(data) =>
            updateSection("certifications", data)
          }
        />
      );

    case 7:
      return (
        <AchievementsStep
          data={resumeData.achievements}
          onChange={(data) =>
            updateSection("achievements", data)
          }
        />
      );


    default:
      return null;
  }
}

if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
}

return (
  <main className="min-h-screen bg-base-200">
    <div className="max-w-5xl mx-auto py-10 px-6">

      <BuilderHeader
        currentStep={currentStep + 1}
        totalSteps={steps.length}
        title={steps[currentStep]}
      />

      <BuilderProgress
        currentStep={currentStep + 1}
        totalSteps={steps.length}
      />

      <div className="card bg-base-100 shadow-xl mt-8">
        <div className="card-body">
          {renderStep()}
        </div>
      </div>

      <BuilderNavigation
        currentStep={currentStep}
        totalSteps={steps.length}
        onNext={nextStep}
        onPrevious={previousStep}
        onFinish={handleFinish}
        saving={saving}
      />

    </div>
  </main>
);
}