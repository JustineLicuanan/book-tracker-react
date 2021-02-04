import { Entity, Column, BeforeInsert, OneToMany } from 'typeorm';
import bcrypt from 'bcryptjs';
import { Field, ObjectType } from 'type-graphql';

import { ExtendedBaseEntity } from './Base';
import { Task } from './Task';

@Entity('users')
@ObjectType()
export class User extends ExtendedBaseEntity {
	@Column('text', { unique: true })
	@Field()
	email: string;

	@Column('text')
	password: string;

	@OneToMany(() => Task, (task) => task.user)
	@Field(() => [Task])
	tasks: Task[];

	@BeforeInsert()
	async hashPass() {
		this.password = await bcrypt.hash(this.password, 10);
	}
}
