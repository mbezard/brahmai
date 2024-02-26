import {useGlobalState} from './globalState.js';
import fs from 'fs';
import {basePrompt, basePromptEndPart} from './openai/prompts.js';

export const useSaveResults = () => {
	const projectName = process.cwd().split('/').pop();
	const allQuestions = useGlobalState(state => state.allQuestions);
	if (!fs.existsSync('results')) {
		fs.mkdirSync('results');
	}

	const instructions = `${basePrompt}

## Project name: ${projectName}

<technologies and languages>
${allQuestions.mainTechnoAndLanguagesQuestion}
</technologies and languages>

<structure of the project>
${allQuestions.macroArchitecture}
</structure of the project>

<design system>
${allQuestions.designSystemQuestion}
</design system>

${basePromptEndPart}
`;
	fs.writeFileSync('results/instructions.md', instructions);

	// ***** KNOWLEDGE FILES *****
	if (!fs.existsSync('results/knowledgeFiles')) {
		fs.mkdirSync('results/knowledgeFiles');
	}

	gettingAndWritingFilesFromFunctionOutput(
		allQuestions.fiveTestExamplesQuestions,
		'testExamples',
		'testExamples',
	);

	gettingAndWritingFilesFromFunctionOutput(
		allQuestions.getSomeScreenImplementationQuestion,
		'examples',
		'screenImplementations',
	);
};

const gettingAndWritingFilesFromFunctionOutput = (
	output: string,
	key: string,
	fileName: string,
) => {
	try {
		console.log('output', output);
		const outputAsObject = JSON.parse(output);
		console.log('outputAsObject', outputAsObject);
		const outputAsList = outputAsObject[key] as string[];
		console.log('outputAsList', outputAsList);

		const content = outputAsList
			.map((example: string) => {
				let content = '';
				try {
					content = fs.readFileSync(example, 'utf-8');
				} catch (e) {
					// console.error(`Error reading file ${example}`, e);
					content = '';
				}
				return `## ${example}\n\n\`\`\`\n${content}\n\`\`\``;
			})
			.join('\n\n');

		fs.writeFileSync(`results/knowledgeFiles/${fileName}.md`, content);
	} catch (e) {
		console.error(`Error ${fileName}`, e);
		fs.writeFileSync(`results/knowledgeFiles/${fileName}.md`, output);
	}
};
