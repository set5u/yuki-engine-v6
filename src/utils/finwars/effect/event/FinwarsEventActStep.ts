import type { FinwarsEffect } from "../../abstract/FinwarsEffect";
import { FinwarsMultiDimensional } from "../../type/FinwarsMultiDimensional";
import { FinwarsEffectEvent } from "./FinwarsEffectEvent";

export class FinwarsEventActStep extends FinwarsEffectEvent {
  override getClass(): typeof FinwarsEffect {
    return FinwarsEventActStep;
  }
  override serialize(): FinwarsMultiDimensional {
    return this.fase;
  }
  override deserialize(object: FinwarsMultiDimensional): this {
    this.fase = object as number;
    return this;
  }
  override getAllEffect(): FinwarsEffect[] {
    return this.effects.map((e) => e.getAllEffectIncludingThis()).flat(1);
  }
  fase = 0;
  step = 0;
}
