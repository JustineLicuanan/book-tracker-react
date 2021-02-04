import { Field, InputType, ObjectType } from 'type-graphql';

import { User } from '../entity/User';
import { FieldError } from './FieldError';

@InputType()
export class LoginInput {
	@Field()
	email: string;

	@Field()
	password: string;
}

@ObjectType()
export class LoginObject {
	@Field(() => User, { nullable: true })
	user?: User;

	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];
}
