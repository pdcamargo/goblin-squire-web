import { BoxProps } from '@chakra-ui/core';

export type DndBoxPropsType = BoxProps & {
  bottomText?: string;
  bgType?: 'a' | 'b';
};
