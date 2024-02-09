import OpenAI from "openai";
import * as fs from "fs";
import { linaPrompt } from "./linaPrompt";
import { PDFDocument } from "pdf-lib";
import { config } from "dotenv";
config();

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

const readPdfFile = async (filePath: string) => {
  const dataBuffer: Buffer = fs.readFileSync(filePath);

  const doc = await PDFDocument.load(dataBuffer);
  console.log("Loaded", filePath);
  return doc;
};

const main = async () => {
  const bpmnContent = await readPdfFile("./BPMN.pdf");
  const objects = bpmnContent.context.enumerateIndirectObjects();
  // console.log("objects", objects);

  for (let i = 0; i < objects.length; i++) {
    const indirectObject = objects[i];
    const [objectRef, objectObject] = indirectObject;
    console.log("ref", objectRef.toString());
    console.log("object", objectObject.toString());
    // console.log("object", indirectObject);
    console.log();
    if (i > 3) break;
  }

  // const chatCompletion = await openai.chat.completions.create({
  //   model: "gpt-3.5-turbo",
  //   messages: [
  //     { role: "system", content: linaPrompt },
  //     {
  //       role: "user",
  //       content: `Here is my BPMN : ${bpmnContent}\n\nCan you generate user stories from this BPMN?`,
  //     },
  //   ],
  // });
  // const answer = chatCompletion.choices[0];
  // console.log(JSON.stringify(answer));
};

main();
