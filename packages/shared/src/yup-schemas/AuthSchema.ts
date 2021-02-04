import { object, string } from 'yup';

export const loginSchema = object().shape({
	email: string().required().email(),
	password: string().required(),
});

export const registerSchema = object().shape({
	email: string().required().email(),
	password: string().required().min(6),
});
