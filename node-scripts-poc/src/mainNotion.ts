import { Client } from "@notionhq/client";
import * as dotenv from "dotenv";
import { getTextContentOfBlockFromId } from "./getTextContentOfBlock";
dotenv.config();

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const main = async () => {
  const page = await notion.pages.retrieve({
    page_id: "2c5d22f5456a44fd820db3d278ffeece",
  });

  if (!("properties" in page)) return;

  console.log(
    "Title : ",
    page.properties.title.type === "title"
      ? page.properties.title.title.map((block) => block.plain_text).join("")
      : ""
  );

  console.log(
    await getTextContentOfBlockFromId(
      "2c5d22f5456a44fd820db3d278ffeece",
      notion
    )
  );
};

main();
