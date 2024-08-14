import { FinwarsEffect } from "../abstract/FinwarsEffect";
import type { FinwarsState } from "../type/FinwarsState";
import { FinwarsEffectEvent } from "./event/FinwarsEffectEvent";

export abstract class FinwarsEffectDefault extends FinwarsEffect {
  override onEffectAdd(
    state: FinwarsState,
    effects: FinwarsEffect[],
  ): FinwarsEffect[] {
    for (const effect of effects) {
      if (effect instanceof FinwarsEffectEvent) {
        this.removeEffect(state, [effect]);
      }
    }
    return [];
  }
}
