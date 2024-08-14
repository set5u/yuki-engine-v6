import { FinwarsEffectDefault } from "../FinwarsEffectDefault";
import type { FinwarsMultiDimensional } from "../../type/FinwarsMultiDimensional";
import type { FinwarsEffect } from "../../abstract/FinwarsEffect";
import { FinwarsEffectTag } from "../../abstract/FinwarsEffectTag";
import type { FinwarsState } from "../../type/FinwarsState";
import { FinwarsEffectTargetting } from "../targetting/FinwarsEffectTargetting";

export abstract class FinwarsEffectVariable extends FinwarsEffectDefault {
  constructor(parent: FinwarsEffect | null) {
    super(parent);
    this.tags.add(FinwarsEffectTag.VARIABLE);
  }
  abstract value: number;
  override serialize(): FinwarsMultiDimensional {
    return this.value;
  }
  override deserialize(object: FinwarsMultiDimensional): this {
    this.value = object as number;
    return this;
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
