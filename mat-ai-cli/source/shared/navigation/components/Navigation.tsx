import {Box, Newline, Text} from 'ink';
import {useSelection} from '../../useSelection.js';
import {BreadCrumb} from './BreadCrumb.js';
import React from 'react';

type Screen = {
	label: string;
	color: string;
	component: JSX.Element;
};

type Props = {
	screens: Screen[];
};

export const Navigation = ({screens}: Props) => {
	const {selectedIndex: selectedScreenIndex, selectorIndex} = useSelection(
		screens.length,
	);
	const paths = [screens[selectedScreenIndex]?.label].filter<string>(
		Boolean as any,
	);

	return (
		<Box flexDirection="column">
			<BreadCrumb paths={paths} />
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
			{selectedScreenIndex !== -1 && (
				<Box flexDirection="column">
					{screens[selectedScreenIndex]?.component}
				</Box>
			)}
		</Box>
	);
};
