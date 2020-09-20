import { useContext } from 'react';

import DndSheetContext from './context';

export function useDndSheet() {
  const context = useContext(DndSheetContext);

  return context;
}
