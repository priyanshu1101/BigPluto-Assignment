import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ObjectIdColumn } from "typeorm";

@ObjectType() // This decorator is used to expose the class to the GraphQL schema (So that the class can be used as a return type in the GraphQL queries and mutations)
@Entity() // This decorator is used to tell TypeORM that this class is an entity that will be stored in the database (So a table will be created in the database with the name 'user')
export class User extends BaseEntity { // BaseEntity is a helper class that provides some useful methods for interacting with the database
    @Field()
    @ObjectIdColumn() // objectIdColumn is used to specify that this field is the primary key of the table (Used for MongoDB, not necessary for SQL databases)
    id: string;

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field()
    name: string;

    @Field()
    @Column()
    role: string;

    @Field() // This decorator is used to expose the field to the GraphQL schema
    @Column({ unique: true })
    email: string;

    @Column() // This field is not exposed to the GraphQL schema (absent of the @Field() decorator)
    password: string;
}

