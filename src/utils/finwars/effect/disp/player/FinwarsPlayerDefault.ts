import type { FinwarsMultiDimensional } from "../../../type/FinwarsMultiDimensional";
import type { AbsFinwarsHand } from "../hand/AbsFinwarsHand";
import { AbsFinwarsPlayer } from "./AbsFinwarsPlayer";
import type { AbsFinwarsCard } from "../card/AbsFinwarsCard";
import type { AbsFinwarsButton } from "../button/AbsFinwarsButton";
import type { FinwarsEffect } from "@/utils/finwars/abstract/FinwarsEffect";
import { FinwarsEffectTag } from "@/utils/finwars/abstract/FinwarsEffectTag";
import { FinwarsButtonConfirm } from "../button/FinwarsButtonConfirm";
import type { FinwarsState } from "@/utils/finwars/type/FinwarsState";
import { FinwarsEventBattleStart } from "../../event/FinwarsEventBattleStart";
import { FinwarsEffectYP } from "../../variable/FinwarsEffectYP";
import { FinwarsEffectMaxYPConstant } from "../../status/maxYP/FinwarsEffectStatusMaxYPConstant";
import { FinwarsEffectMouseOvering } from "../../targetting/FinwarsEffectMouseovering";
import { FinwarsGUIHandlerHintHide } from "@/utils/finwars/gui/handler/FinwarsGUIHandlerHintHide";
import { FinwarsHintName } from "@/utils/finwars/gui/handler/FinwarsHintName";
import { FinwarsEffectTargetting } from "../../targetting/FinwarsEffectTargetting";
import { FinwarsGUIHandlerHintShow } from "@/utils/finwars/gui/handler/FinwarsGUIHandlerHintShow";

export class FinwarsPlayerDefault extends AbsFinwarsPlayer {
  override getClass(): typeof FinwarsEffect {
    return FinwarsPlayerDefault;
  }
  constructor(parent: FinwarsEffect | null) {
    super(parent);
    this.tags.add(FinwarsEffectTag.DEFAULT);
    const confirm = new FinwarsButtonConfirm(this);
    this.button.push(confirm);
  }
  hand: AbsFinwarsHand[] = [];
  card: AbsFinwarsCard[] = [];
  button: AbsFinwarsButton[] = [];
  override serialize(): FinwarsMultiDimensional {
    return [this.hand, this.card];
  }
  override deserialize(object: FinwarsMultiDimensional): this {
    [this.hand, this.card] = object as [AbsFinwarsHand[], AbsFinwarsCard[]];
    return this;
  }
  override onEffectAdd(
    state: FinwarsState,
    effects: FinwarsEffect[]
  ): FinwarsEffect[] {
    const ret: FinwarsEffect[] = super.onEffectAdd(state, effects);
    for (const effect of effects) {
      if (effect instanceof FinwarsEventBattleStart) {
        ret.push(
          new FinwarsEffectYP(this),
          new FinwarsEffectMaxYPConstant(this)
        );
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
        hint.key = FinwarsHintName.PLAYER;
        hint.player = effect.player;
        ret.push(hint);
      }
    }
    return ret;
  }
  override getAllEffect(): FinwarsEffect[] {
    return [
      this.effects.map((e) => e.getAllEffectIncludingThis()),
      this.hand.map((h) => h.getAllEffectIncludingThis()),
      this.card.map((c) => c.getAllEffectIncludingThis()),
      this.button.map((b) => b.getAllEffectIncludingThis()),
    ].flat(Infinity) as FinwarsEffect[];
  }
  override onEffectCheckAbleToAdd(
    state: FinwarsState,
    effects: FinwarsEffect[]
  ): [boolean[], FinwarsEffect[]] {
    const ret: [boolean[], FinwarsEffect[]] = [[], []];
    for (const effect of effects) {
      if (effect instanceof FinwarsEffectTargetting) {
        if (
          effect.lastHasTag(FinwarsEffectTag.NEXT_PLAYER_TARGETTABLE) ||
          (effect.lastHasTag(FinwarsEffectTag.NEXT_PLAYER_TARGETTABLE_MINE) &&
            effect.hasParent(effect.player)) ||
          (effect.lastHasTag(FinwarsEffectTag.NEXT_PLAYER_TARGETTABLE_ENEMY) &&
            !effect.hasParent(effect.player))
        ) {
          ret[0].push(true);
        } else {
          ret[0].push(false);
        }
      } else if (effect instanceof FinwarsEffectMouseOvering) {
        ret[0].push(true);
        const hint = new FinwarsGUIHandlerHintShow(this);
        hint.key = FinwarsHintName.PLAYER;
        hint.player = effect.player;
        ret[1].push(hint);
      } else {
        ret[0].push(true);
      }
    }
    this.mergeAbility(ret, super.onEffectCheckAbleToAdd(state, effects));
    return ret;
  }
}
