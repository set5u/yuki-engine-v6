import { FinwarsEffect } from "../../abstract/FinwarsEffect";
import { FinwarsEffectTag } from "../../abstract/FinwarsEffectTag";
import type { FinwarsMultiDimensional } from "../../type/FinwarsMultiDimensional";
import { FinwarsTarget } from "./FinwarsTarget";

export class FinwarsEffectTargetting extends FinwarsTarget {
  override getAllEffect(): FinwarsEffect[] {
    return this.effects.map((e) => e.getAllEffectIncludingThis()).flat(1);
  }
  override getClass(): typeof FinwarsEffect {
    return FinwarsEffectTargetting;
  }
  override serialize(): FinwarsMultiDimensional {
    return this.otherTargettables;
  }
  override deserialize(object: FinwarsMultiDimensional): this {
    this.otherTargettables = object as FinwarsEffect[];
    return this;
  }
  constructor(parent: FinwarsEffect | null) {
    super(parent);
    this.tags.add(FinwarsEffectTag.TARGETTABLE);
  }
  /**
   * 他の選択されているEffectの配列。エンジンが挿入する。Effectが持つEffectではない。
   */
  otherTargettables: FinwarsEffect[] = [];
  targetIndex = 0;
  player: FinwarsEffect | null = null;
  lastHasTag(tag: FinwarsEffectTag) {
    return !!(
      this.otherTargettables.length &&
      this.otherTargettables[this.otherTargettables.length - 1].tags.has(tag)
    );
  }
}
