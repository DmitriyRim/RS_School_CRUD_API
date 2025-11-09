import dotenv from 'dotenv';
import { createServer } from 'node:http';
import { isValidUrl, parseRequest } from './utils/utils';
import { createUser, getUser, getUsers, updateUser } from './modules/accessesDb';
import { ServerAnswer } from './types/types';

dotenv.config();

const PORT = process.env.PORT ? Number.parseInt(process.env.PORT) : 3000;

const server = createServer((req, res) => {
  const { method, url } = req;
  let answer: ServerAnswer = {
    statusCode: 500,
    message: 'Error',
  };
  let body: string = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    if (method && url && isValidUrl(method, url)) {
      const userId = url.split('/')[3];

      switch (method) {
        case 'GET':
          if (userId) {
            answer = getUser(userId);
          } else {
            answer = getUsers();
          }
          break;
        case 'POST':
          answer = createUser(parseRequest(body));
          break;
        case 'PUT':
          answer = updateUser(userId ,parseRequest(body));
          break;
        default:
          break;
      }
    }

    res.writeHead(answer.statusCode, { 'Content-Type': 'text/json' });
    res.end(answer.message);
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Listening on 127.0.0.1:${PORT}`);
});
