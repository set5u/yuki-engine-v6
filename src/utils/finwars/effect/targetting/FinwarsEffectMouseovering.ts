import { FinwarsEffect } from "../../abstract/FinwarsEffect";
import type { FinwarsMultiDimensional } from "../../type/FinwarsMultiDimensional";
import type { AbsFinwarsPlayer } from "../disp/player/AbsFinwarsPlayer";
import { FinwarsTarget } from "./FinwarsTarget";

export class FinwarsEffectMouseOvering extends FinwarsTarget {
  override getAllEffect(): FinwarsEffect[] {
    return this.effects.map((e) => e.getAllEffectIncludingThis()).flat(1);
  }
  override getClass(): typeof FinwarsEffect {
    return FinwarsEffectMouseOvering;
  }
  override serialize(): FinwarsMultiDimensional {
    return [];
  }
  override deserialize(object: FinwarsMultiDimensional): this {
    return this;
  }
  constructor(parent: FinwarsEffect | null) {
    super(parent);
  }
  player: AbsFinwarsPlayer | null = null;
  blur = false;
}
