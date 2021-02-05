import { Container } from '@material-ui/core';
import { useEffect } from 'react';

import { myMeta } from '../../meta';
import LoginForm from './components/LoginForm';

const LoginPage = () => {
	useEffect(() => {
		document.title = `Login | ${myMeta.title}`;
	});

	return (
		<Container>
			<LoginForm />
		</Container>
	);
};

export default LoginPage;
