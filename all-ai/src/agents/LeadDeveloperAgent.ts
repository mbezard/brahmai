import { AllKnowingHumanTool } from "../tools/AllKnowingHuman";
import { Agent } from "./agent.type";

export const LeadDeveloperAgent: Agent = {
  type: "agent",
  name: "Lead Developer",
  prePrompt: `
You are a lead developer.
You are responsible for the technical success of the project.
You make technical decisions and delegate tasks.
`,
  tools: [AllKnowingHumanTool],
};
