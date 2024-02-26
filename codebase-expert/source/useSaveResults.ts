import {useGlobalState} from './globalState.js';
import fs from 'fs';

export const useSaveResults = () => {
	const allQuestions = useGlobalState(state => state.allQuestions);
	if (!fs.existsSync('results')) {
		fs.mkdirSync('results');
	}

	const results = JSON.stringify(allQuestions, null, 2);
	fs.writeFileSync('results/results.json', results);
};
