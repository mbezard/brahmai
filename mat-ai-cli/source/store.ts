import * as fs from 'fs';

interface AppState {
	count: number;
}

const filePath = './state.json';

export function readState(): AppState {
	if (fs.existsSync(filePath)) {
		const data = fs.readFileSync(filePath, 'utf8');
		return JSON.parse(data);
	}
	return {count: 0};
}

export function writeState(state: AppState) {
	const data = JSON.stringify(state);
	fs.writeFileSync(filePath, data, 'utf8');
}

// function main() {
//     let state = readState();
//     console.log(`Current count is ${state.count}`);

//     // Modify state
//     state.count++;

//     writeState(state);
//     console.log(`Count updated to ${state.count}`);
// }

// main();
