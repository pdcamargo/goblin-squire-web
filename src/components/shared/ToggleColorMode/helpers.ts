import { BoxProps } from '@chakra-ui/core';

import { ColorMode } from '~/interfaces';

export const getToggleBoxProps = (color: ColorMode): BoxProps => {
  const colors: Record<ColorMode, BoxProps> = {
    dark: {
      backgroundColor: 'blue.700',
    },
    light: {
      backgroundColor: 'blue.300',
    },
  };

  return {
    ...colors[color],
    borderRadius: '16px',
    alignItems: 'center',
    position: 'relative',
    padding: '5px',
    width: '80px',
  };
};
