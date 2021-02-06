import { GraphQLClient } from 'graphql-request';

const { CLIENT_URI = 'http://localhost:4000/graphql' } = process.env;

export const client = new GraphQLClient(CLIENT_URI, {
	credentials: 'include',
});
