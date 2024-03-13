/// <reference types="vite/client" />

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

export const handleDemoCodeHotUpdate = async (
  name: string,
  callback: (code: string) => void,
) => {
  if (import.meta.hot) {
    import.meta.hot.on('update:demo-code', (event) => {
      const componentName = filePathToName(name);
      if (event.componentName === componentName) {
        callback(event.code);
      }
    });
  }
};
