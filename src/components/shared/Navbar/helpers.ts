import { BoxProps } from '@chakra-ui/core';

import { ColorMode } from '~/interfaces';

export const getNavbarBoxProps = (color: ColorMode) => {
  const colors: Record<ColorMode, BoxProps> = {
    dark: {
      backgroundColor: 'gray.50',
    },
    light: {
      backgroundColor: 'gray.700',
    },
  };

  return {
    ...colors[color],
    boxShadow: '0 0 13px 0 rgba(82,63,105,.05)',
  };
};
