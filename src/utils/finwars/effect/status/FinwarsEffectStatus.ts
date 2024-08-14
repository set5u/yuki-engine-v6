import type { FinwarsEffect } from "../../abstract/FinwarsEffect";
import { FinwarsEffectTag } from "../../abstract/FinwarsEffectTag";
import type { FinwarsState } from "../../type/FinwarsState";
import { FinwarsEffectDefault } from "../FinwarsEffectDefault";
import { FinwarsEffectTargetting } from "../targetting/FinwarsEffectTargetting";

export abstract class FinwarsEffectStatus extends FinwarsEffectDefault {
  constructor(parent: FinwarsEffect | null) {
    super(parent);
    this.tags.add(FinwarsEffectTag.STATUS);
  }
  override onEffectCheckAbleToAdd(
    state: FinwarsState,
    effects: FinwarsEffect[],
  ): [boolean[], FinwarsEffect[]] {
    const ret: [boolean[], FinwarsEffect[]] = [
      effects.map((v) => !(v instanceof FinwarsEffectTargetting)),
      [],
    ];
    this.mergeAbility(ret, super.onEffectCheckAbleToAdd(state, effects));
    return ret;
  }
}
