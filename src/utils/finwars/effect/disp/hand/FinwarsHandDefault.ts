import type { FinwarsMultiDimensional } from "../../../type/FinwarsMultiDimensional";
import type { AbsFinwarsGear } from "../gear/AbsFinwarsGear";
import { AbsFinwarsHand } from "./AbsFinwarsHand";
import type { FinwarsEffect } from "../../../abstract/FinwarsEffect";
import { FinwarsEffectTargetting } from "../../targetting/FinwarsEffectTargetting";
import { FinwarsEffectTag } from "@/utils/finwars/abstract/FinwarsEffectTag";
import type { FinwarsState } from "@/utils/finwars/type/FinwarsState";
import { FinwarsEventBattleStart } from "../../event/FinwarsEventBattleStart";
import { FinwarsEffectHP } from "../../variable/FinwarsEffectHP";
import { FinwarsEffectATKConstant } from "../../status/atk/FinwarsEffectATKConstant";
import { FinwarsEffectDEFConstant } from "../../status/def/FinwarsEffectDEFConstant";
import { FinwarsEffectCRTProbConstant } from "../../status/crtProb/FinwarsEffectCRTProbConstant";
import { FinwarsEffectCRTRatioConstant } from "../../status/crtRatio/FinwarsEffectCRTRatioConstant";
import { FinwarsEffectMaxHPConstant } from "../../status/maxHP/FinwarsEffectMaxHPConstant";
import { FinwarsEventActStep } from "../../event/FinwarsEventActStep";
import { FinwarsEffectInstantDamage } from "../buf/negative/FinwarsEffectInstantDamage";
import { FinwarsEffectMouseOvering } from "../../targetting/FinwarsEffectMouseovering";
import { FinwarsGUIHandlerHintHide } from "@/utils/finwars/gui/handler/FinwarsGUIHandlerHintHide";
import { FinwarsHintName } from "@/utils/finwars/gui/handler/FinwarsHintName";
import { FinwarsGUIHandlerHintShow } from "@/utils/finwars/gui/handler/FinwarsGUIHandlerHintShow";
export const switchableFingerCounts = [];
export class FinwarsHandDefault extends AbsFinwarsHand {
  override getClass(): typeof FinwarsEffect {
    return FinwarsHandDefault;
  }
  constructor(parent: FinwarsEffect | null) {
    super(parent);
    this.tags.add(FinwarsEffectTag.DEFAULT);
  }
  /**
   * 0は死亡
   */
  fingerCount: number = 1;
  gear: AbsFinwarsGear[] = [];
  override serialize(): FinwarsMultiDimensional {
    return [this.fingerCount, this.gear];
  }
  override deserialize(object: FinwarsMultiDimensional): this {
    [this.fingerCount, this.gear] = object as [number, AbsFinwarsGear[]];
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
          new FinwarsEffectHP(this),
          new FinwarsEffectATKConstant(this),
          new FinwarsEffectDEFConstant(this),
          new FinwarsEffectCRTProbConstant(this),
          new FinwarsEffectCRTRatioConstant(this),
          new FinwarsEffectMaxHPConstant(this)
        );
      } else if (effect instanceof FinwarsEffectTargetting) {
        if (effect.otherTargettables.length === 0) {
          this.tags.add(FinwarsEffectTag.NEXT_HAND_TARGETTABLE_ENEMY);
        } else {
          this.tags.add(FinwarsEffectTag.NEXT_BUTTON_CONFIRM_TARGETTABLE_MINE);
        }
      } else if (effect instanceof FinwarsEventActStep && effect.step === 0) {
        const t = this.effects.find(
          (v) =>
            v instanceof FinwarsEffectTargetting && v.player !== effect.parent
        ) as FinwarsEffectTargetting | undefined;
        if (
          t &&
          t.otherTargettables[1] === this &&
          t.otherTargettables[0] instanceof FinwarsHandDefault
        ) {
          const enemy = t.otherTargettables[0];
          const enemyATKConstant =
            enemy.effects.find((v) => v instanceof FinwarsEffectATKConstant)
              ?.value ?? 0;
          const myDEFConstant =
            this.effects.find((v) => v instanceof FinwarsEffectDEFConstant)
              ?.value ?? 0;
          const enemyFingerCount = enemy.fingerCount;
          const damageEffect = new FinwarsEffectInstantDamage(this);
          damageEffect.value =
            ((enemyATKConstant * 1 * enemyFingerCount) / myDEFConstant) * 100;
          ret.push(damageEffect);
        }
      } else if (effect instanceof FinwarsEffectInstantDamage) {
        const hp = this.effects.find((v) => v instanceof FinwarsEffectHP);
        hp && (hp.value += effect.value);
        this.updateFingerCount();
        this.removeEffect(state, [effect]);
      } else if (effect instanceof FinwarsEffectMouseOvering) {
        const hint = new FinwarsGUIHandlerHintShow(this);
        hint.key = FinwarsHintName.HAND;
        hint.player = effect.player;
        ret.push(hint);
      }
    }
    return ret;
  }
  updateFingerCount() {
    const hp = this.effects.find((v) => v instanceof FinwarsEffectHP)?.value;
    const maxHP = this.effects.find(
      (v) => v instanceof FinwarsEffectMaxHPConstant
    )?.value;
    if (hp != null && maxHP != null) {
      if (hp >= maxHP * 4) {
        this.fingerCount = 0;
      } else {
        this.fingerCount = Math.ceil((hp + 1) / maxHP);
      }
    }
  }
  override onEffectRemove(
    state: FinwarsState,
    effects: FinwarsEffect[]
  ): FinwarsEffect[] {
    const ret = super.onEffectRemove(state, effects);
    for (const effect of effects) {
      if (effect instanceof FinwarsEffectTargetting) {
        this.tags.delete(FinwarsEffectTag.NEXT_HAND_TARGETTABLE);
        this.tags.delete(FinwarsEffectTag.NEXT_BUTTON_CONFIRM_TARGETTABLE_MINE);
      } else if (effect instanceof FinwarsEffectMouseOvering) {
        const hint = new FinwarsGUIHandlerHintHide(this);
        hint.key = FinwarsHintName.HAND;
        hint.player = effect.player;
        ret.push(hint);
      }
    }
    return ret;
  }
  override getAllEffect(): FinwarsEffect[] {
    return [
      this.effects.map((e) => e.getAllEffectIncludingThis()),
      this.gear.map((g) => g.getAllEffectIncludingThis()),
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
          effect.lastHasTag(FinwarsEffectTag.NEXT_HAND_TARGETTABLE) ||
          (effect.lastHasTag(FinwarsEffectTag.NEXT_HAND_TARGETTABLE_MINE) &&
            effect.hasParent(effect.player)) ||
          (effect.lastHasTag(FinwarsEffectTag.NEXT_HAND_TARGETTABLE_ENEMY) &&
            !effect.hasParent(effect.player)) ||
          (!effect.otherTargettables.length && effect.hasParent(effect.player))
        ) {
          ret[0].push(!!this.fingerCount);
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
  override onEffectCheckAbleToRemove(
    state: FinwarsState,
    effects: FinwarsEffect[]
  ): [boolean[], FinwarsEffect[]] {
    const ret: [boolean[], FinwarsEffect[]] = [[], []];
    for (const effect of effects) {
      if (effect instanceof FinwarsEffectTargetting) {
        if (
          effect.otherTargettables.length === 2 &&
          !(
            effect.otherTargettables[effect.otherTargettables.length - 1] ===
            this
          )
        ) {
          ret[0].push(false);
        } else {
          ret[0].push(true);
        }
      } else {
        ret[0].push(true);
      }
    }
    this.mergeAbility(ret, super.onEffectCheckAbleToAdd(state, effects));
    return ret;
  }
}
