import dotenv from 'dotenv';
import { createServer } from 'node:http';
import { isValidUrl } from './utils/utils';
import { getUser, getUsers } from './modules/accessesDb';
import { ServerAnswer } from './types/types';

dotenv.config();

const PORT = process.env.PORT ? Number.parseInt(process.env.PORT) : 3000;

const server = createServer((req, res) => {
  const { method, url } = req;
  let answer: ServerAnswer = {
    statusCode: 500,
    message: 'Error'
  };

  if (method && url && isValidUrl(method, url)) {
    const userId = url.split('/')[3];

    switch (method) {
      case 'GET':
        if(userId) {
          answer = getUser(userId);
        } else {
          answer = getUsers();
        }
        break;
    
      default:
        break;
    }
  }

  res.writeHead(answer.statusCode, { 'Content-Type': 'text/plain' });
  res.end(answer.message);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Listening on 127.0.0.1:${PORT}`);
});
