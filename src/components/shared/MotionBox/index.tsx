import React from 'react';

import { Box } from '@chakra-ui/core';

import { motion } from 'framer-motion';

import { MotionBoxPropsType } from './types';

const MotionBoxCustom = motion.custom(Box);

const MotionBox: React.FC<MotionBoxPropsType> = ({ children, ...props }) => {
  return <MotionBoxCustom {...props}>{children}</MotionBoxCustom>;
};

export default MotionBox;
