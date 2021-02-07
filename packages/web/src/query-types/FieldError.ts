export interface FieldError {
	path?: string;
	message?: string;
}

export interface SuccessWithError {
	success?: boolean;
	errors?: FieldError[];
}
