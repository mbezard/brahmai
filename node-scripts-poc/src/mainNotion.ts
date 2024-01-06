import { Client, isFullPage } from "@notionhq/client";
import * as dotenv from "dotenv";
import { getTextContentOfBlockFromId } from "./getTextContentOfBlock";
dotenv.config();

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const readTitle = async () => {
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
};
export const readPage = async () => {
  console.log(
    await getTextContentOfBlockFromId(
      "2c5d22f5456a44fd820db3d278ffeece",
      notion
    )
  );
};

// const propertiesInDailyBoard = {
//   Status: ["Backlog", "CA OK", "AT OK", "In progress", "Done"],
//   Name: ""
// };

const main = async () => {
  const { results } = await notion.databases.query({
    database_id: "b12b3beb97c94b73b7a519dfd46f17d2",
    // filter: {
    //   property: "Status",
    //   status: {
    //     equals: "In progress",
    //   },
    // },
  });

  Promise.all(
    results.map(async (page): Promise<void> => {
      if (!isFullPage(page)) return;
      if (page.properties.Name.type !== "title") return;

      const content = await getTextContentOfBlockFromId(page.id, notion);
      console.log(
        "PAGE : ",
        page.properties.Name.title.map((block) => block.plain_text).join("")
      );
      console.log("CONTENT : \n", content, "\n --- \n");
    })
  );
};

main();
