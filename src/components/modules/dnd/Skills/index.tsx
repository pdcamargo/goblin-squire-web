import React from 'react';

import { Text, Flex, Checkbox, Stack } from '@chakra-ui/core';

import { useDice } from '~/contexts/DiceProvider';
import { useDnd } from '~/contexts/DndProvider';
import { useEditor } from '~/contexts/EditorProvider/hooks';
import { useEmitEvent } from '~/contexts/SocketProvider';
import { Character } from '~/interfaces/dnd';

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
  const { character, updateCharacter } = useDndSheet();
  const { tableInformation } = useEditor();
  const { roll } = useDice();
  const skillBonus = getSkill(character, index);

  const changeCharacter = useEmitEvent<{
    newValues: Partial<Character>;
    tableId: string;
    characterId: string;
  }>('updateCharacter');

  const handleChangeIsProficient = (isProficient: boolean) => {
    const skillIndex = character.skills.findIndex(
      (skill) => skill.skill === index
    );
    const skillCopy = character.skills[skillIndex];

    skillCopy.proficient = isProficient;

    const characterSkills = character.skills.slice();
    characterSkills[skillIndex] = skillCopy;

    const newValues = {
      skills: characterSkills,
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
        isChecked={isProficientWithSkill(character, index)}
        onChange={(e) => handleChangeIsProficient(e.target.checked)}
      />
      <Text ml={3} fontSize="sm">
        {skillBonus}
      </Text>
      <Text
        ml={3}
        fontSize="sm"
        cursor="pointer"
        _hover={{ color: 'red.500' }}
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
