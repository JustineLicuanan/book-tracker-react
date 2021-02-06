import 'cross-fetch/polyfill';
import { gql } from 'graphql-request';

import { client } from './utils/client';
import { LoginObject } from '../graphql-types/AuthResolverTypes';

const registerVariables = {
	email: 'bob@gmail.com',
	password: 'bobsmith',
};

const wrongLoginVariables = {
	email: 'bob2@gmail.com',
	password: 'smithbob',
};

describe('Auth resolvers tests', () => {
	it('User can register', async () => {
		const registerMutation = gql`
			mutation($email: String!, $password: String!) {
				register(input: { email: $email, password: $password }) {
					user {
						email
					}

					errors {
						path
						message
					}
				}
			}
		`;

		const { register: res } = await client.request<{ register: LoginObject }>(
			registerMutation,
			registerVariables
		);

		const mockRes = {
			user: {
				email: registerVariables.email,
			},
			errors: null,
		};

		expect(res).toEqual(mockRes);
	});

	it("User CAN'T register if email is already taken", async () => {
		const registerMutation = gql`
			mutation($email: String!, $password: String!) {
				register(input: { email: $email, password: $password }) {
					user {
						id
						email
					}

					errors {
						path
						message
					}
				}
			}
		`;

		const { register: res } = await client.request<{ register: LoginObject }>(
			registerMutation,
			registerVariables
		);

		const mockRes = {
			user: null,
			errors: [
				{
					path: 'email',
					message: 'email is already registered',
				},
			],
		};

		expect(res).toEqual(mockRes);
	});

	it("User CAN'T login if email is incorrect", async () => {
		const loginMutation = gql`
			mutation($email: String!, $password: String!) {
				login(input: { email: $email, password: $password }) {
					user {
						email
						books {
							id
							title
							completed
						}
					}

					errors {
						path
						message
					}
				}
			}
		`;

		const loginVariables = {
			email: wrongLoginVariables.email,
			password: registerVariables.password,
		};

		const { login: res } = await client.request<{ login: LoginObject }>(
			loginMutation,
			loginVariables
		);

		const mockRes = {
			user: null,
			errors: [
				{
					path: 'email',
					message: 'email or password is incorrect',
				},
			],
		};

		expect(res).toEqual(mockRes);
	});

	it("User CAN'T login if password is incorrect", async () => {
		const loginMutation = gql`
			mutation($email: String!, $password: String!) {
				login(input: { email: $email, password: $password }) {
					user {
						email
						books {
							id
							title
							completed
						}
					}

					errors {
						path
						message
					}
				}
			}
		`;

		const loginVariables = {
			email: registerVariables.email,
			password: wrongLoginVariables.password,
		};

		const { login: res } = await client.request<{ login: LoginObject }>(
			loginMutation,
			loginVariables
		);

		const mockRes = {
			user: null,
			errors: [
				{
					path: 'email',
					message: 'email or password is incorrect',
				},
			],
		};

		expect(res).toEqual(mockRes);
	});

	it('User can login if credentials are correct', async () => {
		const loginMutation = gql`
			mutation($email: String!, $password: String!) {
				login(input: { email: $email, password: $password }) {
					user {
						email
						books {
							id
							title
							completed
						}
					}

					errors {
						path
						message
					}
				}
			}
		`;

		const { login: res } = await client.request<{ login: LoginObject }>(
			loginMutation,
			registerVariables
		);

		const mockRes = {
			user: {
				email: registerVariables.email,
				books: [],
			},
			errors: null,
		};

		expect(res).toEqual(mockRes);
	});

	it("User CAN'T get info if they are not logged in", async () => {
		const meQuery = gql`
			{
				me {
					email
					books {
						id
						title
						completed
					}
				}
			}
		`;

		const { me: res } = await client.request<{ me: LoginObject['user'] }>(
			meQuery
		);

		expect(res).toBeNull();
	});

	it('User can logout', async () => {
		const logoutMutation = gql`
			mutation {
				logout
			}
		`;

		const { logout: res } = await client.request<{ logout: boolean }>(
			logoutMutation
		);

		expect(res).toEqual(true);
	});
});
