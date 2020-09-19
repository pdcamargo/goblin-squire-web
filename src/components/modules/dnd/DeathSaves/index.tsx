import React from 'react';

import { Checkbox, Flex, Stack, Text } from '@chakra-ui/core';

import DndBox from '../DndBox';

const Saves: React.FC = () => {
  return (
    <Stack isInline spacing={1}>
      <Checkbox colorScheme="red" borderColor="gray.700" />
      <Checkbox colorScheme="red" borderColor="gray.700" />
      <Checkbox colorScheme="red" borderColor="gray.700" />
    </Stack>
  );
};

const DeathSaves: React.FC = () => {
  return (
    <DndBox
      bgType="b"
      bottomText="Death Saves"
      height="92px"
      width="60%"
      ml={1}
    >
      <Stack spacing={1}>
        <Flex alignItems="center" flexDirection="row">
          <Text width="65px" fontSize="xs">
            Successes
          </Text>
          <Saves />
        </Flex>
        <Flex alignItems="center" flexDirection="row">
          <Text width="65px" fontSize="xs">
            Failures
          </Text>
          <Saves />
        </Flex>
      </Stack>
    </DndBox>
  );
};

export default DeathSaves;
