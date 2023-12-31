import {Box, Newline, Text} from 'ink';
import React from 'react';

export const TalkToAnyAgentScreen = () => {
	return (
		<Box flexDirection="column" width={32} height={16}>
			<Text>Welcome to 1st screen : Talk to any agent, PoC by </Text>
			<Newline />
			<Box flexDirection="column">
				<Box>
					<Text>[1) Talk to any agent]</Text>
				</Box>
				<Box>
					<Text>[2) See the human task stack]</Text>
				</Box>
			</Box>
		</Box>
	);
};
