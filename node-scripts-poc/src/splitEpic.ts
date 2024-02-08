import * as dotenv from "dotenv";
import { OpenAI } from "openai";
import { getTextContentOfBlockFromId } from "./getTextContentOfBlock";
import { Client } from "@notionhq/client";
import { getUserStoriesFromEpic } from "./getUserStoriesFromEpic";
import { createUserStoriesCardsInNotion } from "./createUserStoriesCardsInNotion";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

type Params = {
  epicNotionPageId: string;
  ticketsNotionDatabaseId: string;
};

export const splitEpic = async ({
  epicNotionPageId,
  ticketsNotionDatabaseId,
}: Params) => {
  const userStories = await getUserStoriesFromEpic({
    epicNotionPageId,
    notion,
    openai,
  });
  console.log(userStories);

  await createUserStoriesCardsInNotion({
    notion,
    userStories,
    userStoriesDatabaseId: ticketsNotionDatabaseId,
  });
};

splitEpic({
  epicNotionPageId: "402be25b34e44150a7bf8d7ec853d8e0",
  ticketsNotionDatabaseId: "b12b3beb97c94b73b7a519dfd46f17d2",
});
