import { FinwarsState } from "../type/FinwarsState";
import type { FinwarsEffect } from "./FinwarsEffect";

export abstract class FinwarsGUIContext {
  static context: FinwarsGUIContext | null = null;
  abstract animate(
    state: FinwarsState,
    effects: FinwarsEffect[],
    effect: FinwarsEffect,
    onEnd: () => void
  ): FinwarsEffect[];
}
