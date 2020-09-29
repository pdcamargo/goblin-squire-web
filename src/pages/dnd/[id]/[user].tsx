import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/dist/client/router';

import { SheetController } from '~/components/modules/dnd';
import { DndProvider, EditorProvider } from '~/contexts';
import { useEmitEvent, useOnEvent } from '~/contexts/SocketProvider';
import {
  Character,
  DndDatabase,
  DndUser,
  DndTable,
  TableInformation,
} from '~/interfaces/dnd';

const Dnd: React.FC = () => {
  const [database, setDatabase] = useState<DndDatabase>(null);
  const [users, setUsers] = useState<DndUser[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [tableInformation, setTableÌnformation] = useState<TableInformation>(
    null
  );

  const startTable = useEmitEvent('startTable');

  const {
    query: { id, user },
  } = useRouter();

  const updateCharacter = (
    characterId: string,
    newValues: Partial<Character>
  ) => {
    const charCopy = characters.slice();

    const copyCharIndex = charCopy.findIndex((char) => char.id === characterId);
    let copyChar = charCopy[copyCharIndex];

    copyChar = { ...copyChar, ...newValues };

    charCopy[copyCharIndex] = copyChar;

    setCharacters(charCopy);
  };

  useOnEvent(id ? `setupTable:${id}` : undefined, (table: DndTable) => {
    const {
      characters: tableCharacters,
      database: tableDatabase,
      users: tableUsers,
      ...tableInfo
    } = table;
    setDatabase(tableDatabase);
    setUsers(tableUsers);
    setCharacters(tableCharacters);
    setTableÌnformation(tableInfo);
  });

  useOnEvent('currentUsers', (newUsers: DndUser[]) => {
    setUsers(newUsers);
  });

  useOnEvent('currentCharacters', (chars: Character[]) => {
    setCharacters(chars);
  });

  useEffect(() => {
    if (id && user) {
      startTable({
        tableId: id,
        userId: user,
      });
    }
  }, [id, startTable, user]);

  return (
    <EditorProvider
      characters={characters}
      users={users}
      tableInformation={tableInformation}
    >
      <DndProvider database={database}>
        <SheetController updateCharacter={updateCharacter} />
      </DndProvider>
    </EditorProvider>
  );
};

export default Dnd;
