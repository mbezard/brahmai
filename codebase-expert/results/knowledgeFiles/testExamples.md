## ./source/modules/openai/catFunction.ts

```
import fs from 'fs';

export const catFunction = (path: string) => {
	const content = fs.readFileSync(path, 'utf-8');
	return content;
};

```

## ./source/modules/question/useQuestion.ts

```
import {useMutation} from '@tanstack/react-query';
import {askQuestion} from '../openai/askQuestion.js';
import {useEffect, useRef} from 'react';
import {Question as QuestionType} from './questions.js';
import {useGlobalState} from '../../globalState.js';
import {useOpenai} from '../openai/OpenaiClientProvider.js';

export const useQuestion = (question: QuestionType) => {
	const openai = useOpenai();
	const hasBeenAskedRef = useRef(false);
	const saveAnyData = useGlobalState(state => state.saveAnyData);
	const {isPending: isLoading, mutateAsync} = useMutation({
		mutationKey: ['macro-architecture'],
		mutationFn: () => askQuestion(openai, question.questionWithFunction),
		onSuccess: data => {
			if (!data) {
				// console.log('No data gathered from the question', question.key);
				return;
			}
			saveAnyData(question.key, data);
		},
	});

	useEffect(() => {
		if (!hasBeenAskedRef.current) {
			hasBeenAskedRef.current = true;
			mutateAsync();
		}
	}, [mutateAsync]);

	return {isLoading};
};

```

## ./source/results/gettingAndWritingFilesFromFunctionOutput.ts

```
import fs from 'fs';

export const gettingAndWritingFilesFromFunctionOutput = (
	output: string,
	key: string,
	fileName: string,
) => {
	try {
		const outputAsObject = JSON.parse(output);
		const outputAsList = outputAsObject[key] as string[];

		const content = outputAsList
			.filter((example: string) => !example.includes('.png'))
			.map((example: string) => {
				let content = '';
				try {
					content = fs.readFileSync(example, 'utf-8');
				} catch (e) {
					// console.error(`Error reading file ${example}`, e);
					content = '';
				}
				return `## ${example}\n\n\`\`\`\n${content}\n\`\`\``;
			})
			.join('\n\n');

		fs.writeFileSync(`results/knowledgeFiles/${fileName}.md`, content);
	} catch (e) {
		console.error(`Error ${fileName}`, e);
		fs.writeFileSync(`results/knowledgeFiles/${fileName}.md`, output);
	}
};

```

## ./source/shared/components/Loader.tsx

```
import React from 'react';
import {Text} from 'ink';

type Props = {
	isLoading: boolean;
};

export const Loader: React.FC<Props> = ({isLoading}) => {
	return isLoading ? (
		<Text color="yellow">⏳</Text>
	) : (
		<Text color="green">✅</Text>
	);
};

```

## ./source/modules/openai/lsfunction.ts

```
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

const printTree = (
	node: TreeNode,
	prefix: string = '',
	isLast: boolean = true,
): string => {
	const connector = isLast ? '└── ' : '├── ';
	let result = prefix + connector + node.name + '\n';

	if (node.children && node.children.length > 0) {
		const newPrefix = prefix + (isLast ? '    ' : '│   ');
		node.children.forEach((child, index) => {
			result += printTree(
				child,
				newPrefix,
				index === node.children!.length - 1,
			);
		});
	}

	return result;
};

export const lsFunction = (path: string) => {
	if (!fs.existsSync(path)) {
		return 'No such file or directory. Please retry with a valid path (ex: ./)';
	}
	const tree = getDirectoryTree(path, {depth: 3});
	if (!tree) {
		return null;
	}
	return printTree(tree);
};

```