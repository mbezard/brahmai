import React from 'react';
import {Box, Text} from 'ink';
import {Result} from 'meow';
import {TalkToAnyAgentScreen} from './modules/talkToAgent/TalkToAnyAgentScreen.js';
import {Navigation} from './shared/navigation/components/Navigation.js';
import {HumanTaskStackScreen} from './modules/humanTaskStack/SeeHumanTaskStackScreen.js';
import {SettingsScreen} from './modules/settings/SettingsScreen.js';

type Props = {
	cli: Result<{}>;
};

const screens = [
	{
		label: 'Talk to any agent',
		color: 'green',
		component: <TalkToAnyAgentScreen />,
	},
	{
		label: 'See the human task stack',
		color: 'red',
		component: <HumanTaskStackScreen />,
	},
	{
		label: 'Settings',
		color: 'blue',
		component: <SettingsScreen />,
	},
];

export default function App({}: Props) {
	return (
		<Box flexDirection="column" width={64} height={16}>
			<Text>
				Welcome to ✨ AI-in-CLI ✨, PoC by <Text color="green">Matthieu</Text>
			</Text>
			<Navigation screens={screens} />
		</Box>
	);
}
