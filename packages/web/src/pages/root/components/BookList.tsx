import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { gql } from 'graphql-request';
import { useQuery } from 'react-query';

import { queryKeys } from '../../../constants/queryKeys';
import { client } from '../../../client';
import { UserWithError } from '../../../query-types/User';
import { useDeleteBookMutation } from '../../../query-hooks/useDeleteBookMutation';

const useStyles = makeStyles((theme) => {
	return createStyles({
		root: {
			width: '94%',
			maxWidth: 400,
			backgroundColor: theme.palette.background.paper,
		},
		ml: {
			marginLeft: theme.spacing(1),
		},
	});
});

const BookList = () => {
	const classes = useStyles();
	const deleteBookMutation = useDeleteBookMutation();

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

	return (
		<List className={classes.root}>
			{meQuery.data?.user?.books
				? meQuery.data.user.books.map((value) => {
						const labelId = `book-list-label-${value.id}`;

						return (
							<ListItem
								key={value.id}
								role={undefined}
								dense
								button
								// onClick={() => handleToggle(value.id!)}
							>
								<ListItemIcon>
									<Checkbox
										edge='start'
										checked={value.completed}
										tabIndex={-1}
										disableRipple
										inputProps={{ 'aria-labelledby': labelId }}
									/>
								</ListItemIcon>
								<ListItemText id={labelId} primary={value.title} />
								<ListItemSecondaryAction>
									<IconButton edge='end' aria-label='edit'>
										<EditIcon />
									</IconButton>
									<IconButton
										edge='end'
										aria-label='delete'
										className={classes.ml}
										onClick={async () => {
											await deleteBookMutation.mutateAsync(value.id!);
										}}
									>
										<DeleteIcon />
									</IconButton>
								</ListItemSecondaryAction>
							</ListItem>
						);
				  })
				: null}
		</List>
	);
};

export default BookList;
