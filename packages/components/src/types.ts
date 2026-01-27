import type { kdsSizes } from "./constants";

export type KdsSize = (typeof kdsSizes)[number];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PrefixKeys<T, Prefix extends string> = T extends any
  ? {
      [K in keyof T as K extends string
        ? `${Prefix}${Capitalize<K>}`
        : K]: T[K];
    }
  : never;

export type TypeAsNever<T> = {
  [K in keyof T]?: never;
};
