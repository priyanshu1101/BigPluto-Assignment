import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ObjectIdColumn } from "typeorm";
import { User } from "./User";

@ObjectType() // This decorator is used to expose the class to the GraphQL schema (So that the class can be used as a return type in the GraphQL queries and mutations)
@Entity() // This decorator is used to tell TypeORM that this class is an entity that will be stored in the database (So a table will be created in the database with the name 'user')
export class Post extends BaseEntity { // BaseEntity is a helper class that provides some useful methods for interacting with the database
    @Field()
    @ObjectIdColumn() // objectIdColumn is used to specify that this field is the primary key of the table (Used for MongoDB, not necessary for SQL databases)
    id: string;

    @Field()
    creator: User; // name of the user only for apollo server

    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    message: string;

    @Field()
    @Column()
    tags: string;

    @Field()
    @Column()
    createdAt: string;

    @Field()
    @Column()
    createdBy: string;

}

