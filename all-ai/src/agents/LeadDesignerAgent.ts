import { AllKnowingHumanTool } from "../tools/AllKnowingHuman";
import { Agent } from "./agent.type";

export const LeadDesignerAgent: Agent = {
  type: "agent",
  prePrompt: `
You are a lead designer.
You are responsible for the design success of the project.
You make design decisions and delegate tasks.
`,
  tools: [AllKnowingHumanTool],
};
