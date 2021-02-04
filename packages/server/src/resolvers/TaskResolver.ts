import { addTaskSchema, deleteTaskSchema } from '@react-tasks/shared';
import {
	Arg,
	Ctx,
	Mutation,
	Query,
	Resolver,
	UseMiddleware,
} from 'type-graphql';

import { isAuth } from '../middlewares/isAuth';
import { Task } from '../entity/Task';
import * as ResolverTypes from '../graphql-types/TaskResolverTypes';
import { MyContext } from '../graphql-types/MyContext';
import { User } from '../entity/User';
import { isValid } from '../middlewares/isValid';

@Resolver()
export class TaskResolver {
	@Mutation(() => ResolverTypes.AddTaskObject)
	@UseMiddleware(isAuth, isValid(addTaskSchema, { isNotObject: true }))
	async addTask(
		@Arg('title') title: string,
		@Ctx() { req }: MyContext
	): Promise<ResolverTypes.AddTaskObject> {
		const user = User.create((req.session as any).user as User);
		const task = await Task.create({ title }).save();

		user!.tasks.push(task);
		await user.save();

		(req.session as any).user = user;
		return { task };
	}

	@Query(() => [Task])
	@UseMiddleware(isAuth)
	async getAllTasks(@Ctx() { req }: MyContext): Promise<Task[]> {
		const { tasks } = (req.session as any).user as User;
		return tasks;
	}

	@Mutation(() => ResolverTypes.DeleteTaskObject)
	@UseMiddleware(isAuth, isValid(deleteTaskSchema, { isNotObject: true }))
	async deleteTask(
		@Arg('id') id: string,
		@Ctx() { req }: MyContext
	): Promise<ResolverTypes.DeleteTaskObject> {
		const tasks = ((req.session as any).user as User).tasks.filter(
			(task) => task.id !== id
		);

		const taskRemoved =
			((req.session as any).user as User).tasks.length - tasks.length;

		if (!taskRemoved) {
			const errors = [
				{
					path: 'task',
					message: 'task not found',
				},
			];

			return { errors };
		}

		const { affected } = await Task.delete(id);

		(req.session as any).user.tasks = tasks;
		return { success: !!affected };
	}
}
