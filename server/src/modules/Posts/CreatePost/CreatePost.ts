import { Arg, Ctx, FieldResolver, Mutation, Resolver, Root, UseMiddleware } from "type-graphql";
import { Post } from "../../../entity/Post";
import { PostInput } from "../PostInputs/PostInput";
import { MyContext } from "src/types/MyContext";
import { isAuth } from "../middleware/isAuth";
import { isAllowed } from "../middleware/isAllowed";
import { User } from "../../../entity/User";

@Resolver(Post) // User is passed as an argument to the Resolver decorator to specify that this resolver is for the User entity (This is necessary for the FieldResolver to work)
export class createPostResolver {

    @FieldResolver()
    async creator(@Root() parent: Post) { // The parent argument contains the object returned by the query or mutation
        const user = await User.findOneById(parent.createdBy);
        return user;
    }

    @UseMiddleware(isAuth(), isAllowed(["admin", "user"]))
    @Mutation(() => Post)
    async createPost(
        @Arg("postData") { title, message, tags }: PostInput, // The data argument is of type RegisterInput which is a class with the fields firstName, lastName, email, and password
        @Ctx() ctx: MyContext // The context argument is of type MyContext which is an interface that extends the Express Request object
    ): Promise<Post> {
        const post = await Post.create({
            title,
            message,
            tags,
            createdAt: new Date().toISOString(),
            createdBy: ctx.req.session.userId
        }).save();
        return post;
    }
}