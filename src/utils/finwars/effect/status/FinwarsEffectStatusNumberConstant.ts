import type { FinwarsEffect } from "../../abstract/FinwarsEffect";
import { FinwarsEffectTag } from "../../abstract/FinwarsEffectTag";
import type { FinwarsState } from "../../type/FinwarsState";
import { FinwarsEffectStatusNumber } from "./FinwarsEffectStatusNumber";

export abstract class FinwarsEffectStatusNumberConstant extends FinwarsEffectStatusNumber {
  override value: number = 0;
  override isDisposed: boolean = false;
  constructor(parent: FinwarsEffect | null) {
    super(parent);
    this.tags.add(FinwarsEffectTag.CONSTANT);
  }
  override onEffectAdd(): FinwarsEffect[] {
    return [];
  }
  override onEffectRemove(): FinwarsEffect[] {
    return [];
  }
  override onEffectCheckAbleToRemove(
    _state: FinwarsState,
    effects: FinwarsEffect[],
  ): [boolean[], FinwarsEffect[]] {
    return [effects.map((e) => e !== this), []];
  }
}
