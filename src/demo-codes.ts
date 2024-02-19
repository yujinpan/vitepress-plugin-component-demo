// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as demo from 'virtual:demo';

import { filePathToName, getDemoCodeName, getDemoComponentName } from './utils';

// function1/base => { code: '<div>...</div>', component: {} }
export const getDemo = async (
  name: string,
): Promise<{
  code: string;
  component: any;
}> => {
  const componentName = filePathToName(name);
  return Promise.all([
    demo[getDemoComponentName(componentName)](),
    demo[getDemoCodeName(componentName)](),
  ]).then(([component, code]) => ({
    component: component.default,
    code: code.default,
  }));
};
