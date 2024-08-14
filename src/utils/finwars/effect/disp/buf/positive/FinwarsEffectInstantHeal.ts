import { FinwarsEffect } from "@/utils/finwars/abstract/FinwarsEffect";
import type { FinwarsMultiDimensional } from "@/utils/finwars/type/FinwarsMultiDimensional";
import { FinwarsBufPositive } from "./FinwarsEffectPositive";
import { FinwarsEffectTag } from "@/utils/finwars/abstract/FinwarsEffectTag";

export class FinwarsEffectInstantHeal extends FinwarsBufPositive {
  override getAllEffect(): FinwarsEffect[] {
    return this.effects.map((e) => e.getAllEffectIncludingThis()).flat(1);
  }
  constructor(parent: FinwarsEffect | null) {
    super(parent);
    this.tags.add(FinwarsEffectTag.INSTANT_HEAL);
  }
  value: number = 0;
  override getClass(): typeof FinwarsEffect {
    return FinwarsEffectInstantHeal;
  }
  override serialize(): FinwarsMultiDimensional {
    return this.value;
  }
  override deserialize(object: FinwarsMultiDimensional): this {
    this.value = object as number;
    return this;
  }
}
