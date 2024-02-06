// function1/base => function1_base
export function filePathToName(filePath: string, timestamp: number) {
  return filePath.replaceAll('/', '_') + '-' + timestampToName(timestamp);
}

export function timestampToName(timestamp: number) {
  return String(timestamp).replace('.', '_');
}
