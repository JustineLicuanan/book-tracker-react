import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import session from 'express-session';
import { createConnection, getConnectionOptions } from 'typeorm';
import { TypeormStore } from 'connect-typeorm';

import { AuthResolver } from './resolvers/AuthResolver';
import { TaskResolver } from './resolvers/TaskResolver';
import { __PROD__ } from './constants';
import { Session } from './entity/Session';

(async () => {
	const {
		NODE_ENV = 'development',
		PORT = '4000',
		SESSION_SECRET = 'aslkdfjoiq12312',
	} = process.env;
	const app = express();

	const options = await getConnectionOptions(NODE_ENV);
	const connection = await createConnection({ ...options, name: 'default' });
	const sessionRepo = connection.getRepository(Session);

	console.log('Connected to database successfully');

	app.use(
		session({
			store: new TypeormStore({
				cleanupLimit: 2,
				ttl: 86400,
			}).connect(sessionRepo),
			name: 'qid',
			secret: SESSION_SECRET,
			resave: false,
			saveUninitialized: false,
			cookie: {
				httpOnly: true,
				secure: __PROD__,
				maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
				...(!__PROD__ && { sameSite: 'none' }),
			},
		})
	);
	app.use(express.static('../../client/build'));

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [AuthResolver, TaskResolver],
			validate: false,
		}),
		context: ({ req, res }) => ({ req, res }),
		...(!__PROD__ && {
			playground: {
				settings: {
					'request.credentials': 'include',
				},
			},
		}),
	});

	const corsOptions = {
		origin: 'http://localhost:3000',
		credentials: true,
	};

	apolloServer.applyMiddleware({
		app,
		cors: !__PROD__ ? corsOptions : false,
	});
	app.listen(PORT, () => {
		console.log(`Server started at http://localhost:${PORT}/graphql`);
	});
})();
