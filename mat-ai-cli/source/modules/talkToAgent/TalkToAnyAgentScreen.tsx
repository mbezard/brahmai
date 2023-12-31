import {agents} from 'all-ai';
import {Box, Text} from 'ink';
import React from 'react';
import {useSelection} from '../../shared/useSelection.js';

export const TalkToAnyAgentScreen = () => {
	const {selectorIndex} = useSelection(Object.keys(agents).length);
	return (
		<Box flexDirection="column" width={32} height={16}>
			<Box flexDirection="column">
				<Box>
					<Text>Talk to:</Text>
				</Box>
				<Box flexDirection="column">
					{Object.keys(agents).map((agent, index) => (
						<Box key={agent}>
							<Text>
								{selectorIndex === index ? '> [' : '   '}
								{index + 1}
								{') '}
								{agent}
								{selectorIndex === index ? ']' : ' '}
							</Text>
						</Box>
					))}
				</Box>
			</Box>
		</Box>
	);
};
