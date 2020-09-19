import React, { useMemo } from 'react';

import { Box, useColorMode } from '@chakra-ui/core';

import ToggleColorMode from '../ToggleColorMode';
import { getNavbarBoxProps } from './helpers';

const Navbar: React.FC = ({ children }) => {
  const { colorMode } = useColorMode();

  const boxProps = useMemo(() => {
    return getNavbarBoxProps(colorMode);
  }, [colorMode]);

  return (
    <Box
      width="100%"
      minHeight="60px"
      display="flex"
      alignItems="center"
      flexDirection="row"
      {...boxProps}
    >
      {children}

      <ToggleColorMode />
    </Box>
  );
};

export default Navbar;
