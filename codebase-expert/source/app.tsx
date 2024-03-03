import React from 'react';
import {Newline, Text} from 'ink';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {CodebaseExpert} from './CodebaseExpert.js';
import OpenAI from 'openai';
import {CliFlags} from './cliFlags.type.js';
import 'dotenv/config';
import {OpenaiProvider} from './openai/OpenaiClientProvider.js';

type Props = {
	cliFlags: CliFlags;
};
const queryClient = new QueryClient();
const openai = new OpenAI({
	apiKey: process.env['OPENAI_API_KEY'],
});

export default function App({cliFlags}: Props) {
	const openaiApiKey = cliFlags.openaiApiKey;
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
