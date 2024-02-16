import { FunctionDefinition } from "openai/resources";

const lsFunction: FunctionDefinition = {
  name: "lsFunction",
  description: "Get the list of files in the current directory",
  parameters: {
    type: "object",
    properties: {
      path: {
        type: "string",
        description: "The path to the directory",
      },
    },
  },
};

const catFunction: FunctionDefinition = {
  name: "catFunction",
  description: "Get the content of a file",
  parameters: {
    type: "object",
    properties: {
      path: {
        type: "string",
        description: "The path to the file",
      },
    },
  },
};

const readNotionPageFunction: FunctionDefinition = {
  name: "readNotionPageFunction",
  description: "Get the content of a Notion page",
  parameters: {
    type: "object",
    properties: {
      pageId: {
        type: "string",
        description: "The id of the page",
      },
    },
  },
};

const writeNotionPageFunction: FunctionDefinition = {
  name: "writeNotionPageFunction",
  description: "Write content to a Notion page",
  parameters: {
    type: "object",
    properties: {
      pageId: {
        type: "string",
        description: "The id of the page",
      },
      content: {
        type: "string",
        description: "The content to write",
      },
    },
  },
};

export const notionFunctions = [
  readNotionPageFunction,
  writeNotionPageFunction,
];
export const exploringFunctions = [lsFunction, catFunction];
