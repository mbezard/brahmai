import OpenAI from 'openai';
import {QuestionWithFunction} from './question.type.js';
import {codebaseExpertPrompt} from './prompts.js';
import {RunnableToolFunctionWithParse} from 'openai/lib/RunnableFunction.mjs';
import {exploringTools} from './exploringTools.js';

type PrematureResultsRef = {
	current: string | undefined;
};

export const askQuestion = async (
	openai: OpenAI,
	question: QuestionWithFunction,
) => {
	const prematureResultsRef: PrematureResultsRef = {current: undefined};
	const tools: RunnableToolFunctionWithParse<any>[] | undefined =
		question.function
			? [
					{
						type: 'function',
						function: {
							function: (args, runner) => {
								// console.log('FUNCTION CALLED AS LAST STEP');
								// console.log('args', args);
								// console.log('\n');
								prematureResultsRef.current = JSON.stringify(args);
								runner.done();
							},
							parse: JSON.parse,
							parameters: question.function.parameters,
							description:
								'Return the answer back to the user. You MUST call this function as the last step of your mission.',
						},
					},
					...exploringTools,
			  ]
			: exploringTools;

	const runner = openai.beta.chat.completions.runTools({
		model: 'gpt-4-turbo-preview',
		messages: [
			{role: 'system', content: codebaseExpertPrompt},
			{
				role: 'user',
				content: question.question,
			},
		],
		tools,
	});
	const finalContent = await runner.finalContent();

	const returnValue = question.function
		? prematureResultsRef.current
		: finalContent;

	return returnValue;
};
