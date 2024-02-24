#!/usr/bin/env node
import meow from "meow";
import { app } from "./app";

const cli = meow(
  `
	Usage
	  $ foo <input>

	Options
	  --rainbow, -r  Include a rainbow

	Examples
	  $ foo unicorns --rainbow
	  🌈 unicorns 🌈
`,
  {
    importMeta: import.meta,
    flags: {
      rainbow: {
        type: "boolean",
        shortFlag: "r",
      },
    },
  }
);

app({ input: cli.input, flags: cli.flags });
