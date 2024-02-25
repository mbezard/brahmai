#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import App from './app.js';

const cli = meow(
	`
	Usage
	  $ codebase-expert

	Options
		--openai-api-key Your OpenAI API key

	Examples
	  $ codebase-expert --openai-api-key='YOUR_API_KEY'
	  Hello, Jane
`,
	{
		importMeta: import.meta,
		flags: {
			openaiApiKey: {
				type: 'string',
			},
		},
	},
);

render(<App openaiApiKey={cli.flags.openaiApiKey} />);
