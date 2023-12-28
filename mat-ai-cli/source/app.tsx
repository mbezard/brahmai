import React, {useState} from 'react';
import {Box, Newline, Text, useInput} from 'ink';
import {Result} from 'meow';
import {commands} from './commands.js';
import {readState, writeState} from './store.js';

type Props = {
	cli: Result<{}>;
};

export default function App({cli}: Props) {
	const [status, setStatus] = useState<'idle' | 'busy'>('idle');
	const [message, setMessage] = useState<string | null>(null);
	const [count, setCount] = useState(readState().count);
	const setAndWriteCount = (newCount: number) => {
		setCount(newCount);
		writeState({count: newCount});
	};
	useInput((input, key) => {
		if (key.return) {
			setStatus('busy');
			setTimeout(() => {
				setStatus('idle');
			}, 1000);
		}
		if (input === '1') {
			setMessage('Hello World');
			return;
		}
		if (input === '2') {
			setMessage('Goodbye World');
			return;
		}
		if (input === '3') {
			setAndWriteCount(count + 1);
			return;
		}
		if (input === 'h') {
			setMessage(cli.help);
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
			<Text>Status:{status}</Text>
			<Text>Count:{count}</Text>
			<Newline />
			<Box flexDirection="column">
				{commands.map((command, index) => (
					<Box key={command.label}>
						<Text>
							{index + 1}
							{') '}
							{command.label}
						</Text>
					</Box>
				))}
			</Box>
			<Newline />
			<Text>Message:{message}</Text>
		</Box>
	);
}
