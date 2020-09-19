import React from 'react';

import { useScript } from '~/hooks';

import { ScriptPropstype } from './types';

const Script: React.FC<ScriptPropstype> = ({ src }) => {
  useScript(src);

  return <></>;
};

export default Script;
