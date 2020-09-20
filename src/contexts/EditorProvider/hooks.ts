import { useContext } from 'react';

import EditorContext from './context';

export function useEditor() {
  return useContext(EditorContext);
}
