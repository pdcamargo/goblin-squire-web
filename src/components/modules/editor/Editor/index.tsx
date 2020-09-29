import React, { useCallback } from 'react';
import { BsTrash } from 'react-icons/bs';

import {
  Box,
  Button,
  Heading,
  IconButton,
  List,
  ListItem,
  Stack,
} from '@chakra-ui/core';

import { DiceProvider } from '~/contexts';
import { useEditor } from '~/contexts/EditorProvider/hooks';
import { useEmitEvent } from '~/contexts/SocketProvider';

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
            key={u.id}
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
  const { characters, openSheet, isSheetOpen, tableInformation } = useEditor();

  const createCharacter = useEmitEvent<{ tableId: string }>('createCharacter');

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
      w="270px"
      h="100vh"
      pos="relative"
      py={3}
      bg="gray.700"
      color="white"
      borderLeft="1px solid #dddddd"
    >
      <List>
        <Stack spacing={1}>
          {characters.map((c) => (
            <ListItem
              key={c.id}
              onClick={() => openCharacter(c.id)}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              px={4}
              py={2}
              borderTop="solid 1px"
              borderBottom="solid 1px"
              borderColor="gray.900"
              cursor="pointer"
              _hover={{
                bg: 'gray.800',
              }}
            >
              <Heading w="100%" size="xs" ml={2}>
                {c.bio.name}
              </Heading>
              <IconButton
                aria-label="Delete character"
                icon={<BsTrash />}
                size="sm"
                isRound
                colorScheme="red"
              />
            </ListItem>
          ))}
        </Stack>
      </List>

      <Button
        bg="red.400"
        mt={3}
        onClick={() => createCharacter({ tableId: tableInformation.id })}
      >
        Create character
      </Button>
    </Box>
  );
};

export default Editor;
