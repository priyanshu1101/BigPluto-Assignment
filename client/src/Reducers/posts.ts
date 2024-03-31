import { PostEntity } from "../Entities/Post";

// Define the action types and payload structure
type Action =
    | { type: "FETCH_ALL"; payload: PostEntity[] }
    | { type: "CREATE"; payload: PostEntity }
    | { type: "UPDATE"; payload: PostEntity }
    | { type: "DELETE"; payload: string } // Assuming payload is the ID of the post to delete
    | { type: "LIKE"; payload: PostEntity };

const postReducer = (posts: PostEntity[] = [], action: Action): PostEntity[] => {
    switch (action.type) {
        case "FETCH_ALL":
            return action.payload;
        case "CREATE":
            return [...posts, action.payload];
        case "UPDATE":
            return posts.map((post) => (post.id === action.payload.id ? action.payload : post));
        case "DELETE":
            return posts.filter((post) => post.id !== action.payload);
        case "LIKE":
            return posts.map((post) => (post.id === action.payload.id ? action.payload : post));
        default:
            return posts;
    }
};

export default postReducer;
