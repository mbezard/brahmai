export type FunctionName =
  | "lsFunction"
  | "catFunction"
  | "readNotionPageFunction"
  | "writeNotionPageFunction";

export const isFunctionName = (value: string): value is FunctionName =>
  [
    "lsFunction",
    "catFunction",
    "readNotionPageFunction",
    "writeNotionPageFunction",
  ].includes(value);
