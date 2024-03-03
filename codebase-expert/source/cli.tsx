#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import App from './app.js';

const cli = meow(
	`
	Usage
	  $ bamia-codebase-expert

	Options
		--openaiApiKey Your OpenAI API key
		--extraInstructions Extra instructions to pass to the codebase expert

	Examples
	  $ bamia-codebase-expert --openaiApiKey='YOUR_API_KEY' --extraInstructions="Don't mention the project name"
	  
`,
	{
		importMeta: import.meta,
		flags: {
			openaiApiKey: {
				type: 'string',
			},
			extraInstructions: {
				type: 'string',
			},
		},
	},
);

render(<App cliFlags={cli.flags} />);
