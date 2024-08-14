import type { FinwarsMultiDimensional } from "../../type/FinwarsMultiDimensional";
import { FinwarsEffectStatus } from "./FinwarsEffectStatus";
import { FinwarsEffectTag } from "../../abstract/FinwarsEffectTag";
import type { FinwarsState } from "../../type/FinwarsState";
import { FinwarsEffectTargetting } from "../targetting/FinwarsEffectTargetting";
import type { FinwarsEffect } from "../../abstract/FinwarsEffect";

export abstract class FinwarsEffectStatusNumber extends FinwarsEffectStatus {
  constructor(parent: FinwarsEffect | null) {
    super(parent);
    this.tags.add(FinwarsEffectTag.NUMBER);
  }
  abstract value: number;
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
  override serialize() {
    return this.value;
  }
  override deserialize(object: FinwarsMultiDimensional): this {
    this.value = object as number;
    return this;
  }
}
