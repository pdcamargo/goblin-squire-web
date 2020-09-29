import React from 'react';

import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  Stack,
  Text,
} from '@chakra-ui/core';

import { useDice } from '~/contexts/DiceProvider';
import { useDnd } from '~/contexts/DndProvider';
import { useEditor } from '~/contexts/EditorProvider/hooks';
import { useEmitEvent } from '~/contexts/SocketProvider';
import { Character } from '~/interfaces/dnd';

import abilityBackBg from '../../../../assets/dnd/ability-back.svg';
import abilityBg from '../../../../assets/dnd/ability.svg';
import { useDndSheet } from '../Sheet/hooks';
import { AttributePropsType } from './types';

const AttributeList: React.FC = () => {
  const { database } = useDnd();
  const abilityScores = database['ability-scores'];
  return (
    <Box
      position="relative"
      w="88px"
      h="auto"
      py="24px"
      display="flex"
      justifyContent="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundImage={`url(${abilityBackBg})`}
    >
      <Stack spacing={2}>
        {abilityScores.map((attr) => (
          <Attribute
            key={attr.index}
            name={attr.full_name}
            index={attr.index}
          />
        ))}
      </Stack>
    </Box>
  );
};

const Attribute: React.FC<AttributePropsType> = ({ name, index }) => {
  const { getAttributeModifier } = useDnd();
  const { character, updateCharacter } = useDndSheet();
  const { tableInformation } = useEditor();
  const { roll } = useDice();

  const attr = character.abilityScores.find((a) => a.ability_score === index);
  const mod = getAttributeModifier(attr.value);

  const changeCharacter = useEmitEvent<{
    newValues: Partial<Character>;
    tableId: string;
    characterId: string;
  }>('updateCharacter');

  const handleChangeAttribute = (value: string) => {
    const attrCopy = { ...attr, value: value !== '' ? +value : 0 };

    const scoreIndex = character.abilityScores.findIndex(
      (a) => a.ability_score === index
    );

    const abilityScores = character.abilityScores.slice();

    abilityScores[scoreIndex] = attrCopy;

    const newValues = { abilityScores };

    changeCharacter({
      newValues,
      tableId: tableInformation.id,
      characterId: character.id,
    });

    updateCharacter(character.id, newValues);
  };

  return (
    <Box
      position="relative"
      w="84px"
      h="96px"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundImage={`url(${abilityBg})`}
      color="gray.700"
      padding="6px 12px"
      display="flex"
      flexDir="column"
      alignItems="center"
    >
      <Text
        fontWeight="bold"
        fontSize="xs"
        cursor="pointer"
        _hover={{ color: 'red.500' }}
        onClick={() => roll('1d20', mod)}
      >
        {name}
      </Text>
      <Text fontWeight="bolder" fontSize="3xl" position="relative" top="-5px">
        {mod}
      </Text>
      <Box>
        <Editable
          defaultValue={`${attr.value}`}
          w="30px"
          h="25px"
          textAlign="center"
          onChange={(e) => handleChangeAttribute(e)}
        >
          <EditablePreview padding="0" />
          <EditableInput w="30px" h="25px" />
        </Editable>
      </Box>
    </Box>
  );
};

export default AttributeList;
