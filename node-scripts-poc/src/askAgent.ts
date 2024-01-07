import { Agent } from "all-ai";
import OpenAI from "openai";
import { ChatCompletion, ChatCompletionTool } from "openai/resources";

type Params = {
  openai: OpenAI;
  agent: Agent;
  question: string;
};

export const askAgent = async ({
  openai,
  agent,
  question,
}: Params): Promise<ChatCompletion> => {
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: agent.prePrompt },
      { role: "user", content: question },
    ],
    tools: agent.tools.map<ChatCompletionTool>((tool) => {
      switch (tool.type) {
        case "agent":
          return {
            type: "function",
            function: {
              name: tool.name.replace(/ /g, "_"),
              description: `You can ask ${tool.name} any question about your project and they will answer it by delegating the task to a tool or agent.`,
              parameters: {
                type: "object",
                properties: {
                  question: {
                    type: "string",
                    value: question,
                    description: "The question to ask the agent.",
                  },
                },
              },
            },
          };
        case "tool":
          if (tool.openaiTool?.type != "function")
            throw new Error("Tool is not a function or not handled.");
          return {
            type: "function",
            function: {
              ...tool.openaiTool.function,
              name: tool.openaiTool.function.name.replace(/ /g, "_"),
            },
          };
      }
    }),
  });
  return chatCompletion;
};
