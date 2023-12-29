import { Tool } from "../tools/tool.type";

export type Agent = {
  type: "agent";
  prePrompt: string;
  tools: (Tool | Agent)[];
};
