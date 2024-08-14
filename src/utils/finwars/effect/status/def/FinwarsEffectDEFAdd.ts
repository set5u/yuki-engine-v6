import { FinwarsEffect } from "../../../abstract/FinwarsEffect";
import { FinwarsEffectStatusAdd } from "../FinwarsEffectStatusAdd";

export class FinwarsEffectDEFAdd extends FinwarsEffectStatusAdd {
  constructor(parent: FinwarsEffect | null) {
    super(parent);
    this.tags.add(FinwarsEffectTag.DEF);
  }
  override value: number = 0;
  override isDisposed: boolean = false;
  override getClass(): typeof FinwarsEffect {
    return FinwarsEffectDEFAdd;
  }
  override getAllEffect(): FinwarsEffect[] {
    return this.effects.map((e) => e.getAllEffectIncludingThis()).flat(1);
  }
}
