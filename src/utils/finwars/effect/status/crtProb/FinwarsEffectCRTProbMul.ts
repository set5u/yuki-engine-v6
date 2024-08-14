import { FinwarsEffect } from "../../../abstract/FinwarsEffect";
import { FinwarsEffectStatusMul } from "../FinwarsEffectStatusMul";

export class FinwarsEffectCRTProbMul extends FinwarsEffectStatusMul {
  constructor(parent: FinwarsEffect | null) {
    super(parent);
    this.tags.add(FinwarsEffectTag.CRT_PROB);
  }
  override value: number = 1;
  override isDisposed: boolean = false;
  override getClass(): typeof FinwarsEffect {
    return FinwarsEffectCRTProbMul;
  }
  override getAllEffect(): FinwarsEffect[] {
    return this.effects.map((e) => e.getAllEffectIncludingThis()).flat(1);
  }
}
