import React from 'react';

import { Box, Stack, Text } from '@chakra-ui/core';

import { useDnd } from '~/contexts/DndProvider';

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
  const { character } = useDndSheet();

  const attr = character.abilityScores.find((a) => a.ability_score === index);
  const mod = getAttributeModifier(attr.value);

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
      <Text fontWeight="bold" fontSize="xs">
        {name}
      </Text>
      <Text fontWeight="bolder" fontSize="3xl" position="relative" top="-5px">
        {mod}
      </Text>
      <Box>{attr.value}</Box>
    </Box>
  );
};

export default AttributeList;
