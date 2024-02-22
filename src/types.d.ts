declare module 'virtual:demo' {
  type demo = Record<string, () => Promise<any>>;

  export default demo;
}
