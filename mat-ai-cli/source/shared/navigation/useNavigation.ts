import {useState} from 'react';
import {useInput} from 'ink';

export const useNavigation = (numberOfOptions: number) => {
	const [selectorIndex, setSelectorIndex] = useState(-1);
	const [selectedScreenIndex, setSelectedScreenIndex] = useState(-1);

	useInput((input, key) => {
		if (input === 'q') {
			process.exit();
		}

		if (selectedScreenIndex === -1) {
			if (key.downArrow) {
				setSelectorIndex(prevSelector =>
					Math.min(numberOfOptions - 1, prevSelector + 1),
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

	return {selectorIndex, selectedScreenIndex};
};
