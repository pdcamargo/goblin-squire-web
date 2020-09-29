import React, { useCallback, useContext, useEffect, useState } from 'react';

import io, { Socket } from 'socket.io-client';

import SocketContext from './context';

const uri = process.env.NEXT_PUBLIC_API_URL || 'https://api.goblinsquire.com';

// eslint-disable-next-line no-console
console.log(`socket url ${uri}`);

const SocketProvider: React.FC = ({ children }) => {
  const [socket, setSocket] = useState<typeof Socket>(null);

  useEffect(() => {
    const newSocket = io.connect(uri);

    setSocket(newSocket);

    return () => {
      return newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {Boolean(socket) && children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error('useSocket must only be used inside of Socket Provider');
  }

  return context.socket;
};

export function useEmitEvent<T = unknown>(eventName: string) {
  const socket = useSocket();

  return useCallback(
    (data: T) => {
      data && socket.emit(eventName, data);
    },
    [socket, eventName]
  );
}

export function useOnEvent<TData = unknown>(
  eventName: string | undefined,
  callback: (data: TData) => void
) {
  const socket = useSocket();

  useEffect(() => {
    if (eventName) {
      socket.on(eventName, (data: TData) => {
        callback(data);
      });
    }
  }, [socket, eventName, callback]);
}

export default SocketProvider;
