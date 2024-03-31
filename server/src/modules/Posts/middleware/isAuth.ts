import { MyContext } from "src/types/MyContext";
import { MiddlewareFn } from "type-graphql";

export function isAuth(): MiddlewareFn<MyContext> {
    return async ({ context }, next) => {
        console.log(context.req.session.userId);

        if (!context.req.session.userId) {
            return new Error("Not authenticated");
        }
        return next();
    };
}