import { Entity, Column, ManyToOne } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import { ExtendedBaseEntity } from './Base';
import { User } from './User';

@Entity()
@ObjectType()
export class Task extends ExtendedBaseEntity {
	@Column('text')
	@Field()
	title: string;

	@Column()
	@Field()
	completed: boolean = false;

	@ManyToOne(() => User, (user) => user.tasks)
	user: User;
}
