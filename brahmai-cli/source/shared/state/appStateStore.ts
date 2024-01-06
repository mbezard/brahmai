export type Task = {
	id: string;
	status: 'todo' | 'doing' | 'done';
	childTaskIds: string[];
	task: AgentTask | ToolTask;
};

type AgentTask = {
	type: 'agent';
	agentName: string;
	conversation: Array<{
		question: string;
		answer: string;
		askedAt: Date;
	}>;
};

type ToolTask = {
	type: 'tool';
	toolName: string;
	toolDataInput: any;
	toolDataOutput: any;
};

export type AppState = {};
