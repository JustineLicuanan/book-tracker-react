import { GraphQLClient } from 'graphql-request';

import { __PROD__ } from './constants';
import { myMeta } from './meta';

export const client = new GraphQLClient(
	myMeta.graphqlEndpoint,
	!__PROD__
		? {
				credentials: 'include',
		  }
		: undefined
);
