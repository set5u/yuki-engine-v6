import { FinwarsEffect } from "../../../abstract/FinwarsEffect";
import { FinwarsEffectStatusAdd } from "../FinwarsEffectStatusAdd";

export class FinwarsEffectATKAdd extends FinwarsEffectStatusAdd {
  constructor(parent: FinwarsEffect | null) {
    super(parent);
    this.tags.add(FinwarsEffectTag.ATK);
  }
  override value: number = 0;
  override isDisposed: boolean = false;
  override getClass(): typeof FinwarsEffect {
    return FinwarsEffectATKAdd;
  }
  override getAllEffect(): FinwarsEffect[] {
    return this.effects.map((e) => e.getAllEffectIncludingThis()).flat(1);
  }
}
