import React from 'react';

import { Flex, Text } from '@chakra-ui/core';

import DndBox from '../DndBox';

const HitPoints: React.FC = () => {
  return (
    <Flex flexDir="row">
      <DndBox
        width="50%"
        height="95px"
        bgType="b"
        bottomText="Current HP"
        mr={1}
      >
        <Text textAlign="center" fontSize="3xl">
          7
        </Text>
      </DndBox>

      <DndBox
        width="50%"
        height="95px"
        bgType="b"
        bottomText="Temporary HP"
        ml={1}
      >
        <Text textAlign="center" fontSize="3xl">
          7
        </Text>
      </DndBox>
    </Flex>
  );
};

export default HitPoints;
