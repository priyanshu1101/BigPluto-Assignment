import { Arg, Query, Resolver, UseMiddleware } from "type-graphql";
import { Post } from "../../../entity/Post";
import { isAuth } from "../middleware/isAuth";

@Resolver()
export class FetchPostByIDResolver {

    @UseMiddleware(isAuth())
    @Query(() => Post) // Use Array<Post> or [Post], both are equivalent
    async FetchPostByID(
        @Arg("postId") id: string, // The data argument is of type RegisterInput which is a class with the fields firstName, lastName, email, and password
    ): Promise<Post> {
        const post = await Post.findOneById(id);
        if (!post) {
            throw new Error("Post not found");
        }        
        return post;
    }
}
