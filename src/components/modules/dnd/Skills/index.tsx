import React from 'react';

import { Text, Flex, Checkbox, Stack } from '@chakra-ui/core';

import { useDice } from '~/contexts/DiceProvider';
import { useDnd } from '~/contexts/DndProvider';

import DndBox from '../DndBox';
import { useDndSheet } from '../Sheet/hooks';
import { SkillPropsType } from './types';

const Skills: React.FC = () => {
  const {
    database: { skills },
  } = useDnd();

  return (
    <DndBox bottomText="Skills">
      <Stack spacing={1}>
        {skills.map((skill) => (
          <Skill
            key={skill.index}
            index={skill.index}
            name={skill.name}
            abilityScore={skill.ability_score.name}
          />
        ))}
      </Stack>
    </DndBox>
  );
};

const Skill: React.FC<SkillPropsType> = ({ name, abilityScore, index }) => {
  const { getSkill, isProficientWithSkill } = useDnd();
  const { character } = useDndSheet();
  const { roll } = useDice();
  const skillBonus = getSkill(character, index);

  return (
    <Flex direction="row" alignItems="center" justify="flex-start">
      <Checkbox
        borderColor="gray.700"
        colorScheme="gray"
        isChecked={isProficientWithSkill(character, index)}
      />
      <Text ml={3} fontSize="sm">
        {skillBonus}
      </Text>
      <Text
        ml={3}
        fontSize="sm"
        cursor="pointer"
        _hover={{ color: 'red.500' }}
        // onClick={() => roll(`1d20 ${skillBonus >= 0 ? '+' : ''} ${skillBonus}`)}
        onClick={() => roll('1d20', skillBonus)}
      >
        {name}
      </Text>
      <Text ml={1} fontSize="xs" color="gray.400">
        ({abilityScore})
      </Text>
    </Flex>
  );
};

export default Skills;
