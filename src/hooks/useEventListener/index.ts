import { useRef, useEffect } from 'react';

import { UseEventListener } from './types';

const isClient = typeof window !== 'undefined';

export default function useEventListener(
  eventName: UseEventListener['eventName'],
  handler: UseEventListener['handler'],
  element: UseEventListener['element'] = isClient ? window : undefined
) {
  const savedHandler = useRef<UseEventListener['handler']>(null);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    // Make sure element supports addEventListener
    // On
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    const eventListener = (event: Event) => savedHandler.current(event);
    element.addEventListener(eventName, eventListener);

    // eslint-disable-next-line consistent-return
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}
