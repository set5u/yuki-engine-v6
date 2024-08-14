import { FinwarsEffect } from "../../../abstract/FinwarsEffect";
import { FinwarsEffectStatusPercent } from "../FinwarsEffectStatusPercent";

export class FinwarsEffectDEFPercent extends FinwarsEffectStatusPercent {
  constructor(parent: FinwarsEffect | null) {
    super(parent);
    this.tags.add(FinwarsEffectTag.DEF);
  }
  override value: number = 0;
  override isDisposed: boolean = false;
  override getClass(): typeof FinwarsEffect {
    return FinwarsEffectDEFPercent;
  }
  override getAllEffect(): FinwarsEffect[] {
    return this.effects.map((e) => e.getAllEffectIncludingThis()).flat(1);
  }
}
