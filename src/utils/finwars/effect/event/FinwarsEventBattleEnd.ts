import type { FinwarsEffect } from "../../abstract/FinwarsEffect";
import { FinwarsMultiDimensional } from "../../type/FinwarsMultiDimensional";
import { FinwarsEffectEvent } from "./FinwarsEffectEvent";
import { FinwarsEventBattleStart } from "./FinwarsEventBattleStart";

export class FinwarsEventBattleEnd extends FinwarsEffectEvent {
  override getClass(): typeof FinwarsEffect {
    return FinwarsEventBattleStart;
  }
  override serialize(): FinwarsMultiDimensional {
    return [];
  }
  override deserialize(object: FinwarsMultiDimensional): this {
    return this;
  }
  override getAllEffect(): FinwarsEffect[] {
    return this.effects.map((e) => e.getAllEffectIncludingThis()).flat(1);
  }
}
