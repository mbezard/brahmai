import React, {useState} from 'react';
import {Box, Newline, Text, useInput} from 'ink';
import {Result} from 'meow';
import {commands} from './commands.js';
import {store} from './store.js';

type Props = {
	cli: Result<{}>;
};

export default function App({cli}: Props) {
	const [count, setCount] = useState(store.readState().count);
	const [selectorIndex, setSelectorIndex] = useState(-1);
	const setAndWriteCount = (newCount: number) => {
		setCount(newCount);
		store.writeState({count: newCount});
	};
	useInput((input, key) => {
		if (key.downArrow) {
			setSelectorIndex(prevSelector =>
				Math.min(commands.length - 1, prevSelector + 1),
			);
		}
		if (key.upArrow) {
			setSelectorIndex(prevSelector => Math.max(0, prevSelector - 1));
		}
		if (key.return) {
			switch (selectorIndex) {
				case 0:
					setAndWriteCount(count + 1);
			}
		}
		if (input === 'c') {
			store.clearState();
			return;
		}
		if (input === '1') {
			setAndWriteCount(count + 1);
			return;
		}
		if (input === 'q') {
			process.exit();
		}
	});
	return (
		<Box flexDirection="column">
			<Text>
				Welcome to ✨ AI-in-CLI ✨, PoC by <Text color="green">Matthieu</Text>
			</Text>
			<Text>Input?:{cli.input}</Text>
			<Text>Count:{count}</Text>
			<Newline />
			<Box flexDirection="column">
				{commands.map((command, index) => (
					<Box key={command.label}>
						<Text>
							{selectorIndex === index ? '> [' : '   '}
							{index + 1}
							{') '}
							{command.label}
							{selectorIndex === index ? ']' : ' '}
						</Text>
					</Box>
				))}
			</Box>
			<Newline />
		</Box>
	);
}
