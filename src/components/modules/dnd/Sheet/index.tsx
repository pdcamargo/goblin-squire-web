import React from 'react';

import {
  Box,
  Flex,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/core';

import { useDice } from '~/contexts/DiceProvider';
import { useEditor } from '~/contexts/EditorProvider/hooks';

import vitals from '../../../../assets/dnd/vitals.svg';
import ArmorClass from '../ArmorClass';
import AttributeList from '../AttributeList';
import CharacterBio from '../CharacterBio';
import DeathSaves from '../DeathSaves';
import HitDice from '../HitDice';
import HitPoints from '../HitPoints';
import Initiative from '../Initiative';
import SavingThrows from '../SavingThrows';
import Skills from '../Skills';
import Speed from '../Speed';
import DndSheetContext from './context';
import { SheetPropsType } from './types';

const Sheet: React.FC<SheetPropsType> = ({ character, updateCharacter }) => {
  const { roll } = useDice();
  const { closeSheet } = useEditor();

  return (
    <Modal
      isOpen
      onClose={() => closeSheet(character.id)}
      isCentered
      scrollBehavior="inside"
    >
      <ModalOverlay zIndex={2}>
        <ModalContent maxWidth="1080px">
          <ModalCloseButton />
          <ModalBody padding={1} bg="gray.800">
            <DndSheetContext.Provider value={{ character, updateCharacter }}>
              <Box w="100%" bg="white" padding={5}>
                <CharacterBio />
                <Stack isInline color="gray.700" spacing={5} padding={3}>
                  <AttributeList />
                  <Stack spacing={3}>
                    <SavingThrows />
                    <Skills />
                  </Stack>

                  <Box>
                    <Stack
                      spacing={3}
                      backgroundImage={`url(${vitals})`}
                      backgroundRepeat="no-repeat"
                      backgroundSize="cover"
                      padding={3}
                    >
                      <Stack
                        isInline
                        spacing={3}
                        onClick={() => roll('2d20 + 2d6 + 1d4 + 3d10')}
                      >
                        <ArmorClass />

                        <Initiative />

                        <Speed />
                      </Stack>

                      <Stack spacing={3}>
                        <HitPoints />

                        <Flex flexDirection="row">
                          <HitDice />
                          <DeathSaves />
                        </Flex>
                      </Stack>
                    </Stack>
                    Hello
                  </Box>
                </Stack>
              </Box>
            </DndSheetContext.Provider>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default Sheet;
