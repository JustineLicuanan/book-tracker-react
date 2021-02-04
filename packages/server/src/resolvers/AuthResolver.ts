import { loginSchema, registerSchema } from '@react-tasks/shared';
import {
	Arg,
	Ctx,
	Mutation,
	Query,
	Resolver,
	UseMiddleware,
} from 'type-graphql';
import bcrypt from 'bcryptjs';

import { User } from '../entity/User';
import * as ResolverTypes from '../graphql-types/AuthResolverTypes';
import { MyContext } from '../graphql-types/MyContext';
import { isValid } from '../middlewares/isValid';

@Resolver()
export class AuthResolver {
	@Mutation(() => ResolverTypes.LoginObject)
	@UseMiddleware(isValid(registerSchema))
	async register(
		@Arg('input') input: ResolverTypes.LoginInput,
		@Ctx() { req }: MyContext
	): Promise<ResolverTypes.LoginObject> {
		const userExists = await User.findOne({ email: input.email });

		if (userExists) {
			const errors = [
				{
					path: 'email',
					message: 'email is already registered',
				},
			];

			return { errors };
		}

		const user = await User.create(input).save();
		user.tasks = [];

		(req.session as any).user = user;
		return { user };
	}

	@Mutation(() => ResolverTypes.LoginObject)
	@UseMiddleware(isValid(loginSchema))
	async login(
		@Arg('input') input: ResolverTypes.LoginInput,
		@Ctx() { req }: MyContext
	): Promise<ResolverTypes.LoginObject> {
		const user = await User.findOne(
			{ email: input.email },
			{ relations: ['tasks'] }
		);

		const errors = [
			{
				path: 'email',
				message: 'email or password is incorrect',
			},
		];

		if (!user) {
			return { errors };
		}

		const isMatch = await bcrypt.compare(input.password, user.password);

		if (!isMatch) {
			return { errors };
		}

		(req.session as any).user = user;
		return { user };
	}

	@Query(() => User, { nullable: true })
	me(@Ctx() { req }: MyContext): User | undefined {
		const { user } = req.session as any;
		return user;
	}

	@Mutation(() => Boolean)
	logout(@Ctx() ctx: MyContext): Promise<boolean> {
		return new Promise((res, rej) => {
			ctx.req.session!.destroy((err) => {
				if (err) {
					return rej(false);
				}

				ctx.res.clearCookie('qid');
				return res(true);
			});
		});
	}
}
