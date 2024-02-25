import * as fs from 'fs';
import * as path from 'path';
import ignore from 'ignore';

type TreeOptions = {
	depth: number;
};

type TreeNode = {
	name: string;
	type: 'directory' | 'file';
	children?: TreeNode[];
};

const readGitignore = (dirPath: string): string[] => {
	const gitignorePath = path.join(dirPath, '.gitignore');
	if (fs.existsSync(gitignorePath)) {
		return fs.readFileSync(gitignorePath, 'utf-8').split('\n');
	}
	return [];
};

export const getDirectoryTree = (
	dirPath: string,
	options: TreeOptions,
	currentDepth: number = 0,
	parentPath: string = '',
): TreeNode | null => {
	if (currentDepth > options.depth) return null;

	const ignoreFiles = readGitignore(parentPath || dirPath);
	// @ts-expect-error
	const ig = ignore().add(ignoreFiles);
	const relativePath = path.relative(parentPath, dirPath);

	if (
		parentPath &&
		(ig.ignores(relativePath) ||
			relativePath.includes('node_modules') ||
			relativePath.includes('.git'))
	) {
		return null;
	}

	let tree: TreeNode = {
		name: path.basename(dirPath),
		type: 'directory',
		children: [],
	};

	const files = fs.readdirSync(dirPath, {withFileTypes: true});
	for (const file of files) {
		const filePath = path.join(dirPath, file.name);
		if (file.isDirectory()) {
			const childTree = getDirectoryTree(
				filePath,
				options,
				currentDepth + 1,
				parentPath || dirPath,
			);
			if (childTree) {
				tree.children?.push(childTree);
			}
		} else {
			if (!ig.ignores(path.relative(parentPath || dirPath, filePath))) {
				tree.children?.push({
					name: file.name,
					type: 'file',
				});
			}
		}
	}

	return tree;
};

export const printTree = (
	node: TreeNode,
	prefix: string = '',
	isLast: boolean = true,
): void => {
	const connector = isLast ? '└── ' : '├── ';
	console.log(prefix + connector + node.name);

	if (node.children && node.children.length > 0) {
		const newPrefix = prefix + (isLast ? '    ' : '│   ');
		node.children.forEach((child, index) => {
			printTree(child, newPrefix, index === node.children!.length - 1);
		});
	}
};

// Example usage:
// const pathToExplore = '/path/to/your/directory'; // Change this to your target directory
// const tree = getDirectoryTree(pathToExplore, {depth: 2});
// console.log(JSON.stringify(tree, null, 2));
