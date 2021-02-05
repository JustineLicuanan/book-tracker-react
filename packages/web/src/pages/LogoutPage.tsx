import { useEffect } from 'react';
import { Box, Typography } from '@material-ui/core';
import { gql } from 'graphql-request';
import { useMutation, useQueryClient } from 'react-query';
import { Redirect } from 'react-router-dom';

import { client } from '../client';
import { queryKeys } from '../constants/queryKeys';
import { routes } from '../constants/routes';

const LogoutPage = () => {
	const queryClient = useQueryClient();
	const logoutMutation = useMutation(
		async () => {
			const { logout } = await client.request(gql`
				mutation {
					logout
				}
			`);

			return logout as boolean;
		},
		{
			onSuccess: () => {
				queryClient.setQueryData(queryKeys.ME.key, { user: null });
			},
		}
	);

	useEffect(() => {
		(async () => {
			await logoutMutation.mutateAsync();
		})();

		// eslint-disable-next-line
	}, []);

	return !logoutMutation.isSuccess ? (
		<Box my={8}>
			<Typography variant='h3' align='center'>
				Logging out...
			</Typography>
		</Box>
	) : (
		<Redirect to={routes.login.path} />
	);
};

export default LogoutPage;
