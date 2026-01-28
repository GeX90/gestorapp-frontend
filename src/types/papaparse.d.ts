declare module 'papaparse' {
  export function unparse(data: any[], config?: any): string;
  export function parse(input: string | File, config?: any): any;
}
