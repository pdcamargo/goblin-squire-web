import React from 'react';
import { FiSun } from 'react-icons/fi';
import { WiDayCloudyWindy } from 'react-icons/wi';

import { Box, Icon, useColorMode } from '@chakra-ui/core';

import FadeInBox from '../FadeInBox';
import MotionBox from '../MotionBox';
import { getToggleBoxProps } from './helpers';

const ToggleColorMode: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const boxProps = getToggleBoxProps(colorMode);

  const handleClick = () => {
    toggleColorMode();
  };

  return (
    <Box onClick={handleClick} {...boxProps}>
      <MotionBox
        borderRadius="50%"
        height="30px"
        width="30px"
        background="white"
        display="flex"
        alignItems="center"
        justifyContent="center"
        animate={isDark ? 'left' : 'right'}
        variants={{
          left: {
            x: 0,
          },
          right: {
            x: '41px',
          },
        }}
      >
        {isDark && (
          <FadeInBox>
            <Icon color="gray.800" boxSize="22px" as={WiDayCloudyWindy} />
          </FadeInBox>
        )}

        {!isDark && (
          <FadeInBox>
            <Icon color="gray.800" boxSize="22px" as={FiSun} />
          </FadeInBox>
        )}
      </MotionBox>
    </Box>
  );
};

export default ToggleColorMode;
