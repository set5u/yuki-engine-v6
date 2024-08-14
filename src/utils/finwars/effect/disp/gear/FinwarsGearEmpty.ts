import { FinwarsEffectTag } from "@/utils/finwars/abstract/FinwarsEffectTag";
import { FinwarsGUIHandlerHintHide } from "@/utils/finwars/gui/handler/FinwarsGUIHandlerHintHide";
import { FinwarsGUIHandlerHintShow } from "@/utils/finwars/gui/handler/FinwarsGUIHandlerHintShow";
import { FinwarsHintName } from "@/utils/finwars/gui/handler/FinwarsHintName";
import type { FinwarsState } from "@/utils/finwars/type/FinwarsState";
import type { FinwarsMultiDimensional } from "../../../type/FinwarsMultiDimensional";
import { FinwarsEffectMouseOvering } from "../../targetting/FinwarsEffectMouseovering";
import { FinwarsEffectTargetting } from "../../targetting/FinwarsEffectTargetting";
import { AbsFinwarsGear } from "./AbsFinwarsGear";
import type { FinwarsEffect } from "@/utils/finwars/abstract/FinwarsEffect";

export class FinwarsGearEmpty extends AbsFinwarsGear {
  constructor(parent: FinwarsEffect | null) {
    super(parent);
    this.tags.add(FinwarsEffectTag.EMPTY);
  }
  override getClass(): typeof FinwarsEffect {
    return FinwarsGearEmpty;
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
          effect.lastHasTag(FinwarsEffectTag.NEXT_GEAR_TARGETTABLE) ||
          (effect.lastHasTag(FinwarsEffectTag.NEXT_GEAR_TARGETTABLE_MINE) &&
            effect.hasParent(effect.player)) ||
          (effect.lastHasTag(FinwarsEffectTag.NEXT_GEAR_TARGETTABLE_ENEMY) &&
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
        hint.key = FinwarsHintName.EMPTY;
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
        hint.key = FinwarsHintName.EMPTY;
        hint.player = effect.player;
        ret.push(hint);
      }
    }
    return ret;
  }
}
