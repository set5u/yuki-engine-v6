import { FinwarsEffectTag } from "@/utils/finwars/abstract/FinwarsEffectTag";
import { FinwarsEffect } from "../../../abstract/FinwarsEffect";
import { FinwarsEffectStatusNumberConstant } from "../FinwarsEffectStatusNumberConstant";

export class FinwarsEffectCRTProbConstant extends FinwarsEffectStatusNumberConstant {
  constructor(parent: FinwarsEffect | null) {
    super(parent);
    this.tags.add(FinwarsEffectTag.CRT_PROB);
  }
  override value = 0.05;
  override getClass(): typeof FinwarsEffect {
    return FinwarsEffectCRTProbConstant;
  }
  override getAllEffect(): FinwarsEffect[] {
    return this.effects.map((e) => e.getAllEffectIncludingThis()).flat(1);
  }
}
