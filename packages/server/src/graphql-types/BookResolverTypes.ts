import { ObjectType, Field, InputType } from 'type-graphql';

import { Book } from '../entity/Book';
import { FieldError } from './FieldError';

@ObjectType()
export class AddBookObject {
	@Field({ nullable: true })
	book?: Book;

	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];
}

@InputType()
export class UpdateBookInput {
	@Field()
	id: string;

	@Field()
	title: string;

	@Field()
	completed: boolean;
}

@ObjectType()
export class DeleteBookObject {
	@Field({ nullable: true })
	success?: boolean;

	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];
}
