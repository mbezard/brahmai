import {Box} from 'ink';
import React from 'react';
import OpenAI from 'openai';
import {questions} from './questions.js';
import {Question} from './Question.js';

type Props = {
	openai: OpenAI;
};

export const CodebaseExpert = ({openai}: Props) => {
	return (
		<Box>
			{questions.map(question => {
				return (
					<Box key={question.key}>
						<Question question={question} openai={openai} />
					</Box>
				);
			})}
		</Box>
	);
};
