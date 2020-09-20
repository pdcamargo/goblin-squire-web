import React, { useCallback, useContext, useEffect, useState } from 'react';

import { Box } from '@chakra-ui/core';

import { Grid } from '~/components/modules/editor';

import DiceContext from './context';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let $t: any;

const DiceProvider: React.FC = ({ children }) => {
  const [box, setBox] = useState(null);

  useEffect(() => {
    const canvas = $t.id('canvas') as HTMLDivElement;

    setBox(
      // eslint-disable-next-line new-cap
      new $t.dice.dice_box(canvas, {
        w: window.innerWidth - 270,
        h: window.innerHeight,
      })
    );
    $t.dice.use_true_random = false;
  }, []);

  const roll = useCallback(
    async (dice: string, bonus: number = 0) => {
      function notationGetter() {
        return $t.dice.parse_notation(dice);
      }

      function beforeRoll(vectors, notation, callback) {
        callback();
      }

      function afterRoll(notation, result: number[]) {
        const sum = result.reduce((a, b) => a + b, 0);
      }

      box.rolling = false;

      box.start_throw(notationGetter, beforeRoll, afterRoll);
    },
    [box]
  );

  return (
    <>
      <DiceContext.Provider
        value={{
          roll,
        }}
      >
        {children}
      </DiceContext.Provider>
      <Grid />
      <Box
        id="canvas"
        position="absolute"
        left="0"
        top="0"
        w="100%"
        h="100%"
        onClick={() => box.clear()}
      />
    </>
  );
};

export function useDice() {
  return useContext(DiceContext);
}

export default DiceProvider;
