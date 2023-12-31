import {Box, Text} from 'ink';
import React from 'react';
import {useBreadCrumbStore} from './breadCrumbStore.js';

export const BreadCrumb = () => {
	const {paths} = useBreadCrumbStore();
	return (
		<Box flexDirection="row">
			{paths.length > 0 && <Text>{'> '}</Text>}
			{paths.map((path, index) => (
				<Text key={path}>
					{index === 0 ? '' : ' > '}
					<Text underline={index === paths.length - 1}>{path}</Text>
				</Text>
			))}
		</Box>
	);
};
