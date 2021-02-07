import { gql } from 'graphql-request';
import { useMutation, useQueryClient } from 'react-query';

import { client } from '../client';
import { queryKeys } from '../constants/queryKeys';
import { SuccessWithError } from '../query-types/FieldError';

export const useDeleteBookMutation = () => {
	const queryClient = useQueryClient();

	return useMutation(
		async (id: string) => {
			const { deleteBook } = await client.request(
				gql`
					mutation($id: String!) {
						deleteBook(id: $id) {
							success
							errors {
								path
								message
							}
						}
					}
				`,
				{ id }
			);

			return deleteBook as SuccessWithError;
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(queryKeys.ME.key);
			},
		}
	);
};
