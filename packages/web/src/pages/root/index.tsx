import { useEffect } from 'react';

import { myMeta } from '../../meta';

const DashboardPage = () => {
	useEffect(() => {
		document.title = `Dashboard | ${myMeta.title}`;
	});

	return (
		<>
			<h1>This is the DASHBOARD page</h1>
		</>
	);
};

export default DashboardPage;
