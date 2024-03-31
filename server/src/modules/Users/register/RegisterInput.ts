import { IsEmail, Length } from "class-validator";
import { Field, InputType } from "type-graphql";
import { DoesEmailExist } from "./CustomValidations/DoesEmailExist";

@InputType() // It is used to identify developer that this class is an input type (Not required but it is a good practice to use it so that the code is more readable)
export class RegisterInput {

    @Length(1, 100)
    @Field()
    firstName: string;

    @Field()
    @Length(1, 100)
    lastName: string;

    @IsEmail()
    @Field()
    @DoesEmailExist({ message: "Email already exists" })
    email: string;

    @Field()
    role: string;

    @Field()
    password: string;
}