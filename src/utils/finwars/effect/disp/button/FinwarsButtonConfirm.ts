import type { FinwarsEffectDefault } from "@/utils/finwars/effect/FinwarsEffectDefault";
import type { FinwarsMultiDimensional } from "@/utils/finwars/type/FinwarsMultiDimensional";
import { AbsFinwarsButton } from "./AbsFinwarsButton";
import type { FinwarsEffect } from "@/utils/finwars/abstract/FinwarsEffect";
import type { FinwarsState } from "@/utils/finwars/type/FinwarsState";
import { FinwarsEffectTargetting } from "../../targetting/FinwarsEffectTargetting";
import { FinwarsEffectTag } from "@/utils/finwars/abstract/FinwarsEffectTag";
import { FinwarsEffectMouseOvering } from "../../targetting/FinwarsEffectMouseovering";
import { FinwarsGUIHandlerHintShow } from "@/utils/finwars/gui/handler/FinwarsGUIHandlerHintShow";
import { FinwarsHintName } from "@/utils/finwars/gui/handler/FinwarsHintName";
import { FinwarsGUIHandlerHintHide } from "@/utils/finwars/gui/handler/FinwarsGUIHandlerHintHide";

export class FinwarsButtonConfirm extends AbsFinwarsButton {
  override getClass(): typeof FinwarsEffect {
    return FinwarsButtonConfirm;
  }
  override serialize(): FinwarsMultiDimensional {
    return [];
  }
  override deserialize(): this {
    return this;
  }
  override getAllEffect(): FinwarsEffect[] {
    return this.effects.map((e) => e.getAllEffectIncludingThis()).flat(1);
  }
  override onEffectCheckAbleToAdd(
    state: FinwarsState,
    effects: FinwarsEffect[]
  ): [boolean[], FinwarsEffect[]] {
    const ret: [boolean[], FinwarsEffect[]] = [[], []];
    for (const effect of effects) {
      if (effect instanceof FinwarsEffectTargetting) {
        if (
          effect.lastHasTag(FinwarsEffectTag.NEXT_BUTTON_CONFIRM_TARGETTABLE) ||
          (effect.lastHasTag(
            FinwarsEffectTag.NEXT_BUTTON_CONFIRM_TARGETTABLE_MINE
          ) &&
            effect.hasParent(effect.player)) ||
          (effect.lastHasTag(
            FinwarsEffectTag.NEXT_BUTTON_CONFIRM_TARGETTABLE_ENEMY
          ) &&
            !effect.hasParent(effect.player))
        ) {
          ret[0].push(true);
        } else {
          ret[0].push(false);
        }
      } else {
        ret[0].push(true);
      }
    }
    this.mergeAbility(ret, super.onEffectCheckAbleToAdd(state, effects));
    return ret;
  }
  override onEffectAdd(
    state: FinwarsState,
    effects: FinwarsEffect[]
  ): FinwarsEffect[] {
    const ret = super.onEffectAdd(state, effects);
    for (const effect of effects) {
      if (effect instanceof FinwarsEffectMouseOvering) {
        const hint = new FinwarsGUIHandlerHintShow(this);
        hint.key = FinwarsHintName.CONFIRM;
        hint.player = effect.player;
        ret.push(hint);
      }
    }
    return ret;
  }
  override onEffectRemove(
    state: FinwarsState,
    effects: FinwarsEffect[]
  ): FinwarsEffect[] {
    const ret = super.onEffectRemove(state, effects);
    for (const effect of effects) {
      if (effect instanceof FinwarsEffectMouseOvering) {
        const hint = new FinwarsGUIHandlerHintHide(this);
        hint.key = FinwarsHintName.CONFIRM;
        hint.player = effect.player;
        ret.push(hint);
      }
    }
    return ret;
  }
}
