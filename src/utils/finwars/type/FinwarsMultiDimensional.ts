import type { FinwarsEffect } from "../abstract/FinwarsEffect";

export type FinwarsMultiDimensional<
  T = FinwarsEffect | number | boolean | null | undefined,
> = T | FinwarsMultiDimensional<T>[];
export type FinwarsSerialized =
  | { v: FinwarsSerialized; e: FinwarsSerialized[]; n: string }
  | FinwarsSerialized[]
  | number
  | boolean
  | null
  | undefined;
