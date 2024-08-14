import { FinwarsEffect } from "../../../abstract/FinwarsEffect";
import { FinwarsEffectStatusPercent } from "../FinwarsEffectStatusPercent";

export class FinwarsEffectATKPercent extends FinwarsEffectStatusPercent {
  constructor(parent: FinwarsEffect | null) {
    super(parent);
    this.tags.add(FinwarsEffectTag.ATK);
  }
  override value: number = 0;
  override isDisposed: boolean = false;
  override getClass(): typeof FinwarsEffect {
    return FinwarsEffectATKPercent;
  }
  override getAllEffect(): FinwarsEffect[] {
    return this.effects.map((e) => e.getAllEffectIncludingThis()).flat(1);
  }
}
