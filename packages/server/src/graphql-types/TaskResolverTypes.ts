import { ObjectType, Field, InputType } from 'type-graphql';

import { Task } from '../entity/Task';
import { FieldError } from './FieldError';

@ObjectType()
export class AddTaskObject {
	@Field({ nullable: true })
	task?: Task;

	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];
}

@InputType()
export class UpdateTaskInput {
	@Field()
	id: string;

	@Field()
	title: string;

	@Field()
	completed: boolean;
}

@ObjectType()
export class DeleteTaskObject {
	@Field({ nullable: true })
	success?: boolean;

	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];
}
