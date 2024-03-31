import { Query, Resolver, UseMiddleware } from "type-graphql";
import { Post } from "../../../entity/Post";
import { isAuth } from "../middleware/isAuth";
import { isAllowed } from "../middleware/isAllowed";

@Resolver()
export class fetchPostForAdminResolver {

    @UseMiddleware(isAuth(), isAllowed(["admin"]))
    @Query(() => [Post]) // Use Array<Post> or [Post], both are equivalent
    async fetchPostForAdmin(): Promise<Post[]> {
        const posts = await Post.find();
        return posts;
    }
}
