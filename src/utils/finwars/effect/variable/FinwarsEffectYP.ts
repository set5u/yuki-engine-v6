import type { FinwarsEffect } from "../../abstract/FinwarsEffect";
import { FinwarsEffectTag } from "../../abstract/FinwarsEffectTag";
import { FinwarsEffectVariable } from "./FinwarsEffectVariable";

export class FinwarsEffectYP extends FinwarsEffectVariable {
  constructor(parent: FinwarsEffect | null) {
    super(parent);
    this.tags.add(FinwarsEffectTag.YP);
  }
  override value: number = 5;
  override getClass(): typeof FinwarsEffect {
    return FinwarsEffectYP;
  }
  override getAllEffect(): FinwarsEffect[] {
    return this.effects.map((e) => e.getAllEffectIncludingThis()).flat(1);
  }
}
