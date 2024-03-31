import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { Post } from "../../../entity/Post";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "src/types/MyContext";
import { User } from "../../../entity/User";

@Resolver()
export class fetchPostForUserResolver {

    @UseMiddleware(isAuth())
    @Query(() => [Post]) // Use Array<Post> or [Post], both are equivalent
    async fetchPostForUser(
        @Ctx() ctx : MyContext
    ): Promise<Post[]> {
        if(ctx.req.session.userId){
            const user = await User.findOneById(ctx.req.session.userId);
            if(user?.role==='admin'){
                return await Post.find();
            }
        }
        const posts = await Post.find({where:{createdBy: ctx.req.session.userId}});
        
        return posts;
    }
}
