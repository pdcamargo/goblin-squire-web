import { Character, DndDatabase, DndUser } from '~/interfaces/dnd';

export type DndContextType = {
  isProficientWithSkill: (character: Character, skillIndex: string) => boolean;
  isProficientWithSaveThrow: (
    character: Character,
    saveIndex: string
  ) => boolean;
  getAttributeModifier: (value: number) => number;
  getSavingThrow: (character: Character, saveIndex: string) => number;
  getProficiencyBonus: (level: number) => number;
  getSkill: (character: Character, skillIndex: string) => number;
  database: DndDatabase;
};

export type DndProviderPropsType = {
  database: DndDatabase;
};
