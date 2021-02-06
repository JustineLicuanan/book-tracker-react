const devConfig = {
	name: 'development',
	type: 'better-sqlite3',
	database: 'database.sqlite',
	synchronize: true,
	logging: true,
	entities: ['src/entity/**/*.ts'],
	migrations: ['src/migration/**/*.ts'],
	subscribers: ['src/subscriber/**/*.ts'],
	cli: {
		entitiesDir: 'src/entity',
		migrationsDir: 'src/migration',
		subscribersDir: 'src/subscriber',
	},
};

const stagingConfig = {
	name: 'staging',
	type: 'better-sqlite3',
	database: 'database.sqlite',
	synchronize: true,
	logging: true,
	entities: ['dist/entity/**/*.js'],
	migrations: ['dist/migration/**/*.js'],
	subscribers: ['dist/subscriber/**/*.js'],
	cli: {
		entitiesDir: 'dist/entity',
		migrationsDir: 'dist/migration',
		subscribersDir: 'dist/subscriber',
	},
};

const testConfig = {
	name: 'test',
	type: 'better-sqlite3',
	database: 'database.test.sqlite',
	synchronize: true,
	logging: true,
	dropSchema: true,
	entities: ['src/entity/**/*.ts'],
	migrations: ['src/migration/**/*.ts'],
	subscribers: ['src/subscriber/**/*.ts'],
	cli: {
		entitiesDir: 'src/entity',
		migrationsDir: 'src/migration',
		subscribersDir: 'src/subscriber',
	},
};

const prodConfig = {
	name: 'production',
	type: 'postgres',
	url: process.env.DATABASE_URL,
	synchronize: true, // Switch this to false once you have the initial tables created and use migrations instead
	logging: false,
	entities: ['dist/entity/**/*.js'],
	migrations: ['dist/migration/**/*.js'],
	subscribers: ['dist/subscriber/**/*.js'],
	cli: {
		entitiesDir: 'dist/entity',
		migrationsDir: 'dist/migration',
		subscribersDir: 'dist/subscriber',
	},
	ssl: true,
	extra: {
		ssl: {
			rejectUnauthorized: false,
		},
	},
};

const ormconfig = [devConfig, testConfig, stagingConfig, prodConfig];

module.exports = ormconfig;
