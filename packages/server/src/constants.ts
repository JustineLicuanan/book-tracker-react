const { NODE_ENV = 'development' } = process.env;

export const __PROD__ = NODE_ENV === 'production';
