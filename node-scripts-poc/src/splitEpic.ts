import * as dotenv from "dotenv";
import { OpenAI } from "openai";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

type Params = {
  epicNotionPageId: string;
  ticketsNotionDatabaseId: string;
};

export const splitEpic = async ({
  epicNotionPageId,
  ticketsNotionDatabaseId,
}: Params) => {};

splitEpic({
  epicNotionPageId:
    "2cbc859cb173430da6cc71f733d7064a?p=01bdef21ad0a4c4ea8b330fe545fd4c8",
  ticketsNotionDatabaseId: "b12b3beb97c94b73b7a519dfd46f17d2",
});
