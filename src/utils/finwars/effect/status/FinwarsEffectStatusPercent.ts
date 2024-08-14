import { FinwarsEffectStatusNumber } from "./FinwarsEffectStatusNumber";

import { FinwarsEffect } from "../FinwarsEffectDefault";
export abstract class FinwarsEffectStatusPercent extends FinwarsEffectStatusNumber {
  constructor(parent: FinwarsEffect | null) {
    super(parent);
    this.tags.add(FinwarsEffectTag.PERCENT);
  }
}
