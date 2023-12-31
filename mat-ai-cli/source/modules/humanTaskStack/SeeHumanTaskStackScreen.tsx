import {useRef} from 'react';
import {store} from '../../store.js';
import {Box, Text} from 'ink';
import React from 'react';

export const HumanTaskStackScreen = () => {
	const humanTaskStack = useRef(store.readState().humanTaskStack).current;
	return (
		<Box flexDirection="column">
			{humanTaskStack.length === 0 && <Text>No human task in the stack</Text>}
			{humanTaskStack.map((humanTask, index) => (
				<Box key={humanTask.question}>
					<Text>
						{index + 1}
						{') '}
						{humanTask.question}
					</Text>
				</Box>
			))}
		</Box>
	);
};
