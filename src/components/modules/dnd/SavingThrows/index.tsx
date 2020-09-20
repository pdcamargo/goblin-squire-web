import React from 'react';

import { Checkbox, Flex, Text } from '@chakra-ui/core';

import { useDice } from '~/contexts/DiceProvider';
import { useDnd } from '~/contexts/DndProvider';

import DndBox from '../DndBox';
import { useDndSheet } from '../Sheet/hooks';
import { SavePropsType } from './types';

const Save: React.FC<SavePropsType> = ({ name, index }) => {
  const { getSavingThrow, isProficientWithSaveThrow } = useDnd();
  const { character } = useDndSheet();
  const { roll } = useDice();
  const saveBonus = getSavingThrow(character, index);

  return (
    <Flex direction="row" alignItems="center" justify="flex-start">
      <Checkbox
        borderColor="gray.700"
        colorScheme="gray"
        isChecked={isProficientWithSaveThrow(character, index)}
      />
      <Text ml={3}>{saveBonus}</Text>
      <Text
        ml={3}
        fontSize="sm"
        cursor="pointer"
        _hover={{ color: 'red.500' }}
        onClick={() => roll('1d20', saveBonus)}
      >
        {name}
      </Text>
    </Flex>
  );
};

const SavingThrows: React.FC = () => {
  const { database } = useDnd();
  const abilityScores = database['ability-scores'];

  return (
    <DndBox color="gray.800" bottomText="Saving Throws">
      {abilityScores.map((attr) => (
        <Save key={attr.index} name={attr.full_name} index={attr.index} />
      ))}
    </DndBox>
  );
};

export default SavingThrows;
