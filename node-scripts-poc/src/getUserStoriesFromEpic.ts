import { Client } from "@notionhq/client";
import { getTextContentOfBlockFromId } from "./getTextContentOfBlock";
import OpenAI from "openai";

const prePrompt = "You are an expert Product Manager";

const question = "Split the following epic into user stories:";
// dont use 'as a PM'

type SplitEpicToolArgument = {
  user_stories: string[];
};

type Params = {
  epicNotionPageId: string;
  notion: Client;
  openai: OpenAI;
};

export const getUserStoriesFromEpic = async ({
  epicNotionPageId,
  notion,
  openai,
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

  return userStories;
};
