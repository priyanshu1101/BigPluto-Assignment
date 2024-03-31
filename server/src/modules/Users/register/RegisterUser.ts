import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { User } from "../../../entity/User";
import { RegisterInput } from "./RegisterInput";
import * as argon2 from "argon2";

@Resolver(User) // User is passed as an argument to the Resolver decorator to specify that this resolver is for the User entity (This is necessary for the FieldResolver to work)
export class RegisterResolver {
    @Query(() => String)

    @FieldResolver()
    async name(@Root() parent: User) { // The parent argument contains the object returned by the query or mutation
        return `${parent.firstName} ${parent.lastName}`;
    }


    @Mutation(() => User)
    async register(
        @Arg("data") { firstName, lastName, email, password, role }: RegisterInput // The data argument is of type RegisterInput which is a class with the fields firstName, lastName, email, and password
    ): Promise<User> {
        const hashedPassword = await argon2.hash(password);
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role
        }).save();
        return user;
        // return `First Name: ${firstName}, Last Name: ${lastName}, Email: ${email}, Password: ${hashedPassword}`;
    }

}