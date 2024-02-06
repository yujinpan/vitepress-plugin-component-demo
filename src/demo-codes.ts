// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { data } from './demo-codes.data';
import { filePathToName, timestampToName } from './utils';

// function1/base => `<div>...</div>`
export const getDemoCode = (name: string): Promise<string> => {
  return import(
    `./temp/${filePathToName(name)}/${timestampToName(data[name])}.html?raw`
  ).then((res) => res.default);
};
