import * as fs from 'fs';
import {stateFilePath} from './store.constant.js';

interface AppState {
	notion: {
		mainPageId: string;
		dailyBoardDatabaseId: string;
		epicBoardDatabaseId: string;
		projectSpecificationsPageId: string;
	};
	humanTaskStack: Array<{
		question: string;
	}>;
	promptHistory: Array<{
		agentName: string;
		question: string;
		answer: string;
		askedAt: Date;
	}>;
}

function readState(): AppState {
	if (fs.existsSync(stateFilePath)) {
		const data = fs.readFileSync(stateFilePath, 'utf8');
		return JSON.parse(data);
	}
	return {
		notion: {
			mainPageId: '',
			dailyBoardDatabaseId: '',
			epicBoardDatabaseId: '',
			projectSpecificationsPageId: '',
		},
		humanTaskStack: [],
		promptHistory: [],
	};
}

function writeState(state: AppState) {
	const data = JSON.stringify(state);
	fs.writeFileSync(stateFilePath, data, 'utf8');
}

const clearState = () => {
	fs.unlinkSync(stateFilePath);
};

export const store = {readState, writeState, clearState};
