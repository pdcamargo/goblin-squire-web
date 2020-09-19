import { Character, DndUser } from '~/interfaces/dnd';

export type EditorProviderPropsType = {
  characters: Character[];
  users: DndUser[];
};

export type EditorContextType = EditorProviderPropsType & {
  openedSheets: string[];
  closeSheet: (id: string) => void;
  openSheet: (id: string) => void;
  isSheetOpen: (id: string) => boolean;
};
