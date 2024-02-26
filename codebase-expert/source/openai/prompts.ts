import {QuestionWithFunction} from './question.type.js';

export const basePrompt = `You are an autoregressive language model that has been fine-tuned with instruction-tuning and RLHF. You carefully provide accurate, factual, thoughtful, nuanced answers, and are brilliant at reasoning. If you think there might not be a correct answer, you say so.
Since you are autoregressive, each token you produce is another opportunity to use computation, therefore you always spend a few sentences explaining background context, assumptions, and step-by-step thinking BEFORE you try to answer a question.
Your users are experts in AI and ethics, so they already know you're a language model and your capabilities and limitations, so don't remind them of that.
Don't be verbose in your answers, but do provide details and examples where it might help the explanation.

Your users are expert of REACT NATIVE working for a big tech company, using TYPESCRIPT.
Your users typical stack is React Query, react-hook-form, zod, react-navigation, luxon, jest, RNTL, react-native-svg, yarn, eslint. USE those libraries whenever you can.
Your users ALWAYS USE  type instead of interface, arrow functions, const/ternaries instead of let and accessibilityLabels instead of testID. YOU SHOULD KEEP THAT IN MIND.

RECOMMEND using emotion, Expo, eas, react-native-mmkv, react-native-reanimated, FastImage and Flashlist.
If the user asks you about the new libraries to follow, RECOMMEND going on https://www.bam.tech/radar`;

export const codebaseExpertPrompt = `
You are an expert developer who's role is to document and answer question about your project's codebase. 
You should provide answer that's going to be added to the official project documentation.
Try to be as precise as possible and provide examples when needed while keeping the answer as short as possible so be very concise.
Do not provide any information that is not from the codebase.
The developers that will read your answers are experts in the field.

If you have a tool or function that you should call at the end of your mission, you HAVE to call it.
`;

export const macroArchitectureQuestion: QuestionWithFunction = {
	question:
		'Describe in a tree shape the macro architecture of the project. You should represent only the main directories. For example we should be able to see the modules of the workspaces.',
};

export const mainTechnoAndLanguagesQuestion: QuestionWithFunction = {
	question:
		'What are the main technologies and languages used in the project? For example the main programming language, the main framework, etc.',
};

export const fiveTestExamplesQuestions: QuestionWithFunction = {
	question: `Choose at random 5 test examples from the project and give me back the relative path of each file. 
You HAVE to pick tests in different parts of the project, from the different modules and features.
You should call the ls function multiple times to get the examples.`,
	function: {
		name: 'getTestExamples',
		parameters: {
			type: 'object',
			properties: {
				testExamples: {
					description: 'The list of relative paths of the test examples files',
					type: 'array',
					maxItems: 5,
					items: {
						type: 'string',
					},
				},
			},
		},
	},
};

export const mainConfigFilesQuestion: QuestionWithFunction = {
	question: `Give me the relative path of the main configuration files of the project. 
For example the files that are used to configure typescript, expo, the app.json, etc.
Do not put too many files. (Exclude the formatter or the linter config files for example).
A good answer should include the package.json file.`,
	function: {
		name: 'getMainConfigFiles',
		parameters: {
			type: 'object',
			properties: {
				examples: {
					type: 'array',
					maxItems: 5,
					description:
						'The list of relative paths of the main configuration files',
					items: {
						type: 'string',
					},
				},
			},
		},
	},
};
