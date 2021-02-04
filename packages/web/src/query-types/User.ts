import { Task } from './Task';

export interface User {
	id?: string;
	email?: string;
	tasks?: Task[];
}
