import { FinwarsEffect } from "../../../abstract/FinwarsEffect";
import { FinwarsEffectStatusMul } from "../FinwarsEffectStatusMul";

export class FinwarsEffectMaxHPMul extends FinwarsEffectStatusMul {
  constructor(parent: FinwarsEffect | null) {
    super(parent);
    this.tags.add(FinwarsEffectTag.MAX_HP);
  }
  override value: number = 1;
  override isDisposed: boolean = false;
  override getClass(): typeof FinwarsEffect {
    return FinwarsEffectMaxHPMul;
  }
  override getAllEffect(): FinwarsEffect[] {
    return this.effects.map((e) => e.getAllEffectIncludingThis()).flat(1);
  }
}
