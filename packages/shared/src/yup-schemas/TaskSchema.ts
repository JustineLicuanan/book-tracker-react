import { object, string } from 'yup';

export const addTaskSchema = object().shape({
	title: string().required(),
});

export const deleteTaskSchema = object().shape({
	id: string().required().uuid(),
});
