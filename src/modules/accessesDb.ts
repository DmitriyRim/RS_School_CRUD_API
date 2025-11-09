import { users } from '../data';
import { RequestBody, ServerAnswer, User } from '../types/types';
import { v4 as uuidv4, validate } from 'uuid';

const errorAnswers = {
  notFound: {
    statusCode: 404,
    message: 'User not found',
  },
  invalidUUID: {
    statusCode: 400,
    message: 'UserId is invalid (not uuid)',
  },
    incorrectData: {
    statusCode: 400,
    message: 'Does not contain required fields',
  },
};

export const isValidBody = (body: RequestBody): boolean => {
    const { username, age, hobbies } = body;
  if (
    username &&
    age &&
    hobbies &&
    typeof username === 'string' &&
    typeof age === 'number' &&
    Array.isArray(hobbies) &&
    hobbies.every((item) => typeof item === 'string')
  ) {
    return true
  } 
  return false; 
}

export const getUsers = (): ServerAnswer => {
  return {
    statusCode: 200,
    message: JSON.stringify(users),
  };
};

export const getUser = (userID: string): ServerAnswer => {
  if (!validate(userID)) {
    return errorAnswers.invalidUUID;
  }
  const user = users.find((user) => user.id === userID);

  return user
    ? {
        statusCode: 200,
        message: JSON.stringify(user),
      }
    : errorAnswers.notFound;
};

export const createUser = (body: User): ServerAnswer => {

  if (isValidBody(body)) {
    const newUser = {
      age: body.age,
      username: body.username,
      hobbies: body.hobbies,
      id: uuidv4(),
    };
    users.push(newUser);
    return {
      statusCode: 201,
      message: JSON.stringify(newUser),
    };
  } else {
    return errorAnswers.incorrectData;
  }
};

export const updateUser = (userID: string, body: User): ServerAnswer => {
    if (!validate(userID)) {
        return errorAnswers.invalidUUID;
    }

    const userIndex = users.findIndex((user) => user.id === userID);

    if(userIndex === -1) {
        return errorAnswers.notFound;
    } 

    if (isValidBody(body)) {
    const newUser = {
      age: body.age,
      username: body.username,
      hobbies: body.hobbies,
      id: userID
    };

    users.splice(userIndex, 1, newUser)
    return {
      statusCode: 200,
      message: 'The data has been updated',
    };
  } else {
    return errorAnswers.incorrectData;
  }

};

export const deleteUser = (userID: string): ServerAnswer => {
    if (!validate(userID)) {
        return errorAnswers.invalidUUID;
    }

    const userIndex = users.findIndex((user) => user.id === userID);

    if(userIndex === -1) {
        return errorAnswers.notFound;
    } 

    users.splice(userIndex, 1);
    return {
        statusCode: 204,
        message: 'The user has been deleted'
    }
}

/*
DELETE api/users/{userId} используется для удаления существующего пользователя из базы данных
Сервер должен ответить кодом status code 204, если запись найдена и удалена
Сервер должен ответить кодом status code 400 и соответствующим сообщением, если userId недействителен (не uuid).
Сервер должен ответить кодом status code 404 и соответствующим сообщением, если запись с id === userId не существует
*/