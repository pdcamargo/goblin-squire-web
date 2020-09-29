import React from 'react';

import { Checkbox, Flex, Text } from '@chakra-ui/core';

import { useDice } from '~/contexts/DiceProvider';
import { useDnd } from '~/contexts/DndProvider';
import { useEditor } from '~/contexts/EditorProvider/hooks';
import { useEmitEvent } from '~/contexts/SocketProvider';
import { Character } from '~/interfaces/dnd';

import DndBox from '../DndBox';
import { useDndSheet } from '../Sheet/hooks';
import { SavePropsType } from './types';

const Save: React.FC<SavePropsType> = ({ name, index }) => {
  const { tableInformation } = useEditor();
  const { getSavingThrow, isProficientWithSaveThrow } = useDnd();
  const { character, updateCharacter } = useDndSheet();
  const { roll } = useDice();
  const saveBonus = getSavingThrow(character, index);

  const changeCharacter = useEmitEvent<{
    newValues: Partial<Character>;
    tableId: string;
    characterId: string;
  }>('updateCharacter');

  const handleChangeIsProficient = (isProficient: boolean) => {
    const saveIndex = character.savingThrows.findIndex(
      (save) => save.ability_score === index
    );
    const saveCopy = character.savingThrows[saveIndex];

    saveCopy.proficient = isProficient;

    const characterSavingThrows = character.savingThrows.slice();
    characterSavingThrows[saveIndex] = saveCopy;

    const newValues = {
      savingThrows: characterSavingThrows,
    };

    changeCharacter({
      newValues,
      tableId: tableInformation.id,
      characterId: character.id,
    });
    updateCharacter(character.id, newValues);
  };

  return (
    <Flex direction="row" alignItems="center" justify="flex-start">
      <Checkbox
        borderColor="gray.700"
        colorScheme="gray"
        isChecked={isProficientWithSaveThrow(character, index)}
        onChange={(e) => handleChangeIsProficient(e.target.checked)}
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
