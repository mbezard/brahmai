import { agents } from "all-ai";
import { OpenAI } from "openai";
import { config } from "dotenv";
import { askAgent } from "./askAgent";
config();

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

const main = async () => {
  const { messages, nextStep } = await askAgent({
    openai,
    agent: agents.ProjectDirectorAgent,
    question: "What is the status of the project?",
  });
  console.log(messages, "\n", nextStep);
};

main();
