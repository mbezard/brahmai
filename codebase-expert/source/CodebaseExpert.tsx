import {Text, Box} from 'ink';
import React from 'react';
import {useCodebaseExpert} from './useCodebaseExpert.js';
import OpenAI from 'openai';

type Props = {
	openai: OpenAI;
};

export const CodebaseExpert = ({openai}: Props) => {
	const {isMacroArchitectureLoading} = useCodebaseExpert(openai);
	return (
		<Box>
			<Box>
				<Text>Analysis of the macro-architecture of the codebase</Text>
				{isMacroArchitectureLoading ? (
					<Text color="yellow">⏳</Text>
				) : (
					<Text color="green">✅</Text>
				)}
			</Box>
		</Box>
	);
};
