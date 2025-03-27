import { GoogleGenerativeAI, GenerationConfig } from "@google/generative-ai";
console.log("process.env:", process.env); // Add this line
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("❌ Missing GEMINI_API_KEY in environment.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig: GenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const AIchatSession = model.startChat({
  generationConfig,
  history: [],
});

export async function generateResponse(prompt: string) {
  try {
    const result = await AIchatSession.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Error generating response:", error);
    return "An error occurred while generating the response.";
  }
}
