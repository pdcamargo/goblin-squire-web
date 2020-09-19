import React, { useCallback, useContext, useEffect, useState } from 'react';

import io from 'socket.io-client';

import SocketContext from './context';

const uri = 'http://localhost:3001';

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

export function useEmitEvent(eventName: string) {
  return useCallback(
    (data: any) => {
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