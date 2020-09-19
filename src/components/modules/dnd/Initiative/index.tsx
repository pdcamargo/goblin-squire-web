import React from 'react';

import { Text } from '@chakra-ui/core';

import DndBox from '../DndBox';

const Initiative: React.FC = () => {
  return (
    <DndBox
      w="84px"
      h="96px"
      px="12px"
      pt="8px"
      pb="30px"
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="space-between"
      bgType="b"
    >
      <Text fontSize="3xl">7</Text>

      <Text lineHeight={1} textAlign="center" fontSize="xs">
        Initiative
      </Text>
    </DndBox>
  );
};

export default Initiative;
