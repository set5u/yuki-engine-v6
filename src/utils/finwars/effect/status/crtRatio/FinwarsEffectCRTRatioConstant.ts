import { FinwarsEffectTag } from "@/utils/finwars/abstract/FinwarsEffectTag";
import { FinwarsEffect } from "../../../abstract/FinwarsEffect";
import { FinwarsEffectStatusNumberConstant } from "../FinwarsEffectStatusNumberConstant";

export class FinwarsEffectCRTRatioConstant extends FinwarsEffectStatusNumberConstant {
  constructor(parent: FinwarsEffect | null) {
    super(parent);
    this.tags.add(FinwarsEffectTag.CRT_RATIO);
  }
  override value = 1.5;
  override getClass(): typeof FinwarsEffect {
    return FinwarsEffectCRTRatioConstant;
  }
  override getAllEffect(): FinwarsEffect[] {
    return this.effects.map((e) => e.getAllEffectIncludingThis()).flat(1);
  }
}
