import { Container } from '@material-ui/core';
import { useEffect } from 'react';

import { myMeta } from '../../meta';
import RegisterForm from './components/RegisterForm';

const RegisterPage = () => {
	useEffect(() => {
		document.title = `Register | ${myMeta.title}`;
	});

	return (
		<Container>
			<RegisterForm />
		</Container>
	);
};

export default RegisterPage;
