import React from 'react';

import { useEditor } from '~/contexts/EditorProvider/hooks';

import Sheet from '../Sheet';
import { SheetControllerPropsType } from './types';

const SheetController: React.FC<SheetControllerPropsType> = ({
  updateCharacter,
}) => {
  const { characters, isSheetOpen } = useEditor();

  return (
    <>
      {characters.map((c) => {
        const sheetIsOpen = isSheetOpen(c.id);

        return (
          sheetIsOpen && (
            <Sheet key={c.id} character={c} updateCharacter={updateCharacter} />
          )
        );
      })}
    </>
  );
};

export default SheetController;
