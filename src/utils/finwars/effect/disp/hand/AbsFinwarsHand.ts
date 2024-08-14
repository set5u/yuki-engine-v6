import { FinwarsEffectTag } from "@/utils/finwars/abstract/FinwarsEffectTag";
import type { FinwarsEffect } from "../../../abstract/FinwarsEffect";
import { FinwarsEffectDefault } from "../../FinwarsEffectDefault";

export abstract class AbsFinwarsHand extends FinwarsEffectDefault {
  constructor(parent: FinwarsEffect | null) {
    super(parent);
    this.tags.add(FinwarsEffectTag.HAND);
  }
}
