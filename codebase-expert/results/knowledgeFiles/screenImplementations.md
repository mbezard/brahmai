## ./source/CodebaseExpert.tsx

```
import {Box, Text} from 'ink';
import React from 'react';
import {questions} from './modules/question/questions.js';
import {useGlobalState} from './globalState.js';
import {SavingResults} from './results/SavingResults.js';
import {Question} from './modules/question/Question.js';

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

```

## ./source/modules/openai/OpenaiClientProvider.tsx

```
import OpenAI from 'openai';
import React, {PropsWithChildren, createContext, useContext} from 'react';

const OpenaiContext = createContext<OpenAI | undefined>(undefined);

export const useOpenai = () => {
	const openai = useContext(OpenaiContext);

	if (!openai) {
		throw new Error('No OpenAI client set, use OpenaiProvider to set one');
	}

	return openai;
};

type OpenaiProviderProps = PropsWithChildren<{
	openai: OpenAI;
}>;

export const OpenaiProvider = ({openai, children}: OpenaiProviderProps) => {
	return (
		<OpenaiContext.Provider value={openai}>{children}</OpenaiContext.Provider>
	);
};

```

## ./source/modules/question/Question.tsx

```
import {Text, Box} from 'ink';
import React from 'react';
import {Question as QuestionType} from './questions.js';
import {useQuestion} from './useQuestion.js';
import {Loader} from '../../shared/components/Loader.js';

type Props = {
	question: QuestionType;
};

export const Question = ({question}: Props) => {
	const {isLoading} = useQuestion(question);
	return (
		<Box key={question.key}>
			<Text>{question.title} </Text>
			<Loader isLoading={isLoading} />
		</Box>
	);
};

```

## ./source/shared/components/Loader.tsx

```
import React from 'react';
import {Text} from 'ink';

type Props = {
	isLoading: boolean;
};

export const Loader: React.FC<Props> = ({isLoading}) => {
	return isLoading ? (
		<Text color="yellow">⏳</Text>
	) : (
		<Text color="green">✅</Text>
	);
};

```