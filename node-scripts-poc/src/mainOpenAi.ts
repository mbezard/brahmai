import { Agent, agents } from "all-ai";
import { OpenAI } from "openai";
import { config } from "dotenv";
import { ChatCompletionTool } from "openai/resources";
import { askAgent } from "./askAgent";
config();

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});

const main = async () => {
  const chatCompletion = await askAgent({
    openai,
    agent: agents.ProjectDirectorAgent,
    question: "What is the status of the project?",
  });
  console.log(chatCompletion.choices[0].message.content);

  console.log(JSON.stringify(chatCompletion, null, 2));
};

main();
