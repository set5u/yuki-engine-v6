import type { FinwarsEffect } from "../../abstract/FinwarsEffect";
import { FinwarsEffectTag } from "../../abstract/FinwarsEffectTag";
import { FinwarsGUIHandler } from "../../abstract/FinwarsGUIHandler";
import type { FinwarsMultiDimensional } from "../../type/FinwarsMultiDimensional";
import { FinwarsHintName } from "./FinwarsHintName";

export class FinwarsGUIHandlerHintShow extends FinwarsGUIHandler {
  constructor(parent: FinwarsEffect | null) {
    super(parent);
    this.tags.add(FinwarsEffectTag.ANIMATION_HINT_SHOW);
  }
  key = FinwarsHintName.EMPTY;
  override getClass(): typeof FinwarsEffect {
    return FinwarsGUIHandlerHintShow;
  }
  override serialize(): FinwarsMultiDimensional {
    return this.key;
  }
  override deserialize(object: FinwarsMultiDimensional): this {
    this.key = object as FinwarsHintName;
    return this;
  }
  override getAllEffect(): FinwarsEffect[] {
    return this.effects.map((e) => e.getAllEffectIncludingThis()).flat(1);
  }
  player: FinwarsEffect | null = null;
}
