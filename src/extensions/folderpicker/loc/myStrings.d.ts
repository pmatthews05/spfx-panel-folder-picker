declare interface IFolderpickerCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'FolderpickerCommandSetStrings' {
  const strings: IFolderpickerCommandSetStrings;
  export = strings;
}
