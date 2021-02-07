import { useEffect } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import { myMeta } from '../../meta';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import Heading from './components/Heading';

const useStyles = makeStyles((theme) => {
	return createStyles({
		root: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			marginTop: theme.spacing(8),
		},
	});
});

const DashboardPage = () => {
	const classes = useStyles();

	useEffect(() => {
		document.title = `Dashboard | ${myMeta.title}`;
	});

	return (
		<div className={classes.root}>
			<BookForm />
			<Heading />
			<BookList />
		</div>
	);
};

export default DashboardPage;
