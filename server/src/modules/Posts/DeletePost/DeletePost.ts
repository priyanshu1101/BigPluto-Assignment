import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Post } from "../../../entity/Post";
import { MyContext } from "src/types/MyContext";
import { isAuth } from "../middleware/isAuth";
import { User } from "../../../entity/User";

@Resolver(Post) // User is passed as an argument to the Resolver decorator to specify that this resolver is for the User entity (This is necessary for the FieldResolver to work)
export class deletePostResolver {

    @UseMiddleware(isAuth())
    @Mutation(() => Boolean)
    async deletePost(
        @Arg("postId") id: string, // The data argument is of type RegisterInput which is a class with the fields firstName, lastName, email, and password
        @Ctx() ctx: MyContext // The context argument is of type MyContext which is an interface that extends the Express Request object
    ): Promise<Boolean> {
        if (!ctx.req.session.userId) { // Used because typescript giving error even though we have isAuth middleware
            throw new Error("Not authenticated");
        }
        const user = await User.findOneById(ctx.req.session.userId); // to check user if available (not stored in cookie and deleted in background)
        if (!user) {
            throw new Error("User not found");
        }
        const post = await Post.findOneById(id);
        if (!post) {
            throw new Error("Post not found");
        }
        if (user.role == "admin" || post?.createdBy == ctx.req.session.userId) {
            await Post.remove(post);
            return true;
        }
        throw new Error("Use don't have access to this resource");
    }
}