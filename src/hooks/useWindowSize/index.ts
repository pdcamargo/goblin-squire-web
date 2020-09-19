import { useEffect, useState } from 'react';

import useEventListener from '../useEventListener';
import useIsClient from '../useIsClient';

export default function useWindowSize(
  initialWidth?: number,
  initialHeight?: number
) {
  const isClient = useIsClient();

  const [windowSize, setWindowSize] = useState({
    width: isClient ? window.innerWidth : initialWidth,
    height: isClient ? window.innerHeight : initialHeight,
  });

  useEventListener('resize', () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  });

  useEffect(() => {
    if (isClient) {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
  }, [isClient]);

  return windowSize;
}
