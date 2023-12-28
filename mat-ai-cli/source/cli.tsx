#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import App from './app.js';

const cli = meow(
	`
	Usage
	  $ mat-ai-cli

	Options
		--help Display this message

	Examples
	  $ mat-ai-cli
`,
	{
		importMeta: import.meta,
	},
);

render(<App cli={cli} />);
