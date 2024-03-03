import {Box, Text} from 'ink';
import React from 'react';
import {questions} from './questions.js';
import {Question} from './Question.js';
import {useGlobalState} from './globalState.js';
import {SavingResults} from './SavingResults.js';

export const CodebaseExpert = () => {
	const allQuestions = useGlobalState(state => state.allQuestions);
	const areAllQuestionsAnswered = Object.values(allQuestions).every(Boolean);
	return (
		<Box flexDirection="column">
			{questions.map(question => {
				return (
					<Box key={question.key}>
						<Question question={question} />
					</Box>
				);
			})}

			{areAllQuestionsAnswered && (
				<>
					<Text color="green">All questions answered 🎉</Text>
					<SavingResults />
				</>
			)}
		</Box>
	);
};
