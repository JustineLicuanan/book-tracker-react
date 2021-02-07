import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { gql } from 'graphql-request';

import { myMeta } from '../meta';
import { queryKeys } from '../constants/queryKeys';
import { client } from '../client';
import { UserWithError } from '../query-types/User';
import { routes } from '../constants/routes';

const useStyles = makeStyles((theme) => {
	return createStyles({
		root: {
			flexGrow: 1,
		},
		title: {
			flexGrow: 1,
		},
		link: {
			textDecoration: 'none',
			color: 'inherit',
		},
	});
});

const NavBar = () => {
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

	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div className={classes.root}>
			<AppBar position='static'>
				<Container>
					<Toolbar>
						<IconButton
							edge='start'
							color='inherit'
							aria-label='book-tracker-icon'
						>
							<TrackChangesIcon />
						</IconButton>
						<Typography variant='h6' className={classes.title}>
							<Link
								to={
									meQuery.data?.user ? routes.dashboard.path : routes.login.path
								}
								className={classes.link}
							>
								{myMeta.title}
							</Link>
						</Typography>
						<div>
							<IconButton
								aria-label='account of current user'
								aria-controls='menu-appbar'
								aria-haspopup='true'
								onClick={handleMenu}
								color='inherit'
							>
								<AccountCircle />
							</IconButton>
							<Menu
								id='menu-appbar'
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={open}
								onClose={handleClose}
							>
								{!meQuery.data?.user
									? [
											<Link
												to={routes.login.path}
												key='loginLink'
												className={classes.link}
											>
												<MenuItem onClick={handleClose}>Login</MenuItem>
											</Link>,
											<Link
												to={routes.register.path}
												key='registerLink'
												className={classes.link}
											>
												<MenuItem onClick={handleClose}>Register</MenuItem>
											</Link>,
									  ]
									: [
											<Link
												to={routes.dashboard.path}
												key='dashboardLink'
												className={classes.link}
											>
												<MenuItem onClick={handleClose}>Dashboard</MenuItem>
											</Link>,
											<Link
												to={routes.logout.path}
												key='logoutLink'
												className={classes.link}
											>
												<MenuItem onClick={handleClose}>Logout</MenuItem>
											</Link>,
									  ]}
							</Menu>
						</div>
					</Toolbar>
				</Container>
			</AppBar>
		</div>
	);
};

export default NavBar;
