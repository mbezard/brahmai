import { AllKnowingHumanTool } from "../tools/AllKnowingHuman";
import { Agent } from "./agent.type";

export const LeadDesignerAgent: Agent = {
  type: "agent",
  name: "Lead Designer",
  prePrompt: `
You are a lead designer.
You are responsible for the design success of the project.
You make design decisions and delegate tasks.
`,
  tools: [AllKnowingHumanTool],
};
