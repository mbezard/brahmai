import {agents} from 'all-ai';
import {Box, Text} from 'ink';
import React from 'react';
import {Navigation} from '../../shared/navigation/components/Navigation.js';
import {Screen} from '../../shared/navigation/Screen.type.js';

export const TalkToAnyAgentScreen = () => {
	const screens: Screen[] = Object.keys(agents).map(agent => ({
		label: agent,
		color: 'white',
		component: <Text>{agent}</Text>,
	}));

	return (
		<Box flexDirection="column">
			<Box flexDirection="column">
				<Box>
					<Text>Talk to:</Text>
				</Box>
				<Box flexDirection="column">
					<Navigation screens={screens} navigationLevel={1} />
				</Box>
			</Box>
		</Box>
	);
};
