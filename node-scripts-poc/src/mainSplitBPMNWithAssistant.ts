import OpenAI from "openai";
import * as fs from "fs";
import { PDFDocument } from "pdf-lib";
import { config } from "dotenv";
import { linaPrompt } from "./mainSplitFromBpmn";
import { Run } from "openai/resources/beta/threads/runs/runs";
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
    model: "gpt-4-turbo",
    instructions: linaPrompt,
    // file_ids: [openaiFile.id],
    // tools: [{ type: "retrieval" }],
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

  let status: Run.status = "running";
  while (status === "running") {
    const runUpdated = await openai.beta.threads.runs.retrieve(
      thread.id,
      run.id
    );
    status = runUpdated.status;
    console.log("Status", status);
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  // Clean up
  await openai.files.del(openaiFile.id);
  await openai.beta.assistants.del(assistant.id);
  await openai.beta.threads.del(thread.id);
};

main();
