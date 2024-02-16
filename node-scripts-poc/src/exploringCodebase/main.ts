import { prompt } from "./prompt";
import { exploringFunctions, notionFunctions } from "./functions";
import {
  ChatCompletionMessageParam,
  ChatCompletionTool,
} from "openai/resources";
import { executeFunction } from "./executeFunction";
import { isFunctionName } from "./functions.type";
import { openai } from "./clients";

const tools: ChatCompletionTool[] = [
  ...exploringFunctions.map<ChatCompletionTool>((f) => ({
    type: "function",
    function: f,
  })),
  ...notionFunctions.map<ChatCompletionTool>((f) => ({
    type: "function",
    function: f,
  })),
];

const main = async () => {
  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: prompt },
    {
      role: "user",
      content: "Give me the list of the modules of my project",
    },
  ];

  for (let i = 0; i < 4; i++) {
    console.log("----- Iteration", i, "-----");
    const openaiResponse = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages,
      tools,
    });
    const openaiChoice = openaiResponse.choices[0];
    messages.push({
      role: "assistant",
      tool_calls: openaiChoice.message.tool_calls,
    });

    console.log("[OPENAI] Finish reason", openaiChoice.finish_reason);
    if (openaiChoice.finish_reason === "stop") {
      break;
    }

    if (openaiChoice.finish_reason === "tool_calls") {
      console.log("[OPENAI] Some functions have been called");
      for (const toolCall of openaiChoice.message.tool_calls || []) {
        console.log("[OPENAI] Tool call", toolCall);
        if (!isFunctionName(toolCall.function.name))
          throw new Error("Invalid function name");
        const functionOutput = await executeFunction(
          toolCall.function.name,
          JSON.parse(toolCall.function.arguments)
        );
        console.log("Function output", functionOutput);
        messages.push({
          role: "tool",
          content: functionOutput,
          tool_call_id: toolCall.id,
        });
      }
      if (openaiChoice.message.content)
        console.log("[OPENAI] OpenAI message: ", openaiChoice.message.content);
    }
  }
};

main();
