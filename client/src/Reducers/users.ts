import { UserEntity } from "../Entities/User";

// Define the action types and payload structure
type Action =
    | { type: "LOGIN"; payload: UserEntity }
    | { type: "LOGOUT" }
    | { type: "SET_USER"; payload: UserEntity }
  ;

// Define initial state
const initialState: UserEntity | null = null;

const userReducer = (user: UserEntity | null = initialState, action: Action): UserEntity | null => {
    switch (action.type) {
        case "LOGIN":
        case "SET_USER":
            return action.payload;
        case "LOGOUT":
            return null;
        default:
            return user;
    }
};

export default userReducer;
