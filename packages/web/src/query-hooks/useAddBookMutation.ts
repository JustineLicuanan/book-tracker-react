import { gql } from 'graphql-request';
import { useMutation, useQueryClient } from 'react-query';

import { client } from '../client';
import { queryKeys } from '../constants/queryKeys';
import { BookWithError } from '../query-types/Book';
import { UserWithError } from '../query-types/User';

export const useAddBookMutation = () => {
	const queryClient = useQueryClient();

	return useMutation(
		async (title: string) => {
			const { addBook } = await client.request(
				gql`
					mutation($title: String!) {
						addBook(title: $title) {
							book {
								id
								title
								completed
							}

							errors {
								path
								message
							}
						}
					}
				`,
				{ title }
			);

			return addBook as BookWithError;
		},
		{
			onSuccess: (data) => {
				queryClient.setQueryData(queryKeys.ME.key, (oldData) => {
					(oldData as UserWithError).user?.books?.push(data?.book!);
					return oldData;
				});
			},
		}
	);
};
