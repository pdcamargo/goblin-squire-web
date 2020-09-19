import React from 'react';

import { Box, Text } from '@chakra-ui/core';

import ac from '../../../../assets/dnd/ac.svg';

const ArmorClass: React.FC = () => {
  return (
    <Box
      position="relative"
      w="84px"
      h="96px"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundImage={`url(${ac})`}
      color="gray.700"
      px="12px"
      pt="8px"
      pb="30px"
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="space-between"
      fontWeight="bold"
    >
      <Text fontSize="3xl">20</Text>

      <Text lineHeight={1} textAlign="center" fontSize="xs">
        Armor Class
      </Text>
    </Box>
  );
};

export default ArmorClass;
