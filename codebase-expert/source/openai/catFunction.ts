import fs from 'fs';

export const catFunction = (path: string) => {
	console.log('catFunction', path);
	const content = fs.readFileSync(path, 'utf-8');
	return content;
};
