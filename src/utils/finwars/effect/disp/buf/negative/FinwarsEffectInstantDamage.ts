import { FinwarsMultiDimensional } from "@/utils/finwars/type/FinwarsMultiDimensional";
import { FinwarsBufNegative } from "./FinwarsEffectNegative";
import type { FinwarsEffect } from "@/utils/finwars/abstract/FinwarsEffect";
import { FinwarsEffectTag } from "@/utils/finwars/abstract/FinwarsEffectTag";

export class FinwarsEffectInstantDamage extends FinwarsBufNegative {
  override getAllEffect(): FinwarsEffect[] {
    return this.effects.map((e) => e.getAllEffectIncludingThis()).flat(1);
  }
  constructor(parent: FinwarsEffect | null) {
    super(parent);
    this.tags.add(FinwarsEffectTag.INSTANT_DAMAGE);
  }
  value: number = 0;
  override getClass(): typeof FinwarsEffect {
    return FinwarsEffectInstantDamage;
  }
  override serialize(): FinwarsMultiDimensional {
    return this.value;
  }
  override deserialize(object: FinwarsMultiDimensional): this {
    this.value = object as number;
    return this;
  }
}
