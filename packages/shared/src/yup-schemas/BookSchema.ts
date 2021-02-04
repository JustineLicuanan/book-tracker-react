import { bool, object, string } from 'yup';

export const addBookSchema = object().shape({
	title: string().required(),
});

export const updateBookSchema = object().shape({
	id: string().required().uuid(),
	title: string().required(),
	completed: bool().required(),
});

export const deleteBookSchema = object().shape({
	id: string().required().uuid(),
});
