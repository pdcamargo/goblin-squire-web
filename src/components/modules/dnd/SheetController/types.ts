import { Character } from '~/interfaces/dnd';

export type SheetControllerPropsType = {
  updateCharacter: (characterId: string, newValues: Partial<Character>) => void;
};
