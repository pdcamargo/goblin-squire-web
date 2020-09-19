import { Socket } from 'socket.io-client';

export type SocketContextType = {
  socket: typeof Socket;
};
