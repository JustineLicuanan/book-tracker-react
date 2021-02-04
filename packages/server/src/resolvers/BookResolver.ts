import {
	addBookSchema,
	deleteBookSchema,
	updateBookSchema,
} from '@book-tracker/shared';
import {
	Arg,
	Ctx,
	Mutation,
	Query,
	Resolver,
	UseMiddleware,
} from 'type-graphql';

import { isAuth } from '../middlewares/isAuth';
import { Book } from '../entity/Book';
import * as ResolverTypes from '../graphql-types/BookResolverTypes';
import { MyContext } from '../graphql-types/MyContext';
import { User } from '../entity/User';
import { isValid } from '../middlewares/isValid';

@Resolver()
export class BookResolver {
	@Mutation(() => ResolverTypes.AddBookObject)
	@UseMiddleware(isAuth, isValid(addBookSchema, { isNotObject: true }))
	async addBook(
		@Arg('title') title: string,
		@Ctx() { req }: MyContext
	): Promise<ResolverTypes.AddBookObject> {
		const user = User.create((req.session as any).user as User);
		const book = await Book.create({ title }).save();

		user!.books.push(book);
		await user.save();

		(req.session as any).user = user;
		return { book };
	}

	@Query(() => [Book])
	@UseMiddleware(isAuth)
	async getAllBooks(@Ctx() { req }: MyContext): Promise<Book[]> {
		const { books } = (req.session as any).user as User;
		return books;
	}

	@Mutation(() => ResolverTypes.DeleteBookObject)
	@UseMiddleware(isAuth, isValid(updateBookSchema))
	async updateBook(
		@Arg('input') { id, ...input }: ResolverTypes.UpdateBookInput,
		@Ctx() { req }: MyContext
	): Promise<ResolverTypes.DeleteBookObject> {
		let bookUpdated = false;
		const books = ((req.session as any).user as User).books.map((book) => {
			if (book.id === id) {
				book.title = input.title;
				book.completed = input.completed;
				bookUpdated = true;
			}

			return book;
		});

		if (!bookUpdated) {
			const errors = [
				{
					path: 'book',
					message: 'book not found',
				},
			];

			return { errors };
		}

		const { affected } = await Book.update(id, input);

		(req.session as any).user.books = books;
		return { success: !!affected };
	}

	@Mutation(() => ResolverTypes.DeleteBookObject)
	@UseMiddleware(isAuth, isValid(deleteBookSchema, { isNotObject: true }))
	async deleteBook(
		@Arg('id') id: string,
		@Ctx() { req }: MyContext
	): Promise<ResolverTypes.DeleteBookObject> {
		const books = ((req.session as any).user as User).books.filter(
			(book) => book.id !== id
		);

		const bookRemoved =
			((req.session as any).user as User).books.length - books.length;

		if (!bookRemoved) {
			const errors = [
				{
					path: 'book',
					message: 'book not found',
				},
			];

			return { errors };
		}

		const { affected } = await Book.delete(id);

		(req.session as any).user.books = books;
		return { success: !!affected };
	}
}
