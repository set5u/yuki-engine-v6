import { FinwarsEffect } from "./FinwarsEffect";
import { FinwarsEffectTag } from "./FinwarsEffectTag";

export abstract class FinwarsGUIHandler extends FinwarsEffect {
  constructor(parent: FinwarsEffect | null) {
    super(parent);
    this.tags.add(FinwarsEffectTag.GUI);
  }
}
