import { Character } from '~/interfaces/dnd';

export type SheetPropsType = {
  character: Character;
  updateCharacter: (characterId: string, newValues: Partial<Character>) => void;
};

export type DndSheetContextType = SheetPropsType;
