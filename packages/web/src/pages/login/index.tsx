import { useEffect } from 'react';

import { myMeta } from '../../meta';

const LoginPage = () => {
	useEffect(() => {
		document.title = `Login | ${myMeta.title}`;
	});

	return (
		<>
			<h1>This is the LOGIN page</h1>
		</>
	);
};

export default LoginPage;
