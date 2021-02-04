import { MiddlewareFn } from 'type-graphql';

import { MyContext } from '../graphql-types/MyContext';
import { FieldErrorObject } from '../graphql-types/FieldError';

export const isAuth: MiddlewareFn<MyContext> = async (
	{ context },
	next
): Promise<FieldErrorObject> => {
	const { user } = context.req.session as any;

	if (!user) {
		const errors = [
			{
				path: 'user',
				message: 'user is unauthorized',
			},
		];

		return { errors };
	}

	return next();
};
