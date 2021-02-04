import { PrimaryColumn, BaseEntity } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export abstract class ExtendedBaseEntity extends BaseEntity {
	@PrimaryColumn('uuid')
	@Field(() => String)
	id = uuidv4();
}
