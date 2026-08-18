import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/app/lib/prisma";

import { deductCredit ,refundCredit , createUsageLog } from "@/app/lib/credits/credit.service";
import { UsageFeature } from "@/app/generated/prisma/enums";

import { extractText } from "unpdf";
import { cleanResumeText } from "@/app/lib/cleanResumeText";
import { anonymizeResumeText } from "@/app/lib/resume/anonymizeResumeText";

import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import ResponseCache from "next/dist/server/response-cache";



const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const JobFitAnalysisSchema = z.object({
  overallFitScore: z.number().min(0).max(100),
  skillsMatchScore: z.number().min(0).max(100),
  experienceMatchScore: z.number().min(0).max(100),
  projectRelevanceScore: z.number().min(0).max(100),
  educationMatchScore: z.number().min(0).max(100),
  matchingSkills: z.array(z.string()),
  missingSkills: z.array(z.string()),
  strengths: z.array(z.string()),
  improvements: z.array(z.string()),
  recommendation: z.enum([
    "Strong Fit",
    "Moderate Fit",
    "Low Fit",
  ]),
});

export async function POST(request:Request){

    let creditDeducted = false;
    let databaseUserId: string | null = null;

    try {
        // authenticate
        const {userId} = await auth();
            if(!userId){
                 return Response.json({success:false , error:"Unauthorized"},{status:401});
         }

        const user = await prisma.user.findUnique({where:{clerkId:userId,},});
            if(!user){
                return Response.json({success:false , error:"User Not found."},{status:404});
            }
            databaseUserId = user.id;



        const formData = await request.formData();
        const file = formData.get("file");
        const company = formData.get("company");
        const position = formData.get("position");
        const jobDescription = formData.get("jobDescription");

        if(!(file instanceof File)){
            return Response.json({success:false , error:'No PDF file Provided.'},{status:400});
        }

        if(file.type !== "application/pdf"){
            return Response.json({success:false , error:"Only PDF files are allowed."},{status:400});
        }

        if(typeof company != "string" || !company.trim()){
            return Response.json({success:false , error:"Company name is required.",},{status:400});
        }

        if(typeof position != "string" || !position.trim()){
            return Response.json({success:false , error:"Hiring position is required."},{status:400});
        }

        if(typeof jobDescription != "string" || !jobDescription.trim()){
            return Response.json({success:false , error:"Job description is required."},{status:400});
        }


        await deductCredit(user.id);
        creditDeducted = true;


        const arrayBuffer = await file.arrayBuffer();
        
        const { text } = await extractText(arrayBuffer,{mergePages:true,});

        const cleanedText = cleanResumeText(text);

        const anonymizedText = anonymizeResumeText(cleanedText);

        console.log("Resume extracted, cleaned and anonymized successfully.");

        const prompt = `
You are a professional resume and job-fit analyzer.

Your task is to compare the candidate's resume against a specific
job opportunity.

IMPORTANT RULES:

1. Analyze ONLY information actually present in the resume.
2. NEVER invent or assume skills, projects, technologies,
   experience, certifications, education, achievements, or tools.
3. Do not treat general knowledge of a technology as evidence that
   the candidate knows that technology.
4. Only include a skill in matchingSkills if that skill is explicitly
   present in the resume.
5. Only include a skill in missingSkills if it is explicitly required
   or strongly indicated by the job description AND is not clearly
   demonstrated in the resume.
6. Competitive programming experience does NOT automatically mean
   that "Data Structures and Algorithms" is a listed resume skill.
7. Similar technologies must not be treated as identical.
   For example, Node.js does not mean Java, and JavaScript does not
   mean TypeScript.
8. Evaluate the candidate based on evidence in the resume.
9. Do not reward or penalize the candidate based on personal
   information such as name, email, phone number or location.
10. Do not suggest that the candidate add a skill to their resume
    unless the skill is actually demonstrated by the candidate.
11. Recommendations should focus on genuine improvements the
    candidate can make.
12. Return ONLY valid JSON.
13. The JSON MUST exactly follow the structure specified below.
14. Do not add, remove, rename, or change any fields.

COMPANY:
${company.trim()}

HIRING POSITION:
${position.trim()}

JOB DESCRIPTION:
${jobDescription.trim()}

ANONYMIZED RESUME:
${anonymizedText}


RETURN JSON IN EXACTLY THIS STRUCTURE:

{
  "overallFitScore": 0,
  "skillsMatchScore": 0,
  "experienceMatchScore": 0,
  "projectRelevanceScore": 0,
  "educationMatchScore": 0,

  "matchingSkills": [],

  "missingSkills": [],

  "strengths": [],

  "improvements": [],

  "recommendation": "Strong Fit"
}

SCORING:

overallFitScore:
Overall suitability of the candidate for this specific job.

skillsMatchScore:
How well the candidate's demonstrated skills match the skills
required by the job.

experienceMatchScore:
How relevant the candidate's actual experience is to the job.

projectRelevanceScore:
How relevant the candidate's actual projects are to the job.

educationMatchScore:
How well the candidate's education matches the stated requirements.

RECOMMENDATION:

90-100 -> "Strong Fit"
70-89  -> "Moderate Fit"
0-69   -> "Low Fit"

Do not calculate scores from missing information as if it were present.
Base every score on evidence from the resume and job description.
`;


        const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",

            contents: prompt,

            config: {
                responseMimeType: "application/json",
            },
        });

        const rawOutput = response.text;
        if(!rawOutput){
            throw new Error('Geminin returned an empty response.')
        }

        console.log("====Gemini Output====");
        console.log(rawOutput);

        let parsedOutput: unknown;

        try {
            parsedOutput = JSON.parse(rawOutput);
        } catch{
            console.error("Invalid JSON returned by Gemini.");
            console.error(rawOutput);

            throw new Error("Gemini returned invalid json.");
        }

        const result = JobFitAnalysisSchema.safeParse(parsedOutput);

        if(!result.success){
            console.error("Zod validation error.");
            console.error("result.error.issues");

            throw new Error("Invalid AI job fit analysis format.");
        }


        try {
            await createUsageLog(user.id , UsageFeature.JOB_FIT , 1);
        }catch(usageError){
            console.error("Failed to create usage log:",usageError);
        }


        return Response.json({
            success:true,
            company: company.trim(),
            position: position.trim(),
            analysis: result.data,
        });

    } catch (error:any) {
        console.error("Job Fir Analyzer Error:",error);

        if(error?.message === "No credits remaining"){
            return Response.json({success:false, error:"No AI credits remaining"},{status:403});
        }

        if(creditDeducted && databaseUserId){
            try {

                await refundCredit(databaseUserId);
                console.log("Credit refunded successfully.")

            } catch (refundError) {
                console.log("Failed to refund credit.", refundError);
            }
        }


        return Response.json({
            success:false , 
            error:
                process.env.NODE_ENV === "development"? error?.message || "Unkonwn server error." : "Failed to process job-fit request."
            },{status:500});
    }
}