import { User } from "../../../entity/User";
import { MyContext } from "src/types/MyContext";
import { MiddlewareFn } from "type-graphql";

export function isAllowed(role: string[]): MiddlewareFn<MyContext> {
    return async ({ context }, next) => {
        // You can now use arg1 and arg2 in your middleware logic

        if (!context.req.session.userId) {
            throw new Error("Not authenticated");
        }
        const user = await User.findOneById(context.req.session.userId);
        if (!user) {
            throw new Error("User not found");
        }
        if (!role.includes(user.role)) {
            throw new Error("Use don't have access to this resource");
        }
        return next();
    };
}