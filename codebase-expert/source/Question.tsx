import {Text, Box} from 'ink';
import React from 'react';
import {Loader} from './components/Loader.js';
import {Question as QuestionType} from './questions.js';
import OpenAI from 'openai';
import {useQuestion} from './useQuestion.js';

type Props = {
	question: QuestionType;
	openai: OpenAI;
};

export const Question = ({openai, question}: Props) => {
	const {isLoading} = useQuestion(openai, question);
	return (
		<Box key={question.key}>
			<Text>{question.title}</Text>
			<Loader isLoading={isLoading} />
		</Box>
	);
};
