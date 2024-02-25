import React from 'react';
import {Text} from 'ink';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {CodebaseExpert} from './CodebaseExpert.js';
import OpenAI from 'openai';
import 'dotenv/config';

type Props = {
	openaiApiKey: string | undefined;
};
const queryClient = new QueryClient();

export default function App({openaiApiKey}: Props) {
	const openaiApiKeyFromEnv = process.env['OPENAI_API_KEY'];

	const openai = new OpenAI({
		apiKey: openaiApiKey || openaiApiKeyFromEnv,
	});

	return (
		<QueryClientProvider client={queryClient}>
			<Text>Welcome to codebase-expert. Let's analyze your codebase.</Text>
			<CodebaseExpert openai={openai} />
		</QueryClientProvider>
	);
}
