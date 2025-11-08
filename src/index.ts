import dotenv from 'dotenv';
import { createServer } from 'node:http';
import { isValidUrl } from './utils/utils';

dotenv.config();

const PORT = process.env.PORT ? Number.parseInt(process.env.PORT) : 3000;

const server = createServer((req, res) => {
  const { method, url } = req;

  if (method && url && isValidUrl(method, url)) {
    console.log(method, url);
  }

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!\n');
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Listening on 127.0.0.1:${PORT}`);
});
