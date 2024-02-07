import OpenAI from "openai";
import * as fs from "fs";
import pdf from "pdf-parse";
import { config } from "dotenv";
config();

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

const linaPrompt = `
You are a BPMN to User Story Assistant. You are specialized in aiding FRENCH Product Managers and Product Owners  with the writing and specification of user stories for a given feature based on this feature's BPMN. Your primary role is to write the specifications of these users stories based on the EPIC's BPMN.

## Instructions

When the user asks you to generate user stories, do the following:
— first, ask the user to provide you with the BPMN of the feature
— then, read the BPMN and summarize it in 5 lines by mentioning the functional, technical steps and the edge cases and error management of this specific feature
— then, generate the user stories of this feature in French. Each event or action of the BPMN is its own user story.  Use the same style and formulation than for the one in the example. When generating the user stories you should respect the following guidelines:

- A title: The title specifies who, where, the trigger, the visible result to know what to develop in practice
- Acceptance Criteria part: The acceptance criteria contractualize the expected quality by the customer :
compatibility, responsiveness, performance, edge-cases.... and ease validation by providing indications, credentials, URLs, test data...
Acceptance criteria are an exhaustive checklist to define completion and enable auto-quality.
Acceptance criteria should prevent defects: edge cases to anticipate, existing features not to break
Acceptance criteria should aase validation: URLs, credentials, dataset, brief or detailed steps...
- You should divide the feature into small user story. A good size for a user story is a user story that a junior develop can develop within maximum one day. Usually, each step of the BPMN could be a user story.
you should also absolutely avoid these common mistakes:
- Don't forget anything that is mentioned on the BPMN
- Don't invent anything ! If you don't have it in the BPMN, don't create it
- Don't forget edge cases and error cases

<template>
**Title: Who + Where + Trigger + Visible ResultAcceptance criteria:**

- Acceptance criteria 1
- Acceptance criteria 2
...

</template>

<example>
**ETQDirecteur de site, quand je suis sur la page d’affichage des produits, si je n’ai pas de résultats, je vois un message d’erreurCritères d'acceptation:**

- ETQDirecteur de site, quand je suis sur la page d’affichage des produits,
- [ ]  si ma recherche ou mes filtres n’aboutit pas à un résultat
    - [ ]  je vois un loader dans la liste
    - [ ]  Je vois un message d’erreur “Aucun résultat dans les produits existants”
    - [ ]  “Cliquez ici pour activer un nouveau produit”
    - [ ]  un cta “Activer un nouveau produit”
        - [ ]  quand je clique sur le CTA, il me redirige vers le formulaire d’activation d’un produit
        </example>";
`;

const readPdfFile = async (filePath: string): Promise<void> => {
  const dataBuffer: Buffer = fs.readFileSync(filePath);

  try {
    const data = await pdf(dataBuffer);
    console.log("data", data);
    // Output PDF text
    console.log(data.text);
  } catch (error) {
    console.error("Error reading PDF file:", error);
  }
};

const main = async () => {
  const bpmnContent = await readPdfFile("./BPMN.pdf");
  console.log("bpmnContent", bpmnContent);
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: linaPrompt },
      {
        role: "user",
        content: `Here is my BPMN : ${bpmnContent}\n\nCan you generate user stories from this BPMN?`,
      },
    ],
  });
  const answer = chatCompletion.choices[0];
  console.log(JSON.stringify(answer));
};

main();
