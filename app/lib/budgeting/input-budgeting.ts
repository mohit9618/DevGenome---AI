// using 2 layer for budgeting 
// 1. characters (simple layer)
// 2. tokens (final layer)

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const GEMINI_MODEL = "gemini-3.6-flash";

// layer 1
const MAX_PROMPT_CHARACTERS = 60_000;
// layer 2
const TOKEN_BUDGET = {
    jobFit: 12_000,
    enhancer: 12_000,
    builder: 10_000,
} as const;

type BudgetResult = 
|{success: true; totalTokens: number;}
|{success:false; totalTokens?:number; error: string;};


async function checkInputBudget(
    prompt: string,
    maxTokens: number,
    featureName: string,
):Promise<BudgetResult> {
    
    if(prompt.length > MAX_PROMPT_CHARACTERS){
        console.warn(`[AI Budget] ${featureName} rejected: ${prompt.length} characters.`);

        return{success:false , error: `${featureName} input is too large. Please provide a shorter input.`,};
    }

    try{
        const tokenResponse = await ai.models.countTokens({
        model: GEMINI_MODEL,
        contents: prompt,
    });

    const totalTokens = tokenResponse.totalTokens ?? 0;
    console.log(`[AI Budget] ${featureName}: ${totalTokens}/${maxTokens} tokens.`);

    if(totalTokens > maxTokens){
        return{success:false,totalTokens,error: `${featureName} input is too large to process.`};
    }

    return{success:true , totalTokens};
    }catch(error){
        console.error(`[AI Budget] Token counting failed for ${featureName}:`,error);
        return{success:false, error:"Unable to validate AI input size. Please try again."};
    }

    
    
}


export async function validateJobFitBudget(
    prompt: string
): Promise<BudgetResult>{
    return checkInputBudget(prompt, TOKEN_BUDGET.jobFit , "Job Fit");
}


export async function validateEnhancerBudget(
    prompt: string
): Promise<BudgetResult>{
    return checkInputBudget(prompt, TOKEN_BUDGET.enhancer , "Resume enhancement");
}


export async function validateBuilderBudget(
    prompt: string
): Promise<BudgetResult>{
    return checkInputBudget(prompt, TOKEN_BUDGET.builder , "Resume Builder");
}
