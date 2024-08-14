import { FinwarsEffect } from "../../../abstract/FinwarsEffect";
import { FinwarsEffectStatusAdd } from "../FinwarsEffectStatusAdd";

export class FinwarsEffectMaxYPAdd extends FinwarsEffectStatusAdd {
  constructor(parent: FinwarsEffect | null) {
    super(parent);
    this.tags.add(FinwarsEffectTag.MAX_YP);
  }
  override value: number = 0;
  override isDisposed: boolean = false;
  override getClass(): typeof FinwarsEffect {
    return FinwarsEffectMaxYPAdd;
  }
  override getAllEffect(): FinwarsEffect[] {
    return this.effects.map((e) => e.getAllEffectIncludingThis()).flat(1);
  }
}
