import OpenAI from "openai";
import * as fs from "fs";
import { config } from "dotenv";
import { askBpmnUserStoryAssistant } from "./agents/bpmnUserStoryAssistant";
config();

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

const main = async () => {
  const file = fs.createReadStream("./BPMN.pdf");

  const { commentsFromAssistant, userStories } =
    await askBpmnUserStoryAssistant(openai, file);

  console.log("commentsFromAssistant", commentsFromAssistant);
  console.log("userStories", userStories);
};

main();
