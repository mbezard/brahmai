import { Tool } from "./tool.type";

export const AllKnowingHumanTool: Tool = {
  type: "tool",
  openaiTool: {
    type: "function",
    function: {
      name: "All Knowing Human",
      description: `
    A human who knows everything. 
    If you don't think any other tool or agent can answer a question, you can ask this human.
    Try first asking other tools and agents before asking this human. 
    But if you are stuck, you can ask this human.
    `,
      parameters: {
        type: "object",
        properties: {
          question: {
            type: "string",
            description: "The question you want to ask the human.",
          },
        },
        required: ["question"],
      },
    },
  },
};
