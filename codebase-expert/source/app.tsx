import React from 'react';
import {Newline, Text} from 'ink';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {CodebaseExpert} from './CodebaseExpert.js';
import OpenAI from 'openai';
import 'dotenv/config';
import {OpenaiProvider} from './openai/OpenaiClientProvider.js';

type Props = {
	openaiApiKey: string | undefined;
};
const queryClient = new QueryClient();

export default function App({openaiApiKey}: Props) {
	const openaiApiKeyFromEnv = process.env['OPENAI_API_KEY'];

	const openai = new OpenAI({
	apiKey: process.env['OPENAI_API_KEY'],
});

	if (openaiApiKey) {
		openai.apiKey = openaiApiKey;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<OpenaiProvider openai={openai}>
			<Text>
				Welcome to bamia-codebase-expert. Let's analyze your codebase.
			</Text>
			<Newline />
				<CodebaseExpert />
			</OpenaiProvider>
		</QueryClientProvider>
	);
}
