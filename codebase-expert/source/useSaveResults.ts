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

	if (!allQuestions.fiveTestExamplesQuestions) return;

	try {
		const testExamples =
			typeof allQuestions.fiveTestExamplesQuestions === 'string'
				? (JSON.parse(allQuestions.fiveTestExamplesQuestions) as {
						testExamples: string[];
				  })
				: allQuestions.fiveTestExamplesQuestions;

		const testExamplesContent = testExamples['testExamples']
			.map((example: string) => {
				const content = fs.readFileSync(example, 'utf-8');
				return `## ${example}\n\n\`\`\`\n${content}\n\`\`\``;
			})
			.join('\n\n');

		fs.writeFileSync(
			'results/knowledgeFiles/testExamples.md',
			testExamplesContent,
		);
	} catch (e) {
		console.error('Error saving test examples', e);
		fs.writeFileSync(
			'results/knowledgeFiles/testExamples.md',
			allQuestions.fiveTestExamplesQuestions,
		);
	}
};
