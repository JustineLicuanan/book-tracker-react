import { GraphQLClient } from 'graphql-request';

import { __PROD__ } from './constants';
import { myMeta } from './meta';

export const client = new GraphQLClient(myMeta.graphqlEndpoint, {
	credentials: !__PROD__ ? 'include' : 'same-origin',
});
