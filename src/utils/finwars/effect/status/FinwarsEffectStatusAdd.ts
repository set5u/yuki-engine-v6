import { FinwarsEffectStatusNumber } from "./FinwarsEffectStatusNumber";
import { FinwarsEffectDefault } from "../FinwarsEffectDefault";
import type { FinwarsEffect } from "../../abstract/FinwarsEffect";
export abstract class FinwarsEffectStatusAdd extends FinwarsEffectStatusNumber {
  constructor(parent: FinwarsEffect | null) {
    super(parent);
    this.tags.add(FinwarsEffectTag.ADD);
  }
}
