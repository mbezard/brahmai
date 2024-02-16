import { Client } from "@notionhq/client";

type Params = {
  notion: Client;
  userStories: string[];
  userStoriesDatabaseId: string;
};

export const createUserStoriesCardsInNotion = async ({
  notion,
  userStories,
  userStoriesDatabaseId,
}: Params) => {
  for (const userStory of userStories) {
    await notion.pages.create({
      parent: { database_id: userStoriesDatabaseId },
      properties: {
        Name: { title: [{ text: { content: userStory } }] },
        Status: { status: { name: "Backlog" } },
      },
    });
  }
};
