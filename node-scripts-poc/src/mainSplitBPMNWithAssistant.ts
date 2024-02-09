import OpenAI from "openai";
import * as fs from "fs";
import { config } from "dotenv";
import { linaPrompt } from "./linaPrompt";
config();

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

const main = async () => {
  const file = fs.createReadStream("./BPMN.pdf");

  const openaiFile = await openai.files.create({
    file,
    purpose: "assistants",
  });

  const assistant = await openai.beta.assistants.create({
    name: "BPMN to User Story Assistant",
    model: "gpt-4-turbo-preview",
    instructions: linaPrompt,
  });

  const thread = await openai.beta.threads.create();
  await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: "Can you generate user stories from this BPMN?",
    file_ids: [openaiFile.id],
  });

  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistant.id,
  });

  let status:
    | "queued"
    | "in_progress"
    | "requires_action"
    | "cancelling"
    | "cancelled"
    | "failed"
    | "completed"
    | "expired" = "queued";
  while (status !== "completed") {
    const runUpdated = await openai.beta.threads.runs.retrieve(
      thread.id,
      run.id
    );
    status = runUpdated.status;
    console.log("Status", status);
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  const messages = await openai.beta.threads.messages.list(thread.id);

  console.log("Messages", JSON.stringify(messages.data));

  // Clean up
  await openai.files.del(openaiFile.id);
  await openai.beta.assistants.del(assistant.id);
  await openai.beta.threads.del(thread.id);
};

main();
