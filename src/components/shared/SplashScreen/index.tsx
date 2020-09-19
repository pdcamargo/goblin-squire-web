import React from 'react';

import { Box, Spinner } from '@chakra-ui/core';

const SplashScreen: React.FC = () => {
  return (
    <Box
      w="100%"
      h="100%"
      position="fixed"
      left="0"
      top="0"
      bg="gray.300"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Spinner />
    </Box>
  );
};

export default SplashScreen;
