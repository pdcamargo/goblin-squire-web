import React from 'react';

import MotionBox from '../MotionBox';
import { MotionBoxPropsType } from '../MotionBox/types';

const FadeInBox: React.FC<MotionBoxPropsType> = ({ children, ...props }) => {
  return (
    <MotionBox
      initial="initial"
      animate="animate"
      variants={{
        initial: {
          opacity: 0,
        },
        animate: {
          opacity: 1,
        },
      }}
      {...props}
    >
      {children}
    </MotionBox>
  );
};

export default FadeInBox;
