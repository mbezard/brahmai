import {Box, Text} from 'ink';
import React from 'react';

type Props = {
	paths: string[];
};

export const BreadCrumb = ({paths}: Props) => {
	return (
		<Box flexDirection="row">
			{paths.length > 0 && <Text>{'> '}</Text>}
			{paths.map((path, index) => (
				<Box key={path}>
					<Text underline={index === paths.length - 1}>
						{index === 0 ? '' : ' > '}
						{path}
					</Text>
				</Box>
			))}
		</Box>
	);
};
