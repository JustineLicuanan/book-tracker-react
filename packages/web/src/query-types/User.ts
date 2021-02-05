import { Book } from './Book';
import { FieldError } from './FieldError';

export interface User {
	id?: string;
	email?: string;
	books?: Book[];
}

export interface UserWithError {
	user?: User;
	errors?: FieldError[];
}
