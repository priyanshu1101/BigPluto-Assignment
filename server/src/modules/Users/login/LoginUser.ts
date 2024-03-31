import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import * as argon2 from "argon2";
import { User } from "../../../entity/User";
import { MyContext } from "../../../types/MyContext";


@Resolver(User) // User is passed as an argument to the Resolver decorator to specify that this resolver is for the User entity (This is necessary for the FieldResolver to work)
export class LoginResolver {

    @Query(() => User, { nullable: true })
    async currentUser(
        @Ctx() ctx: MyContext
    ): Promise<User | null> {
        console.log(ctx.req.session.userId);
        if (!ctx.req.session.userId) {
            return null;
        }
        // const user = await User.findOneById(ctx.req.session.userId);
        const user = await User.findOneById(ctx.req.session.userId);
        return user;
    }

    @Mutation(() => User, { nullable: true }) // The return type is User or null
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() ctx: MyContext // The context argument is of type MyContext which is an interface that extends the Express Request object
    ): Promise<User | null> {
        const user = await User.findOne({ where: { email } });
        if (!user) throw new Error("User not found");
        const valid = await argon2.verify(user.password, password);
        if (!valid) throw new Error("Incorrect password");
        ctx.req.session.userId = user.id;
        ctx.req.cookies.userId = user.id;
        return user;
    }

    @Mutation(() => Boolean) // The return type is Boolean
    async logout(
        @Ctx() ctx: MyContext // The context argument is of type MyContext which is an interface that extends the Express Request object
    ): Promise<Boolean> {
        if (!ctx.req.session.userId) throw new Error("Not authenticated");
        return new Promise((resolve) =>
            ctx.req.session.destroy((err) => {
                if (err) {
                    console.log(err);
                    resolve(false);
                }

                ctx.res.clearCookie('userId');
                resolve(true);
            })
        );
    }
}