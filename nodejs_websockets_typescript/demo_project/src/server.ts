import 'module-alias/register';
import * as WebSocket from 'ws';
import { peng } from '@blub/test';

// express code 
const socketServer = new WebSocket.Server({port: 3030});
peng();
socketServer.on('connection', (socketClient) => {
  console.log('connected');
  console.log('Number of clients: ', socketServer.clients.size);
  socketClient.on('close', (socketClient) => {
    console.log('closed');
    console.log('Number of clients: ', socketServer.clients.size);
  });
});