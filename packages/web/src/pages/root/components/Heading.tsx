import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { gql } from 'graphql-request';
import { useQuery } from 'react-query';

import { client } from '../../../client';
import { queryKeys } from '../../../constants/queryKeys';
import { UserWithError } from '../../../query-types/User';

const Heading = () => {
	const meQuery = useQuery(queryKeys.ME.key, async () => {
		const { me } = await client.request(gql`
			{
				me {
					id
					email
					books {
						id
						title
						completed
					}
				}
			}
		`);

		return { user: me } as UserWithError;
	});
	const userName = meQuery.data?.user?.email?.split('@')[0];

	return (
		<Box mt={4} mb={2}>
			<Typography variant='h4' style={{ textTransform: 'capitalize' }}>
				{userName}'{!userName?.endsWith('s') && 's'} Books
			</Typography>
		</Box>
	);
};

export default Heading;
