import { Tool } from "../tools/tool.type";

export type Agent = {
  type: "agent";
  name: string;
  prePrompt: string;
  tools: (Tool | Agent)[];
};
