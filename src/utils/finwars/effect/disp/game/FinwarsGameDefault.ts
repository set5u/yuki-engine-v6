import type { FinwarsMultiDimensional } from "../../../type/FinwarsMultiDimensional";
import { FinwarsEffectTargetting } from "../../targetting/FinwarsEffectTargetting";
import type { AbsFinwarsPlayer } from "../player/AbsFinwarsPlayer";
import { AbsFinwarsGame } from "./AbsFinwarsGame";
import type { FinwarsEffect } from "@/utils/finwars/abstract/FinwarsEffect";
import { FinwarsEffectTag } from "@/utils/finwars/abstract/FinwarsEffectTag";
import type { FinwarsState } from "@/utils/finwars/type/FinwarsState";

export class FinwarsGameDefault extends AbsFinwarsGame {
  override getClass(): typeof FinwarsEffect {
    return FinwarsGameDefault;
  }
  constructor(parent: FinwarsEffect | null) {
    super(parent);
    this.tags.add(FinwarsEffectTag.DEFAULT);
  }
  player: AbsFinwarsPlayer[] = [];
  override serialize(): FinwarsMultiDimensional {
    return this.player;
  }
  override deserialize(object: FinwarsMultiDimensional): this {
    this.player = object as AbsFinwarsPlayer[];
    return this;
  }
  override getAllEffect(): FinwarsEffect[] {
    return [
      this.effects.map((e) => e.getAllEffectIncludingThis()),
      this.player.map((p) => p.getAllEffectIncludingThis()),
    ].flat(Infinity) as FinwarsEffect[];
  }
  override onEffectCheckAbleToAdd(
    state: FinwarsState,
    effects: FinwarsEffect[]
  ): [boolean[], FinwarsEffect[]] {
    const ret: [boolean[], FinwarsEffect[]] = [[], []];
    for (const effect of effects) {
      if (
        effect instanceof FinwarsEffectTargetting &&
        (effect.lastHasTag(FinwarsEffectTag.NEXT_GAME_TARGETTABLE) ||
          (effect.lastHasTag(FinwarsEffectTag.NEXT_GAME_TARGETTABLE_MINE) &&
            effect.hasParent(effect.player)) ||
          (effect.lastHasTag(FinwarsEffectTag.NEXT_GAME_TARGETTABLE_ENEMY) &&
            !effect.hasParent(effect.player)))
      ) {
        ret[0].push(true);
      } else {
        ret[0].push(false);
      }
    }
    this.mergeAbility(ret, super.onEffectCheckAbleToAdd(state, effects));
    return ret;
  }
}
