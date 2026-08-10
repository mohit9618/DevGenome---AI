import {GoogleGenAI} from "@google/genai";
import {z} from "zod";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const ResumeAIResponseSchema = z.object({
    bullets: z.array(z.string()).min(1),
});


export async function POST(){
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",

            contents:`
                Rewrite this sentence professionally for a software engineering resume:

                I made a website using React and Node.js to track Codeforces stats.

                Generate 2-3 concise resume bullet points.
                Do not invent technologies, metrics, users, or achievements.
            `,
            
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