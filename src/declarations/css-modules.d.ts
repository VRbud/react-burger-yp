// css-modules.d.ts

declare module "*.css" {
  interface IClassNames {
    [styles: string]: string;
  }
  const styles: IClassNames;
  export = styles;
}
