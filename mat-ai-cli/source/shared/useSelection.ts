import {useState} from 'react';
import {useInput} from 'ink';

export const useSelection = (numberOfOptions: number) => {
	const [selectorIndex, setSelectorIndex] = useState(-1);
	const [selectedIndex, setSelectedIndex] = useState(-1);

	useInput((input, key) => {
		if (input === 'q') {
			process.exit();
		}

		if (selectedIndex === -1) {
			if (key.downArrow) {
				setSelectorIndex(prevSelector =>
					Math.min(numberOfOptions - 1, prevSelector + 1),
				);
			}
			if (key.upArrow) {
				setSelectorIndex(prevSelector => Math.max(0, prevSelector - 1));
			}
			if (key.return || key.rightArrow) {
				setSelectedIndex(selectorIndex);
			}
			return;
		}
		if (key.leftArrow) {
			setSelectedIndex(-1);
			return;
		}
	});

	return {selectorIndex, selectedIndex};
};
