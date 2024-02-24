import React from 'react';
import {Text} from 'ink';
import {execSync} from 'child_process';

type Props = {
	name: string | undefined;
};

export default function App({name = 'Stranger'}: Props) {
	const gitBranch = execSync('git branch --show-current').toString().trim();

	return (
		<Text>
			Hello, <Text color="green">{name}</Text>
			<Text>! You are on branch </Text>
			<Text color="yellow">{gitBranch}</Text>
		</Text>
	);
}
