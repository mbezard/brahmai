import * as dotenv from "dotenv";
import { OpenAI } from "openai";
import { getTextContentOfBlockFromId } from "./getTextContentOfBlock";
import { Client } from "@notionhq/client";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const prePrompt = "You are an expert Product Manager";

const question = "Split the following epic into user stories:";

type Params = {
  epicNotionPageId: string;
  ticketsNotionDatabaseId: string;
};

export const splitEpic = async ({
  epicNotionPageId,
  ticketsNotionDatabaseId,
}: Params) => {
  const epicString = await getTextContentOfBlockFromId(
    epicNotionPageId,
    notion
  );

  const questionWithEpic = `${question}\n\n${epicString}`;

  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: prePrompt },
      { role: "user", content: questionWithEpic },
    ],
  });

  const answer = chatCompletion.choices[0].message;

  console.log(answer);
};

splitEpic({
  epicNotionPageId: "01bdef21ad0a4c4ea8b330fe545fd4c8",
  ticketsNotionDatabaseId: "b12b3beb97c94b73b7a519dfd46f17d2",
});
