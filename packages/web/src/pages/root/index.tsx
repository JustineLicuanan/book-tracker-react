import { Box, Typography } from '@material-ui/core';
import { useEffect } from 'react';

import { myMeta } from '../../meta';

const DashboardPage = () => {
	useEffect(() => {
		document.title = `Dashboard | ${myMeta.title}`;
	});

	return (
		<Box my={8}>
			<Typography variant='h4' align='center'>
				DASHBOARD Page
				<br />
				<br />
				This page is under CONSTRUCTION.
				<br />
				Work in Progress (WiP)
			</Typography>
		</Box>
	);
};

export default DashboardPage;
