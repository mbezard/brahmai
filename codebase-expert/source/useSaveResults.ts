import {useGlobalState} from './globalState.js';
import fs from 'fs';
import {basePromptEndPart, codebaseExpertPrompt} from './openai/prompts.js';

export const useSaveResults = () => {
	const allQuestions = useGlobalState(state => state.allQuestions);
	if (!fs.existsSync('results')) {
		fs.mkdirSync('results');
	}

	const instructions = `${codebaseExpertPrompt}
<technologies and languages>
${allQuestions.mainTechnoAndLanguagesQuestion}
</technologies and languages>

<structure of the project>
${allQuestions.macroArchitecture}
</structure of the project>

${basePromptEndPart}
`;
	fs.writeFileSync('results/instructions.md', instructions);

	if (!fs.existsSync('results/knowledgeFiles')) {
		fs.mkdirSync('results/knowledgeFiles');
	}

	const testExamples = allQuestions.fiveTestExamplesQuestions;

	//TODO: save the test examples files content
	fs.writeFileSync(
		'results/knowledgeFiles/testExamples.md',
		JSON.stringify(testExamples, null, 2),
	);
};
