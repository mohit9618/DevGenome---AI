import { checkRateLimit } from "@/app/lib/rate-limit";
import { auth } from "@clerk/nextjs/server";
import {GoogleGenAI} from "@google/genai";
import {success, z} from "zod";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});


const ProjectRequestSchema = z.object({
    type: z.literal("project"),
    title: z.string().min(1),
    techStack: z.string().min(1),
    description: z.string().min(1),
});

const ExperienceRequestSchema = z.object({
  type: z.literal("experience"),
  company: z.string().min(1),
  role: z.string().min(1),
  location: z.string(),
  description: z.string().min(1),
});

const SummaryRequestSchema = z.object({
  type: z.literal("summary"),
  summary: z.string().min(1),
});


const ResumeAIRequestSchema = z.union([
  ProjectRequestSchema,
  ExperienceRequestSchema,
  SummaryRequestSchema,
]);

const ResumeAIResponseSchema = z.object({
    bullets: z.array(z.string()).min(1).max(5),
});


export async function POST(request: Request){
    try {

        // authenticate
        const { userId } = await auth();
        if(!userId){
            return Response.json({success:false , error:"Unauthorized",},{status:401});
        }

        // rate limiting
        const rateLimit = await checkRateLimit(userId,"ai");
        if(!rateLimit.success){
            return Response.json({success:false , error:'Too many requests. Please try again later.'},{status:429}); 
        }


        const body = await request.json();

        const input = ResumeAIRequestSchema.safeParse(body);

        if(!input.success){
            return Response.json({success:false,error:"Invalid resume content data.",}, {status:400});
        }

        let prompt = "";
        if(input.data.type === "project"){
            const {title, techStack, description} = input.data;
            prompt = `
        You are an expert technical resume writer.

        Your task is to improve a software project description
        for a professional software engineering resume.

        Project Title:
        ${title}

        Technology Stack:
        ${techStack}

        Current Description:
        ${description}

        Generate 5 concise and impactful resume bullet points.

        Rules:
        - Use strong action verbs.
        - Focus on technical implementation and important features.
        - Use the provided technologies when relevant.
        - Improve the wording professionally.
        - Keep the bullets concise.
        - Do not invent technologies.
        - Do not invent users, metrics, percentages, achievements, or results.
        - Do not add information that is not present in the provided data.
        - Return only the requested JSON structure.
        `;
        }

        if(input.data.type === "experience"){
            const {company,role,location,description,} = input.data;
            prompt =`
            You are an expert professional resume writer.

Your task is to improve a work experience description
for a professional software engineering resume.

Company:
${company}

Role:
${role}

Location:
${location}

Current Description:
${description}

Generate 5 concise and impactful resume bullet points.

Rules:
- Use strong action verbs.
- Improve the wording professionally.
- Focus on responsibilities and contributions.
- Preserve the meaning of the original description.
- Keep the bullets concise.
- Do not invent technologies.
- Do not invent responsibilities.
- Do not invent achievements.
- Do not invent users, metrics, percentages, or results.
- Do not add information that is not present in the provided data.
- Only use information explicitly provided by the user.
- Return only the requested JSON structure.
`;
    }

    if(input.data.type === "summary"){
        const{summary} = input.data;
        prompt = `
        You are an expert professional resume writer.

Your task is to improve the user's resume summary for a professional software engineering resume.

User's Current Summary:
${summary}

Generate 2-3 concise and professional resume summary suggestions.

Rules:
- Each suggestion must be a complete standalone resume summary.
- Preserve the original meaning and facts provided by the user.
- Improve clarity, grammar, wording, and professional tone.
- Make each summary concise and impactful.
- Highlight the user's strengths only when they are explicitly present in the provided summary.
- Do not invent skills, technologies, projects, internships, jobs, achievements, certifications, metrics, users, or results.
- Do not assume the user knows a technology just because they are applying for a software engineering role.
- Do not add numbers, percentages, years of experience, or achievements unless explicitly provided.
- Do not introduce information from outside the provided summary.
- Do not exaggerate the user's experience or abilities.
- Keep each suggestion suitable for a professional software engineering resume.
- Return only the requested JSON structure.
        `
    }

        const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",

            contents:prompt,
            
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: "OBJECT",
                     properties: {
                        bullets: {
                        type: "ARRAY",
                        items: {
                        type: "STRING",
                    },
                },
            },
            required: ["bullets"],
            },
        },
    });

        const rawOutput = response.text;

        if(!rawOutput){
            throw new Error("AI returned an empty response.")
        }

        const parsed = JSON.parse(rawOutput);

        const result = ResumeAIResponseSchema.safeParse(parsed);

        if(!result.success){
            throw new Error("Invalid AI response Format.");
        }

        return Response.json({
            success: true,
            result : result.data,
        });

    } catch (error:any) {
        console.error("AI Error:",error);

        return Response.json(
            {
                success: false,
                error: error?.message || "AI generation failed.",
            },
            {status:500}
        );
    }
}