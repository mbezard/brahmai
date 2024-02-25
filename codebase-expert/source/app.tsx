import React from 'react';
import {Text} from 'ink';
import {execSync} from 'child_process';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {CodebaseExpert} from './CodebaseExpert.js';

type Props = {
	name: string | undefined;
};
const queryClient = new QueryClient();

export default function App({name = 'Stranger'}: Props) {
	const gitBranch = execSync('git branch --show-current').toString().trim();

	return (
		<QueryClientProvider client={queryClient}>
			<Text>
				Welcome to codebase-expert, {name}! You are on the {gitBranch} branch.
			</Text>
			<CodebaseExpert />
		</QueryClientProvider>
	);
}
