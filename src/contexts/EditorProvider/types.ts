import { Character, DndUser, TableInformation } from '~/interfaces/dnd';

export type EditorProviderPropsType = {
  characters: Character[];
  users: DndUser[];
  tableInformation: TableInformation;
};

export type EditorContextType = EditorProviderPropsType & {
  openedSheets: string[];
  closeSheet: (id: string) => void;
  openSheet: (id: string) => void;
  isSheetOpen: (id: string) => boolean;
};
