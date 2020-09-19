import React from 'react';

import { ChakraProvider } from '@chakra-ui/core';

import { theme } from '~/config';

const ThemeContainer: React.FC = ({ children }) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      {children}
    </ChakraProvider>
  );
};

export default ThemeContainer;
