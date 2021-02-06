import { Entity, Column, ManyToOne } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import { ExtendedBaseEntity } from './Base';
import { User } from './User';

@Entity()
@ObjectType()
export class Book extends ExtendedBaseEntity {
	@Column('text')
	@Field()
	title: string;

	@Column()
	@Field()
	completed: boolean = false;

	@Column('uuid', { nullable: true })
	userId: string;

	@ManyToOne(() => User, (user) => user.books)
	user: User;
}
