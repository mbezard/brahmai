import {Text, Box} from 'ink';
import React from 'react';
import {useCodebaseExpert} from './useCodebaseExpert.js';

export const CodebaseExpert = () => {
	const {isMacroArchitectureLoading} = useCodebaseExpert();
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
