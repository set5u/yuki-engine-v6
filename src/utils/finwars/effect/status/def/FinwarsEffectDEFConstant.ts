import { FinwarsEffectTag } from "@/utils/finwars/abstract/FinwarsEffectTag";
import { FinwarsEffect } from "../../../abstract/FinwarsEffect";
import { FinwarsEffectStatusNumberConstant } from "../FinwarsEffectStatusNumberConstant";

export class FinwarsEffectDEFConstant extends FinwarsEffectStatusNumberConstant {
  constructor(parent: FinwarsEffect | null) {
    super(parent);
    this.tags.add(FinwarsEffectTag.DEF);
  }
  override value = 100;
  override getClass(): typeof FinwarsEffect {
    return FinwarsEffectDEFConstant;
  }
  override getAllEffect(): FinwarsEffect[] {
    return this.effects.map((e) => e.getAllEffectIncludingThis()).flat(1);
  }
}
