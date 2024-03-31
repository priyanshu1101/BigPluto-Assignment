import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType() // It is used to identify developer that this class is an input type (Not required but it is a good practice to use it so that the code is more readable)
export class PostInput {

    @Field()
    @Length(1, 100)
    title: string;

    @Field()
    @Length(1, 200)
    message: string;

    @Field()
    tags: string;

}