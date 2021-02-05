import { useQuery } from 'react-query';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import { gql } from 'graphql-request';

import { routes } from './constants/routes';
import { queryKeys } from './constants/queryKeys';
import { client } from './client';
import { UserWithError } from './query-types/User';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import DashboardPage from './pages/root';
import LogoutPage from './pages/LogoutPage';
import NavBar from './components/NavBar';
import Copyright from './components/Copyright';

const App = () => {
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
		<Router>
			<NavBar />
			<Switch>
				<Route path={routes.dashboard.path} exact>
					{meQuery.data?.user ? (
						<DashboardPage />
					) : (
						<Redirect to={routes.login.path} />
					)}
				</Route>

				<Route path={routes.register.path} exact>
					{!meQuery.data?.user ? (
						<RegisterPage />
					) : (
						<Redirect to={routes.dashboard.path} />
					)}
				</Route>

				<Route path={routes.login.path} exact>
					{!meQuery.data?.user ? (
						<LoginPage />
					) : (
						<Redirect to={routes.dashboard.path} />
					)}
				</Route>

				<Route path={routes.logout.path} exact>
					<LogoutPage />
				</Route>
			</Switch>
			<Copyright />
		</Router>
	);
};

export default App;
