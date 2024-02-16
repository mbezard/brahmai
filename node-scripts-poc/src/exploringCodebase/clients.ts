import { OpenAI } from "openai";
import { config } from "dotenv";
import { Client } from "@notionhq/client";
config();

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});
