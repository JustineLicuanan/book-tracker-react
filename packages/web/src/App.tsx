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
import { User } from './query-types/User';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import DashboardPage from './pages/root';
import LogoutPage from './pages/LogoutPage';

const App = () => {
	const meQuery = useQuery(queryKeys.ME.key, async () => {
		const { me } = await client.request(gql`
			{
				me {
					id
				}
			}
		`);

		return me as User | null;
	});

	return (
		<Router>
			<Switch>
				<Route path={routes.dashboard.path} exact>
					{meQuery.data ? (
						<DashboardPage />
					) : (
						<Redirect to={routes.login.path} />
					)}
				</Route>

				<Route path={routes.register.path} exact>
					{!meQuery.data ? (
						<RegisterPage />
					) : (
						<Redirect to={routes.dashboard.path} />
					)}
				</Route>

				<Route path={routes.login.path} exact>
					{!meQuery.data ? (
						<LoginPage />
					) : (
						<Redirect to={routes.dashboard.path} />
					)}
				</Route>

				<Route path={routes.logout.path} exact>
					<LogoutPage />
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
