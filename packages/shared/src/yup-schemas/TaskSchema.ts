import { bool, object, string } from 'yup';

export const addTaskSchema = object().shape({
	title: string().required(),
});

export const updateTaskSchema = object().shape({
	id: string().required().uuid(),
	title: string().required(),
	completed: bool().required(),
});

export const deleteTaskSchema = object().shape({
	id: string().required().uuid(),
});
