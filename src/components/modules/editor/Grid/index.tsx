import React from 'react';
import { Stage } from 'react-konva';

import { Box } from '@chakra-ui/core';

import { useWindowSize } from '~/hooks';

import GridLayer from '../GridLayer';

const Grid: React.FC = () => {
  const { height, width } = useWindowSize(1920, 1080);

  return (
    <Box w="100%" h="100%" id="editorGrid" position="relative">
      <Stage width={width - 270} height={height}>
        <GridLayer />
      </Stage>
    </Box>
  );
};

export default Grid;
