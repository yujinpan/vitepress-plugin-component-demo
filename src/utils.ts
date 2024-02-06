// function1/base => function1_base
export function filePathToName(filePath: string) {
  return filePath.replaceAll('/', '_');
}

export function timestampToName(timestamp: number) {
  return 'file-' + String(timestamp).replace('.', '_');
}
