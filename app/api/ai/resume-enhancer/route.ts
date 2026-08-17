// pipeline: PDF ->Extract -> clean -> anonymize -> gemini -> structured analysis -> return alalysis to frontend

import { extractText } from "unpdf";
import { cleanResumeText } from "@/app/lib/cleanResumeText";
import { anonymizeResumeText } from "@/app/lib/resume/anonymizeResumeText";

import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const ResumeAnalysisSchema = z.object({
  overallScore: z.number().min(0).max(100),

  atsScore: z.number().min(0).max(100),

  overall: z.object({
    strengths: z.array(z.string()),
    weaknesses: z.array(z.string()),
  }),

  sections: z.object({
    summary: z.object({
      score: z.number().min(0).max(100),
      present: z.boolean(),
      feedback: z.array(z.string()),
      suggestions: z.array(z.string()),
    }),

    education: z.object({
      score: z.number().min(0).max(100),
      present: z.boolean(),
      feedback: z.array(z.string()),
      suggestions: z.array(z.string()),
    }),

    experience: z.object({
      score: z.number().min(0).max(100),
      present: z.boolean(),
      feedback: z.array(z.string()),
      suggestions: z.array(z.string()),
    }),

    projects: z.object({
      score: z.number().min(0).max(100),
      present: z.boolean(),
      feedback: z.array(z.string()),
      suggestions: z.array(z.string()),
    }),

    skills: z.object({
      score: z.number().min(0).max(100),
      present: z.boolean(),
      feedback: z.array(z.string()),
      suggestions: z.array(z.string()),
    }),

    certifications: z.object({
      score: z.number().min(0).max(100),
      present: z.boolean(),
      feedback: z.array(z.string()),
      suggestions: z.array(z.string()),
    }),

    achievements: z.object({
      score: z.number().min(0).max(100),
      present: z.boolean(),
      feedback: z.array(z.string()),
      suggestions: z.array(z.string()),
    }),
  }),
});


export async function POST(request:Request){
    try {
        const formData = await request.formData();
        const file = formData.get("file");

        if(!(file instanceof File)){
            return Response.json({success:false , error:'No PDF file Provided.'},{status:400});
        }

        if(file.type !== "application/pdf"){
            return Response.json({success:false , error:"Only PDF files are allowed."},{status:400});
        }

        const arrayBuffer = await file.arrayBuffer();
        
        const { text } = await extractText(arrayBuffer,{mergePages:true,});

        const cleanedText = cleanResumeText(text);

        const anonymizedText = anonymizeResumeText(cleanedText);

        console.log("Resume extracted, cleaned and anonymized successfully.");


        const prompt = `
You are an expert professional resume reviewer.

Analyze the following resume.

Resume:
${anonymizedText}

Evaluate:

- Overall resume quality.
- ATS compatibility.
- Summary quality.
- Education quality.
- Experience quality.
- Projects quality.
- Technical skills quality.
- Certifications quality.
- Achievements quality.

For every section:
- Give a score from 0 to 100.
- Determine whether the section is present.
- Provide concise feedback.
- Provide concise improvement suggestions.

Scoring should reflect the actual quality of the information present.

Important rules:

- Analyze ONLY information present in the resume.
- Never invent skills, technologies, experience, achievements,
  certifications, metrics, rankings, or qualifications.
- Do not assume information that is not explicitly present.
- If a section is missing, mark it as not present and give it a score of 0.
- Suggestions should improve the existing resume, not create fictional content.
- Keep feedback concise.
`;

    const response = await ai.models.generateContent({
  model: "gemini-3.6-flash",

  contents: prompt,

  config: {
    responseMimeType: "application/json",

    responseSchema: {
      type: "OBJECT",

      properties: {
        overallScore: {
          type: "NUMBER",
        },

        atsScore: {
          type: "NUMBER",
        },

        overall: {
          type: "OBJECT",
          properties: {
            strengths: {
              type: "ARRAY",
              items: {
                type: "STRING",
              },
            },

            weaknesses: {
              type: "ARRAY",
              items: {
                type: "STRING",
              },
            },
          },
          required: ["strengths", "weaknesses"],
        },

        sections: {
          type: "OBJECT",

          properties: {
            summary: {
              type: "OBJECT",
              properties: {
                score: { type: "NUMBER" },
                present: { type: "BOOLEAN" },
                feedback: {
                  type: "ARRAY",
                  items: { type: "STRING" },
                },
                suggestions: {
                  type: "ARRAY",
                  items: { type: "STRING" },
                },
              },
              required: [
                "score",
                "present",
                "feedback",
                "suggestions",
              ],
            },

            education: {
              type: "OBJECT",
              properties: {
                score: { type: "NUMBER" },
                present: { type: "BOOLEAN" },
                feedback: {
                  type: "ARRAY",
                  items: { type: "STRING" },
                },
                suggestions: {
                  type: "ARRAY",
                  items: { type: "STRING" },
                },
              },
              required: [
                "score",
                "present",
                "feedback",
                "suggestions",
              ],
            },

            experience: {
              type: "OBJECT",
              properties: {
                score: { type: "NUMBER" },
                present: { type: "BOOLEAN" },
                feedback: {
                  type: "ARRAY",
                  items: { type: "STRING" },
                },
                suggestions: {
                  type: "ARRAY",
                  items: { type: "STRING" },
                },
              },
              required: [
                "score",
                "present",
                "feedback",
                "suggestions",
              ],
            },

            projects: {
              type: "OBJECT",
              properties: {
                score: { type: "NUMBER" },
                present: { type: "BOOLEAN" },
                feedback: {
                  type: "ARRAY",
                  items: { type: "STRING" },
                },
                suggestions: {
                  type: "ARRAY",
                  items: { type: "STRING" },
                },
              },
              required: [
                "score",
                "present",
                "feedback",
                "suggestions",
              ],
            },

            skills: {
              type: "OBJECT",
              properties: {
                score: { type: "NUMBER" },
                present: { type: "BOOLEAN" },
                feedback: {
                  type: "ARRAY",
                  items: { type: "STRING" },
                },
                suggestions: {
                  type: "ARRAY",
                  items: { type: "STRING" },
                },
              },
              required: [
                "score",
                "present",
                "feedback",
                "suggestions",
              ],
            },

            certifications: {
              type: "OBJECT",
              properties: {
                score: { type: "NUMBER" },
                present: { type: "BOOLEAN" },
                feedback: {
                  type: "ARRAY",
                  items: { type: "STRING" },
                },
                suggestions: {
                  type: "ARRAY",
                  items: { type: "STRING" },
                },
              },
              required: [
                "score",
                "present",
                "feedback",
                "suggestions",
              ],
            },

            achievements: {
              type: "OBJECT",
              properties: {
                score: { type: "NUMBER" },
                present: { type: "BOOLEAN" },
                feedback: {
                  type: "ARRAY",
                  items: { type: "STRING" },
                },
                suggestions: {
                  type: "ARRAY",
                  items: { type: "STRING" },
                },
              },
              required: [
                "score",
                "present",
                "feedback",
                "suggestions",
              ],
            },
          },

          required: [
            "summary",
            "education",
            "experience",
            "projects",
            "skills",
            "certifications",
            "achievements",
          ],
        },
      },

      required: [
        "overallScore",
        "atsScore",
        "overall",
        "sections",
      ],
    },
  },
});

    const rawOutput = response.text;

    if(!rawOutput){
        throw new Error(
            "AI returned an empty response."
        );
    }

    const parsed = JSON.parse(rawOutput);

    console.log("========== GEMINI OUTPUT ==========");
console.log(JSON.stringify(parsed, null, 2));

    const result = ResumeAnalysisSchema.safeParse(parsed);

    if(!result.success){
          console.error("========== ZOD VALIDATION ERROR ==========");
    console.error(result.error.issues);
        throw new Error('Invalid AI analysis format.')
    }


        return Response.json({
            success:true,
            analysis: result.data,
        });

    } catch (error:any) {
        console.error("PDF Extraction Error:",error);

        return Response.json({success:false, error: error?.message || "Failed to extract the PDF text."},{status:500});
    }
}