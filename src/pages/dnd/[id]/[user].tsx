import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/dist/client/router';

import { Sheet } from '~/components/modules/dnd';
import { Editor } from '~/components/modules/editor';
import { DndProvider, EditorProvider, SocketProvider } from '~/contexts';
import { useEmitEvent, useOnEvent } from '~/contexts/SocketProvider';
import { Character, DndDatabase, DndUser, DndTable } from '~/interfaces/dnd';

const Dnd: React.FC = () => {
  const [database, setDatabase] = useState<DndDatabase>(null);
  const [users, setUsers] = useState<DndUser[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);

  const startTable = useEmitEvent('startTable');

  const {
    query: { id, user },
  } = useRouter();

  useOnEvent(id ? `setupTable:${id}` : undefined, (table: DndTable) => {
    setDatabase(table.database);
    setUsers(table.users);
    setCharacters(table.characters);
  });

  useOnEvent('currentUsers', (newUsers: DndUser[]) => {
    setUsers(newUsers);
  });

  useOnEvent('characters', (chars: Character[]) => {
    setCharacters(chars);

    console.log(chars);
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
    <SocketProvider>
      <EditorProvider characters={characters} users={users}>
        <DndProvider database={database}>
          {characters.map((c) => (
            <Sheet key={c.userId} character={c} />
          ))}
        </DndProvider>
      </EditorProvider>
    </SocketProvider>
  );
};

export default Dnd;
