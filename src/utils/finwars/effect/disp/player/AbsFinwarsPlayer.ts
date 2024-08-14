import type { FinwarsEffect } from "@/utils/finwars/abstract/FinwarsEffect";
import { FinwarsEffectDefault } from "../../FinwarsEffectDefault";
import { FinwarsEffectTag } from "@/utils/finwars/abstract/FinwarsEffectTag";

export abstract class AbsFinwarsPlayer extends FinwarsEffectDefault {
  constructor(parent: FinwarsEffect | null) {
    super(parent);
    this.tags.add(FinwarsEffectTag.PLAYER);
  }
}
