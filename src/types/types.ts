export type User = {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
};

export type ServerAnswer = {
  message: string;
  statusCode: number;
};
