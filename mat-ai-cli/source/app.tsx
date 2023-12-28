import React, {useState} from 'react';
import {Box, Newline, Text, useInput} from 'ink';
import {Result} from 'meow';
import {commands} from './commands.js';

type Props = {
	cli: Result<{}>;
};

export default function App({cli}: Props) {
	const [status, setStatus] = useState<'idle' | 'busy'>('idle');
	const [message, setMessage] = useState<string | null>(null);
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
