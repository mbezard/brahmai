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
// dont use 'as a PM'

type SplitEpicToolArgument = {
  user_stories: string[];
};

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
    tools: [
      {
        type: "function",
        function: {
          name: "split_epic",
          description: "Give back to the user the user stories of the epic.",
          parameters: {
            type: "object",
            properties: {
              user_stories: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    ],
    tool_choice: { type: "function", function: { name: "split_epic" } },
    // response_format: { type: "json_object" },
  });

  const answer = chatCompletion.choices[0];
  const userStories = (
    JSON.parse(
      answer.message.tool_calls?.[0].function.arguments || ""
    ) as SplitEpicToolArgument
  ).user_stories;

  //   const userStories = [
  //     "As an editor, I want to access the version 14.03 of the database with the SFTP instead of FTP.",
  //     "As a user, I want to ensure continuity of service during the migration of the database server to Synapse on Azure.",
  //     "As a data engineer, I want to extract the data from the database for the versions and SGBD used.",
  //     "As a data engineer, I want to set up the infrastructure for the extract process in the preprod and prod environments.",
  //     "As a data engineer, I want to reverse engineer the 14.03 extracts of the reference database.",
  //     "As a data engineer, I want to create the necessary transformations for the 14.03 schema.",
  //     "As a data engineer, I want to create the source and destination in Airbyte for the extract process.",
  //     "As a data engineer, I want to orchestrate the extract process using Prefect.",
  //     "As a data engineer, I want to create a job to dump the data locally in a .bak file.",
  //     "As a data engineer, I want to orchestrate the creation of the MSSQL and the dump job using Prefect.",
  //     "As a data engineer, I want to ensure the compatibility of the dump with MSSQL versions (2012, 2016, 2017, 2019).",
  //   ];
  console.log(userStories);
};

splitEpic({
  epicNotionPageId: "402be25b34e44150a7bf8d7ec853d8e0",
  //   epicNotionPageId: "01bdef21ad0a4c4ea8b330fe545fd4c8",
  ticketsNotionDatabaseId: "b12b3beb97c94b73b7a519dfd46f17d2",
});
