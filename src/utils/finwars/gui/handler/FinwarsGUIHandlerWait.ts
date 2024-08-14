import { FinwarsEffect } from "../../abstract/FinwarsEffect";
import { FinwarsEffectTag } from "../../abstract/FinwarsEffectTag";
import { FinwarsGUIHandler } from "../../abstract/FinwarsGUIHandler";
import type { FinwarsMultiDimensional } from "../../type/FinwarsMultiDimensional";
import type { FinwarsState } from "../../type/FinwarsState";

export class FinwarsGUIHandlerWait extends FinwarsGUIHandler {
  constructor(parent: FinwarsEffect) {
    super(parent);
    this.tags.add(FinwarsEffectTag.ANIMATION_WAIT);
  }
  override isDisposed: boolean = false;
  waitTime = 0;
  effect: FinwarsEffect | null = null;
  result: FinwarsEffect[] | undefined = undefined;
  override onEffectAdd(
    state: FinwarsState,
    effects: FinwarsEffect[],
  ): FinwarsEffect[] {
    setTimeout(() => {
      this.result = this.effect?.onEffectAdd(state, effects);
      this.dispose();
    }, this.waitTime);
    return [];
  }
  override onEffectRemove(): FinwarsEffect[] {
    return this.result || [];
  }
  override serialize(): FinwarsMultiDimensional {
    return [this.effect, this.waitTime, this.result];
  }
  override deserialize(serialized: FinwarsMultiDimensional): this {
    const serializedArray = serialized as [
      FinwarsEffect | null,
      number,
      FinwarsEffect[] | undefined,
    ];
    this.effect = serializedArray[0];
    this.waitTime = serializedArray[1];
    this.result = serializedArray[2];
    return this;
  }
  override getClass(): typeof FinwarsEffect {
    return FinwarsGUIHandlerWait;
  }
  override getAllEffect(): FinwarsEffect[] {
    return this.effects.map((e) => e.getAllEffectIncludingThis()).flat(1);
  }
}
