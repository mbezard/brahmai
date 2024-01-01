import {Box, Text, useInput} from 'ink';
import React from 'react';
import {store} from '../../shared/state/store.js';

export const SettingsScreen = () => {
	useInput(input => {
		if (input === '1') {
			store.clearState();
			return;
		}
	});

	return (
		<Box flexDirection="column">
			<Box>
				<Text>{'1) Clear state'}</Text>
			</Box>
		</Box>
	);
};
