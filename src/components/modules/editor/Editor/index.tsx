import React, { useCallback } from 'react';

import { Box, List, ListItem, Stack } from '@chakra-ui/core';

import { DiceProvider } from '~/contexts';
import { useEditor } from '~/contexts/EditorProvider/hooks';

const Editor: React.FC = ({ children }) => {
  return (
    <Box width="100%" height="100%" display="flex" flexDir="row">
      <Box
        position="relative"
        height="100vh"
        flex="1 1 auto"
        id="canvasContainer"
      >
        <Users />
        <DiceProvider>{children}</DiceProvider>
      </Box>
      <Sidebar />
    </Box>
  );
};

const Users: React.FC = () => {
  const { users } = useEditor();

  return (
    <Box
      w="auto"
      border="solid 1px"
      borderColor="gray.500"
      position="absolute"
      right="10px"
      top="10px"
      padding="3px"
      color="gray.700"
      zIndex={1}
    >
      <Stack spacing={1}>
        {users.map((u) => (
          <Box
            key={u.socket}
            boxSize="75px"
            border="solid 1px"
            borderColor="gray.700"
            bg="white"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {u.id}
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

const Sidebar: React.FC = () => {
  const { characters, openSheet, isSheetOpen } = useEditor();

  const openCharacter = useCallback(
    (characterId: string) => {
      if (!isSheetOpen(characterId)) {
        openSheet(characterId);
      }
    },
    [isSheetOpen, openSheet]
  );

  return (
    <Box
      position="relative"
      width="270px"
      height="100vh"
      bg="white"
      color="gray.700"
    >
      <List>
        {characters.map((c) => (
          <ListItem key={Math.random()} onClick={() => openCharacter(c.userId)}>
            {c.bio.name}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Editor;
