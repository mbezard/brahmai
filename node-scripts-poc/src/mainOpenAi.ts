import { Agent, agents } from "all-ai";
import { OpenAI } from "openai";
import { config } from "dotenv";
import { ChatCompletionTool } from "openai/resources";
config();

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});

type Params = {
  agent: Agent;
  question: string;
};

const askAgent = async ({ agent, question }: Params) => {
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

  console.log(chatCompletion.choices[0].message.content);

  console.log(JSON.stringify(chatCompletion, null, 2));
};

const main = async () => {
  await askAgent({
    agent: agents.ProjectDirectorAgent,
    question: "What is the status of the project?",
  });
};

main();
