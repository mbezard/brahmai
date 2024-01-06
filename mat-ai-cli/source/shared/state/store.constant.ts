import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';

const globalStateDirectory = path.join(os.homedir(), '.brahmai-cli');

export const stateFilePath = path.join(globalStateDirectory, 'state.json');
export const analyticsFilePath = path.join(
	globalStateDirectory,
	'analytics.json',
);
export const settingsFilePath = path.join(
	globalStateDirectory,
	'settings.json',
);

// Ensure the directory exists
if (!fs.existsSync(globalStateDirectory)) {
	fs.mkdirSync(globalStateDirectory);
}

// Ensure the files exists
// MIGHT NOT BE NEEDED
// if (!fs.existsSync(stateFilePath)) {
// 	fs.writeFileSync(stateFilePath, '{}', 'utf8');
// }
// if (!fs.existsSync(analyticsFilePath)) {
// 	fs.writeFileSync(analyticsFilePath, '[]', 'utf8');
// }
// if (!fs.existsSync(settingsFilePath)) {
// 	fs.writeFileSync(settingsFilePath, '{}', 'utf8');
// }
