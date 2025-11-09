import { users } from '../data';
import { ServerAnswer } from '../types/types';
import { v4 as uuidv4, validate } from 'uuid';

export const getUsers = (): ServerAnswer => {
  return {
    statusCode: 200,
    message: JSON.stringify(users),
  };
};

export const getUser = (userID: string): ServerAnswer => {
  if (!validate(userID)) {
    return {
      statusCode: 400,
      message: 'UserId is invalid (not uuid)',
    };
  }
  const user = users.find((user) => user.id === userID);

  return {
    statusCode: user ? 200 : 404,
    message: user ? JSON.stringify(user) : 'User not found',
  };
};

export const createUser = ({
  username,
  age,
  hobbies,
}: {
  username?: string;
  age?: number;
  hobbies: string[];
}): ServerAnswer => {
  if (
    username &&
    age &&
    hobbies &&
    typeof username === 'string' &&
    typeof age === 'number' &&
    Array.isArray(hobbies) &&
    hobbies.every((item) => typeof item === 'string')
  ) {
    const newUser = {
      age,
      username,
      hobbies,
      id: uuidv4(),
    };
    users.push(newUser);
    return {
      statusCode: 201,
      message: JSON.stringify(newUser),
    };
  } else {
    return {
      statusCode: 400,
      message: 'Does not contain required fields',
    };
  }
};
