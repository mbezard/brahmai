import React, {useState} from 'react';
import {Box, Newline, Text, useInput} from 'ink';
import {Result} from 'meow';
import {TalkToAnyAgentScreen} from './ui/TalkToAnyAgentScreen.js';
import {BreadCrumb} from './ui/shared/BreadCrumb.js';

type Props = {
	cli: Result<{}>;
};

const screens = [
	{
		label: 'Talk to any agent',
		color: 'green',
		component: <TalkToAnyAgentScreen />,
	},
	{
		label: 'See the human task stack',
		color: 'red',
	},
];

export default function App({}: Props) {
	const [selectorIndex, setSelectorIndex] = useState(-1);
	const [selectedScreenIndex, setSelectedScreenIndex] = useState(-1);

	useInput((input, key) => {
		if (input === 'q') {
			process.exit();
		}

		if (selectedScreenIndex === -1) {
			if (key.downArrow) {
				setSelectorIndex(prevSelector =>
					Math.min(screens.length - 1, prevSelector + 1),
				);
			}
			if (key.upArrow) {
				setSelectorIndex(prevSelector => Math.max(0, prevSelector - 1));
			}
			if (key.return || key.rightArrow) {
				setSelectedScreenIndex(selectorIndex);
			}
			return;
		}
		if (key.leftArrow) {
			setSelectedScreenIndex(-1);
			return;
		}
	});

	const paths = [screens[selectedScreenIndex]?.label].filter<string>(
		Boolean as any,
	);

	return (
		<Box flexDirection="column" width={64} height={16}>
			<Text>
				Welcome to ✨ AI-in-CLI ✨, PoC by <Text color="green">Matthieu</Text>
			</Text>
			<BreadCrumb paths={paths} />
			<Newline />
			{selectedScreenIndex === -1 && (
				<Box flexDirection="column">
					{screens.map((command, index) => (
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
			)}
			<Newline />
			{screens[selectedScreenIndex]?.component}
		</Box>
	);
}
