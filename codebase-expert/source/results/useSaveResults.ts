import {useGlobalState} from '../globalState.js';
import fs from 'fs';
import {
	basePromptExpertPrompting,
	basePromptEndPart,
	basePromptDevBestPractices,
} from '../modules/openai/prompts.js';
import {gettingAndWritingFilesFromFunctionOutput} from './gettingAndWritingFilesFromFunctionOutput.js';

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

	const instructions = `${basePromptExpertPrompting}

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

${basePromptDevBestPractices}

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
