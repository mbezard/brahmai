import { OpenAI } from "openai";
import { config } from "dotenv";
import { Client } from "@notionhq/client";
import { prompt } from "./prompt";
import { exploringFunctions, notionFunctions } from "./functions";
import { ChatCompletionTool } from "openai/resources";
config();

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const notionMainPageId = "7c26ee89bffb43e0bf2595c9e26dd1c5";
const main = async () => {
  const openaiResponse = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      { role: "system", content: prompt },
      {
        role: "user",
        content: "Give me the list of the modules of my project",
      },
    ],
    tools: [
      ...exploringFunctions.map<ChatCompletionTool>((f) => ({
        type: "function",
        function: f,
      })),
      ...notionFunctions.map<ChatCompletionTool>((f) => ({
        type: "function",
        function: f,
      })),
    ],
  });
  const openaiChoice = openaiResponse.choices[0];

  console.log("Finish reason", openaiChoice.finish_reason);

  if (openaiChoice.finish_reason === "tool_calls") {
    console.log("Function call", openaiChoice.message.tool_calls);
  }
  console.log("OpenAI message", openaiChoice.message.content);
};

main();
