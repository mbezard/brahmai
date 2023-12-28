import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

const globalStateDirectory = path.join(os.homedir(), '.ai-mat-cli');
const stateFilePath = path.join(globalStateDirectory, 'state.json');

// Ensure the directory exists
if (!fs.existsSync(globalStateDirectory)) {
	fs.mkdirSync(globalStateDirectory, {recursive: true});
}

interface AppState {
	count: number;
}

function readState(): AppState {
	if (fs.existsSync(stateFilePath)) {
		const data = fs.readFileSync(stateFilePath, 'utf8');
		return JSON.parse(data);
	}
	return {count: 0};
}

function writeState(state: AppState) {
	const data = JSON.stringify(state);
	fs.writeFileSync(stateFilePath, data, 'utf8');
}

const clearState = () => {
	fs.unlinkSync(stateFilePath);
};

export const store = {readState, writeState, clearState};
