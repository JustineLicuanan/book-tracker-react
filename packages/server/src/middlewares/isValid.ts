import { MiddlewareFn } from 'type-graphql';
import { object, ValidationError } from 'yup';

import { MyContext } from '../graphql-types/MyContext';
import { FieldErrorObject } from '../graphql-types/FieldError';

const { shape } = object();

interface Options {
	isNotObject: boolean;
}

type IsValid = (
	schema: ReturnType<typeof shape>,
	options?: Options
) => MiddlewareFn<MyContext>;

export const isValid: IsValid = (schema, options) => async (
	{ args },
	next
): Promise<FieldErrorObject> => {
	try {
		await schema.validate(options?.isNotObject ? args : args.input, {
			abortEarly: false,
			stripUnknown: true,
		});

		return next();
	} catch (err) {
		if (!(err instanceof ValidationError)) {
			const errors = [
				{
					path: 'server',
					message: 'internal server error',
				},
			];

			return { errors };
		}

		const errors = (err as ValidationError).inner.map(({ path, message }) => ({
			path,
			message,
		}));

		return { errors };
	}
};
