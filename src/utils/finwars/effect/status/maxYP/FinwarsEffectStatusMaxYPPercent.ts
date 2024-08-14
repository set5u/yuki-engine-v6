import { FinwarsEffect } from "../../../abstract/FinwarsEffect";
import { FinwarsEffectStatusPercent } from "../FinwarsEffectStatusPercent";

export class FinwarsEffectMaxYPPercent extends FinwarsEffectStatusPercent {
  constructor(parent: FinwarsEffect | null) {
    super(parent);
    this.tags.add(FinwarsEffectTag.MAX_HP);
  }
  override value: number = 0;
  override isDisposed: boolean = false;
  override getClass(): typeof FinwarsEffect {
    return FinwarsEffectMaxYPPercent;
  }
  override getAllEffect(): FinwarsEffect[] {
    return this.effects.map((e) => e.getAllEffectIncludingThis()).flat(1);
  }
}
