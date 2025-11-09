import { users } from "../data"
import { ServerAnswer } from "../types/types";
// import { v4 as uuidv4, validate } from 'uuid';
import { validate } from 'uuid';

export const getUsers = (): ServerAnswer => {
    return {
        statusCode: 200,
        message: JSON.stringify(users)
    };
}

export const getUser = ( userID: string ): ServerAnswer => {
    if(!validate(userID)) {
        return {
            statusCode: 400,
            message: 'UserId is invalid (not uuid)'
        }
    }
    const user = users.find((user) => user.id === userID);

    return {
        statusCode: user ? 200 : 404,
        message: user ? JSON.stringify(user) : 'User not found'
    }
}
