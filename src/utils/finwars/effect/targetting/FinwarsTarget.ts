import { FinwarsEffect } from "../../abstract/FinwarsEffect";
import type { FinwarsState } from "../../type/FinwarsState";

export abstract class FinwarsTarget extends FinwarsEffect {
  override onEffectCheckAbleToAdd(
    state: FinwarsState,
    effects: FinwarsEffect[],
    isChild: boolean,
  ): [boolean[], FinwarsEffect[]] {
    const ret: [boolean[], FinwarsEffect[]] = [[], []];
    for (const effect of effects) {
      if (effect instanceof FinwarsTarget) {
        ret[0].push(isChild);
      } else {
        ret[0].push(true);
      }
    }
    this.mergeAbility(ret, super.onEffectCheckAbleToAdd(state, effects));
    return ret;
  }
}
