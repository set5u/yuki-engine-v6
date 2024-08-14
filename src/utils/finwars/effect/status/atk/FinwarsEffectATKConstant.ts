import { FinwarsEffectTag } from "@/utils/finwars/abstract/FinwarsEffectTag";
import { FinwarsEffect } from "../../../abstract/FinwarsEffect";
import { FinwarsEffectStatusNumberConstant } from "../FinwarsEffectStatusNumberConstant";

export class FinwarsEffectATKConstant extends FinwarsEffectStatusNumberConstant {
  constructor(parent: FinwarsEffect | null) {
    super(parent);
    this.tags.add(FinwarsEffectTag.ATK);
  }
  override value = 100;
  override getClass(): typeof FinwarsEffect {
    return FinwarsEffectATKConstant;
  }
  override getAllEffect(): FinwarsEffect[] {
    return this.effects.map((e) => e.getAllEffectIncludingThis()).flat(1);
  }
}
