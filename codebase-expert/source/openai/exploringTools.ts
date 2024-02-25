import {RunnableToolFunctionWithParse} from 'openai/lib/RunnableFunction.mjs';

export const lsFunction: RunnableToolFunctionWithParse<any> = {
	type: 'function',
	function: {
		parse: JSON.parse,
		function: (args: any) => console.log('lsFunction args', args),
		name: 'lsFunction',
		description: 'Get the list of files in the current directory',
		parameters: {
			type: 'object',
			properties: {
				path: {
					type: 'string',
					description: 'The path to the directory',
				},
			},
		},
	},
};

export const catFunction: RunnableToolFunctionWithParse<any> = {
	type: 'function',
	function: {
		parse: JSON.parse,
		function: (args: any) => console.log('catFunction args', args),
		name: 'catFunction',
		description: 'Get the content of a file',
		parameters: {
			type: 'object',
			properties: {
				path: {
					type: 'string',
					description: 'The path to the file',
				},
			},
		},
	},
};

export const exploringTools = [lsFunction, catFunction];
