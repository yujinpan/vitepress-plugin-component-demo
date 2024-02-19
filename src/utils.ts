// function1/base => function1_base
export function filePathToName(filePath: string) {
  return filePath.replaceAll('/', '_');
}

export const getDemoComponentName = (name: string) => {
  return `component_${toModuleName(name)}`;
};

export const getDemoCodeName = (name: string) => {
  return `code_${toModuleName(name)}`;
};

function toModuleName(name: string) {
  return name.replace(/[/-]/g, '_');
}
