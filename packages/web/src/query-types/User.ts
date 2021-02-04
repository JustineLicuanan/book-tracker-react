import { Book } from './Book';

export interface User {
	id?: string;
	email?: string;
	books?: Book[];
}
