import {useState} from 'react';
import {useInput} from 'ink';

type Params = {
	numberOfOptions: number;
	onSelect?: (index: number) => void;
	onCancel?: () => void;
	isActive?: boolean;
};
export const useSelection = ({
	numberOfOptions,
	onCancel,
	onSelect,
	isActive = true,
}: Params) => {
	const [selectorIndex, setSelectorIndex] = useState(-1);
	const [selectedIndex, setSelectedIndex] = useState(-1);

	useInput((_, key) => {
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
				onSelect?.(selectorIndex);
			}
			return;
		}
		if (key.leftArrow && isActive) {
			setSelectedIndex(-1);
			onCancel?.();
			return;
		}
	});

	return {selectorIndex, selectedIndex};
};
