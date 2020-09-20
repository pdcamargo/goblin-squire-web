import React, { useCallback, useState } from 'react';

import { Editor } from '~/components/modules/editor';

import EditorContext from './context';
import { EditorProviderPropsType } from './types';

const EditorProvider: React.FC<EditorProviderPropsType> = ({
  children,
  characters,
  users,
}) => {
  const [openedSheets, setOpenedSheets] = useState<string[]>([]);

  const openSheet = useCallback((id: string) => {
    setOpenedSheets((prev) => {
      const copy = prev.slice();
      copy.push(id);

      return copy;
    });
  }, []);

  const closeSheet = useCallback((id: string) => {
    setOpenedSheets((prev) =>
      prev.slice().filter((characterId) => characterId !== id)
    );
  }, []);

  const isSheetOpen = useCallback(
    (id: string) => openedSheets.slice().includes(id),
    [openedSheets]
  );

  return (
    <EditorContext.Provider
      value={{
        characters,
        users,
        openSheet,
        closeSheet,
        openedSheets,
        isSheetOpen,
      }}
    >
      <Editor>{children}</Editor>
    </EditorContext.Provider>
  );
};

export default EditorProvider;
