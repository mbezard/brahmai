import {Box, Newline, Text} from 'ink';
import {useSelection} from '../../useSelection.js';
import React, {useCallback} from 'react';
import {useBreadCrumbStore} from './breadCrumbStore.js';
import {Screen} from '../Screen.type.js';

type Props = {
	screens: Screen[];
	navigationLevel: number; //TODO: refactor to have a global state
};

export const Navigation = ({screens, navigationLevel}: Props) => {
	const {paths, addPath, goBack} = useBreadCrumbStore();
	const onSelect = useCallback(
		(selectedIndex: number) => {
			const screen = screens[selectedIndex];
			if (!screen) return;
			addPath(screen.label);
		},
		[screens, addPath],
	);

	const isActive = navigationLevel + 1 === paths.length;

	const {selectedIndex: selectedScreenIndex, selectorIndex} = useSelection({
		numberOfOptions: screens.length,
		onSelect,
		onCancel: goBack,
		isActive,
	});

	return (
		<Box flexDirection="column">
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
