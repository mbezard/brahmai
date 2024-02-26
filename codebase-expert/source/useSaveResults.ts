import {useGlobalState} from './globalState.js';
import fs from 'fs';
import {basePrompt, basePromptEndPart} from './openai/prompts.js';

export const useSaveResults = () => {
	const projectName = process.cwd().split('/').pop();
	const allQuestions = useGlobalState(state => state.allQuestions);
	if (!fs.existsSync('results')) {
		fs.mkdirSync('results');
	}

	let configFilesPrompt = '';
	try {
		const mainConfigFile = JSON.parse(allQuestions.mainConfigFilesQuestion);
		const mainConfigFileList = mainConfigFile['examples'] as string[];
		mainConfigFileList.forEach((configFile: string) => {
			if (
				configFile.includes('package.json') ||
				configFile.includes('eas') ||
				configFile.includes('expo')
			) {
				const configFileContent = JSON.parse(
					fs.readFileSync(configFile, 'utf-8'),
				);
				configFilesPrompt += `### ${configFile}\n\n\`\`\`json\n${JSON.stringify(
					configFileContent,
					null,
					2,
				)}\n\`\`\`\n\n`;
			}
		});
	} catch (e) {}

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

Here is the content of some of my configuration files:
${configFilesPrompt}

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
		const outputAsObject = JSON.parse(output);
		const outputAsList = outputAsObject[key] as string[];

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
