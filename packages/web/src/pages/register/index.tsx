import { useEffect } from 'react';

import { myMeta } from '../../meta';

const RegisterPage = () => {
	useEffect(() => {
		document.title = `Register | ${myMeta.title}`;
	});

	return (
		<>
			<h1>This is the REGISTER page</h1>
		</>
	);
};

export default RegisterPage;
