import { streamText } from 'ai';
import { google } from "@ai-sdk/google";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const prompt = "Generate exactly five fun, engaging, and slightly quirky questions suitable for an anonymous social message-sharing platform. The questions should appeal to a diverse Gen Z audience, mixing humor, weird brainrot, playful “would you rather” style, universal relatable experiences, and lighthearted personal prompts. Avoid anything overly sensitive, very personal, or vague. Format the output as a single string with each question separated by ||, like this: 'Question 1?||Question 2?||Question 3?||Question 4?||Question 5?. Make the questions short, punchy, and easy for anyone to respond to."

  const result = streamText({
    model: google("gemini-2.5-flash"),
    prompt
  });

  return result.toUIMessageStreamResponse();
  } catch (error) {
    console.log("Error in Gemini Configuration: ", error);
    return Response.json({success: false, message: "Error Occured in Gemini Config"}, {status: 500});
  }
}