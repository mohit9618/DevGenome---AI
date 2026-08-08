export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedIn: string;
  github: string;
  portfolio: string;
}

export interface Education {
  degree: string;
  institute: string;
  startYear: string;
  endYear: string;
  cgpa: string;
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Project {
  title: string;
  techStack: string;
  github: string;
  liveDemo: string;
  description: string;
}

export interface ProgrammingLanguage {
  language: string;
}

export interface Certification {
  name: string;
  organization: string;
  issueDate: string;
  credentialId: string;
  credentialUrl: string;
}

export interface Achievement {
  title: string;
  organization: string;
  date: string;
  description: string;
}

export interface TechnicalSkills {
  languages: string[];
  coreCS:string[];
  frontend: string[];
  backend: string[];
  database: string[];
  tools: string[];
  technologies: string[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  technicalSkills: TechnicalSkills;
  certifications: Certification[];
  achievements: Achievement[];
}