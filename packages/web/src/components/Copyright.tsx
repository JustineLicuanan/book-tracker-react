import Box from '@material-ui/core/Box';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import { myMeta } from '../meta';

const Copyright = () => {
	return (
		<Box mt={8} mb={2}>
			<Typography variant='body2' color='textSecondary' align='center'>
				{'Made w/ ❤️ by '}
				<MuiLink
					color='inherit'
					href={myMeta.authorWebsite}
					target='_blank'
					rel='noreferrer'
				>
					{myMeta.authorName}
				</MuiLink>
				{' © '}
				{new Date().getFullYear()}
			</Typography>
		</Box>
	);
};

export default Copyright;
