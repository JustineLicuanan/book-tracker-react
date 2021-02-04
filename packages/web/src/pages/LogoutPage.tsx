import { gql } from 'graphql-request';
import { useQuery } from 'react-query';
import { Redirect } from 'react-router-dom';

import { client } from '../client';
import { queryKeys } from '../constants/queryKeys';
import { routes } from '../constants/routes';

const LogoutPage = () => {
	const logoutMutation = useQuery(queryKeys.LOGOUT.key, async () => {
		const { logout } = await client.request(gql`
			mutation {
				logout
			}
		`);

		return logout as boolean;
	});

	return logoutMutation.isLoading ? (
		<h1>Logging out...</h1>
	) : (
		<Redirect to={routes.login.path} />
	);
};

export default LogoutPage;
