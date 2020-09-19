import React, { useCallback, useContext } from 'react';

import { SplashScreen } from '~/components';
import { Character } from '~/interfaces/dnd';

import DndContext from './context';
import { DndProviderPropsType } from './types';

const DndProvider: React.FC<DndProviderPropsType> = ({
  database,
  children,
}) => {
  const isProficientWithSkill = useCallback(
    (character: Character, skillIndex: string) => {
      return character.skills.find((s) => s.skill === skillIndex).proficient;
    },
    []
  );

  const isProficientWithSaveThrow = useCallback(
    (character: Character, saveIndex: string) => {
      return character.savingThrows.find((s) => s.ability_score === saveIndex)
        .proficient;
    },
    []
  );

  const getProficiencyBonus = useCallback((level: number) => {
    return Math.ceil(level / 4) + 1;
  }, []);

  const getAttributeModifier = useCallback((value: number) => {
    return Math.floor((value - 10) / 2);
  }, []);

  const getSavingThrow = useCallback(
    (character: Character, saveIndex: string) => {
      const ability = character.abilityScores.find(
        (s) => s.ability_score === saveIndex
      );

      const saving = character.savingThrows.find(
        (s) => s.ability_score === saveIndex
      );

      const mod = getAttributeModifier(ability.value);

      const proficiencyBonus = saving.proficient
        ? getProficiencyBonus(character.level)
        : 0;

      return proficiencyBonus + mod;
    },
    [getAttributeModifier, getProficiencyBonus]
  );

  const getSkill = useCallback(
    (character: Character, skillIndex: string) => {
      const skill = character.skills.find((s) => s.skill === skillIndex);

      const defaultAbilityScore = database.skills.find(
        (s) => s.index === skillIndex
      ).ability_score.index;

      const checkScore = skill.ability_score
        ? skill.ability_score
        : defaultAbilityScore;

      const ability = character.abilityScores.find(
        (score) => score.ability_score === checkScore
      );

      const mod = getAttributeModifier(ability.value);

      const proficiencyBonus = skill.proficient
        ? getProficiencyBonus(character.level)
        : 0;

      return proficiencyBonus + mod;
    },
    [database, getAttributeModifier, getProficiencyBonus]
  );

  if (!database) {
    return <SplashScreen />;
  }

  return (
    <DndContext.Provider
      value={{
        isProficientWithSkill,
        isProficientWithSaveThrow,
        getAttributeModifier,
        getSavingThrow,
        getProficiencyBonus,
        getSkill,
        database,
      }}
    >
      {children}
    </DndContext.Provider>
  );
};

export function useDnd() {
  return useContext(DndContext);
}

export default DndProvider;
