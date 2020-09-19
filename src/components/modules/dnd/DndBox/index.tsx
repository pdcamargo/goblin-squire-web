import React from 'react';

import { Box, Text } from '@chakra-ui/core';

import savesBg from '../../../../assets/dnd/saves.svg';
import vitalBoxBg from '../../../../assets/dnd/vital-box.svg';
import { DndBoxPropsType } from './types';

const bg = {
  a: savesBg,
  b: vitalBoxBg,
};

const DndBox: React.FC<DndBoxPropsType> = ({
  children,
  bottomText,
  bgType = 'a',
  ...props
}) => {
  return (
    <Box
      position="relative"
      w="240px"
      h="auto"
      pb="25px"
      pt="3px"
      px="10px"
      border="10px solid black"
      color="gray.700"
      backgroundColor="white"
      borderRadius="25px"
      fontWeight="500"
      {...props}
      style={{
        position: 'relative',
        boxSizing: 'border-box',
        borderImageSource: `url(${bg[bgType]})`,
        borderImageSlice: bgType === 'a' ? '65 10' : '15 15',
        borderImageWidth: 'auto',
        borderStyle: 'solid',
      }}
    >
      {children}

      {bottomText && (
        <Text
          w="100%"
          left="0"
          bottom="1px"
          textAlign="center"
          textTransform="uppercase"
          position="absolute"
          fontSize="xs"
          fontWeight="bold"
        >
          {bottomText}
        </Text>
      )}
    </Box>
  );
};

export default DndBox;
