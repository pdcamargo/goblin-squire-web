import React, { useCallback, useEffect } from 'react';

import io from 'socket.io-client';

import SocketContext from './context';

const uri = process.env.NEXT_PUBLIC_API_URL;

// eslint-disable-next-line no-console
console.log(`socket url ${uri}`);

const socket = io.connect(uri);

const SocketProvider: React.FC = ({ children }) => {
  useEffect(() => {
    return () => {
      return socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return socket;
};

export function useEmitEvent<T = unknown>(eventName: string) {
  return useCallback(
    (data: T) => {
      socket.emit(eventName, data);
    },
    [eventName]
  );
}

export function useOnEvent<TData = unknown>(
  eventName: string | undefined,
  callback: (data: TData) => void
) {
  useEffect(() => {
    if (eventName) {
      socket.on(eventName, (data: TData) => {
        callback(data);
      });
    }
  }, [eventName, callback]);
}

export default SocketProvider;
