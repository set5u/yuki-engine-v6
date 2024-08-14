import { FinwarsEffect } from "../../../abstract/FinwarsEffect";
import { FinwarsEffectStatusMul } from "../FinwarsEffectStatusMul";

export class FinwarsEffectDEFMul extends FinwarsEffectStatusMul {
  constructor(parent: FinwarsEffect | null) {
    super(parent);
    this.tags.add(FinwarsEffectTag.DEF);
  }
  override value: number = 1;
  override isDisposed: boolean = false;
  override getClass(): typeof FinwarsEffect {
    return FinwarsEffectDEFMul;
  }
  override getAllEffect(): FinwarsEffect[] {
    return this.effects.map((e) => e.getAllEffectIncludingThis()).flat(1);
  }
}
