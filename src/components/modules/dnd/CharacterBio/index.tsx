import React from 'react';

import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
} from '@chakra-ui/core';

import { useEditor } from '~/contexts/EditorProvider/hooks';
import { useEmitEvent } from '~/contexts/SocketProvider';
import { Character } from '~/interfaces/dnd';

import charBioBg from '../../../../assets/dnd/char-bio.svg';
import charNameBg from '../../../../assets/dnd/char-name.svg';
import scrollRightBg from '../../../../assets/dnd/scroll-right.svg';
import { useDndSheet } from '../Sheet/hooks';

const CharacterBio: React.FC = () => {
  return (
    <Flex
      w="100%"
      h="174px"
      mb={3}
      backgroundImage={`url(${charNameBg})`}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundPosition="-35px center"
    >
      <Name />
      <Bio />
    </Flex>
  );
};

const Name: React.FC = () => {
  const { character, updateCharacter } = useDndSheet();
  const { tableInformation } = useEditor();
  const changeCharacter = useEmitEvent<{
    newValues: Partial<Character>;
    tableId: string;
    characterId: string;
  }>('updateCharacter');

  const handleChangeName = (name: string) => {
    const newValues = {
      bio: {
        ...character.bio,
        name,
      },
    };
    changeCharacter({
      newValues,
      tableId: tableInformation.id,
      characterId: character.id,
    });

    updateCharacter(character.id, newValues);
  };

  return (
    <Box w="408px" h="100%" px="40px" pt="85px">
      <Editable
        defaultValue={`${character?.bio?.name}`}
        onChange={(e) => handleChangeName(e)}
        textAlign="left"
      >
        <EditablePreview padding="0" textAlign="left" />
        <EditableInput textAlign="left" />
      </Editable>
    </Box>
  );
};

const Bio: React.FC = () => {
  return (
    <Box
      flex="1 1 auto"
      h="142px"
      mt="34px"
      mr="30px"
      backgroundImage={`url(${charBioBg})`}
      backgroundRepeat="no-repeat"
      backgroundSize="100%"
      position="relative"
      _after={{
        content: "''",
        width: '30px',
        height: '142px',
        position: 'absolute',
        right: '-25px',
        top: '0',
        backgroundImage: `url(${scrollRightBg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
        backgroundPosition: 'right center',
      }}
    >
      <Box px={4} py={6}>
        Info
      </Box>
    </Box>
  );
};

export default CharacterBio;
