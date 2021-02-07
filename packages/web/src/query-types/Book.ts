import { FieldError } from './FieldError';

export interface Book {
	id?: string;
	title?: string;
	completed?: boolean;
}

export interface BookWithError {
	book?: Book;
	errors?: FieldError[];
}
