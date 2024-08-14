import type { FinwarsEffect } from "@/utils/finwars/abstract/FinwarsEffect";
import { FinwarsEffectTag } from "@/utils/finwars/abstract/FinwarsEffectTag";
import { FinwarsEffectDefault } from "@/utils/finwars/effect/FinwarsEffectDefault";

export abstract class AbsFinwarsButton extends FinwarsEffectDefault {
  constructor(parent: FinwarsEffect | null) {
    super(parent);
    this.tags.add(FinwarsEffectTag.BUTTON);
  }
}
