import { FinwarsEffect } from "../../../abstract/FinwarsEffect";
import { FinwarsEffectStatusPercent } from "../FinwarsEffectStatusPercent";

export class FinwarsEffectCRTRatioPercent extends FinwarsEffectStatusPercent {
  constructor(parent: FinwarsEffect | null) {
    super(parent);
    this.tags.add(FinwarsEffectTag.CRT_RATIO);
  }
  override value: number = 0;
  override isDisposed: boolean = false;
  override getClass(): typeof FinwarsEffect {
    return FinwarsEffectCRTRatioPercent;
  }
  override getAllEffect(): FinwarsEffect[] {
    return this.effects.map((e) => e.getAllEffectIncludingThis()).flat(1);
  }
}
