import type { FinwarsEffect } from "../../abstract/FinwarsEffect";
import { FinwarsEffectTag } from "../../abstract/FinwarsEffectTag";
import { FinwarsEffectVariable } from "./FinwarsEffectVariable";

export class FinwarsEffectHP extends FinwarsEffectVariable {
  constructor(parent: FinwarsEffect | null) {
    super(parent);
    this.tags.add(FinwarsEffectTag.HP);
  }
  override value: number = 0;
  override getClass(): typeof FinwarsEffect {
    return FinwarsEffectHP;
  }
  override getAllEffect(): FinwarsEffect[] {
    return this.effects.map((e) => e.getAllEffectIncludingThis()).flat(1);
  }
}
