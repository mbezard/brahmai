export type Tool = {
  type: "tool";
  openaiTool?: OpenAiTool;
};

type OpenAiTool =
  | OpenAiRetrievalTool
  | OpenAiCodeInterpreterTool
  | OpenAiFunctionTool;
type OpenAiRetrievalTool = {
  type: "retrieval";
};
type OpenAiCodeInterpreterTool = {
  type: "code_interpreter";
};
type OpenAiFunctionTool = {
  type: "function";
  function: {
    name: string;
    description: string;
    parameters: {
      type: string;
      properties: {
        [key: string]: {
          type: string;
          description: string;
        };
      };
      required?: string[];
    };
  };
};

// Example:
// "parameters": {
//     "type": "object",
//     "properties": {
//         "location": {
//             "type": "string",
//             "description": "The city and state, e.g. San Francisco, CA",
//         },
//         "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]},
//     },
//     "required": ["location"],
// },
