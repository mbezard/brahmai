import { AllKnowingHumanTool } from "../tools/AllKnowingHuman";
import { Agent } from "./agent.type";

export const LeadProductManagerAgent: Agent = {
  type: "agent",
  name: "Lead Product Manager",
  prePrompt: `
You are a lead product manager.
You are responsible for the product specifications and success of the project.
You make technical decisions and delegate tasks.
`,
  tools: [AllKnowingHumanTool],
};
