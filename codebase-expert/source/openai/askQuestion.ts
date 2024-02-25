import OpenAI from 'openai';
import {QuestionWithFunction} from './question.type.js';
import {codebaseExpertPrompt} from './prompts.js';
import {RunnableToolFunctionWithParse} from 'openai/lib/RunnableFunction.mjs';
import {exploringTools} from './exploringTools.js';

export const askQuestion = async (
	openai: OpenAI,
	question: QuestionWithFunction,
) => {
	const tools: RunnableToolFunctionWithParse<any>[] | undefined =
		question.function
			? [
					{
						type: 'function',
						function: {
							function: (args: any) => console.log('args', args),
							parse: JSON.parse,
							parameters: question.function.parameters,
							description: 'Run the function',
						},
					},
					...exploringTools,
			  ]
			: exploringTools;

	const runner = openai.beta.chat.completions
		.runTools({
			model: 'gpt-4-turbo-preview',
			messages: [
				{role: 'system', content: codebaseExpertPrompt},
				{
					role: 'user',
					content: question.question,
				},
			],
			tools,
		})
		.on('message', message => {
			console.log('message', message);
		});
	const finalContent = await runner.finalContent();

	console.log('finalContent', finalContent);
	return finalContent;
};
