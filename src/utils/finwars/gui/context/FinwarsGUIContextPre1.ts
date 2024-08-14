import { FinwarsEffect } from "../../abstract/FinwarsEffect";
import { FinwarsGUIContext } from "../../abstract/FinwarsGUIContext";
import { FinwarsGUIHandler } from "../../abstract/FinwarsGUIHandler";
import type { FinwarsState } from "../../type/FinwarsState";
import { FinwarsGUIHandlerHintHide } from "../handler/FinwarsGUIHandlerHintHide";
import { FinwarsGUIHandlerHintShow } from "../handler/FinwarsGUIHandlerHintShow";
import type { FinwarsHintName } from "../handler/FinwarsHintName";

export class FinwarsGUIContextPre1 extends FinwarsGUIContext {
  constructor() {
    super();
    FinwarsGUIContext.context = this;
  }
  hint: { player: FinwarsEffect; key: FinwarsHintName }[] = [];
  override animate(
    state: FinwarsState,
    effects: FinwarsEffect[],
    effect: FinwarsEffect,
    onEnd: () => void,
  ): FinwarsEffect[] {
    if (effect instanceof FinwarsGUIHandler) {
      if (effect instanceof FinwarsGUIHandlerHintShow) {
        this.hint.push({ player: effect.player!, key: effect.key });
      } else if (effect instanceof FinwarsGUIHandlerHintHide) {
        this.hint.splice(
          this.hint.findIndex(
            (v) => v.player === effect.player && v.key === effect.key,
          ),
          1,
        );
      }
    }
    onEnd();
    return effect.onEffectAdd(state, effects);
  }
}
