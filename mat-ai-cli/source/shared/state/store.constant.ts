import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';

const globalStateDirectory = path.join(os.homedir(), '.mat-ai-cli');

export const stateFilePath = path.join(globalStateDirectory, 'state.json');
export const analyticsFilePath = path.join(
	globalStateDirectory,
	'analytics.json',
);

// Ensure the directory exists
if (!fs.existsSync(globalStateDirectory)) {
	fs.mkdirSync(globalStateDirectory);
}

// Ensure the files exists
if (!fs.existsSync(stateFilePath)) {
	fs.writeFileSync(stateFilePath, '{}', 'utf8');
}
if (!fs.existsSync(analyticsFilePath)) {
	fs.writeFileSync(analyticsFilePath, '[]', 'utf8');
}
