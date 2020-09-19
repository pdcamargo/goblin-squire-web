import React from 'react';

import { Text } from '@chakra-ui/core';

import DndBox from '../DndBox';

const HitDice: React.FC = () => {
  return (
    <DndBox bgType="b" bottomText="Hit Dice" height="92px" width="40%" mr={1}>
      <Text textAlign="center" fontSize="2xl">
        1d6
      </Text>
    </DndBox>
  );
};

export default HitDice;
