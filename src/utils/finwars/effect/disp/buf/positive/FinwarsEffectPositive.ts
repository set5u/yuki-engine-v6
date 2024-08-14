import type { FinwarsEffect } from "@/utils/finwars/abstract/FinwarsEffect";
import { AbsFinwarsBuf } from "../AbsFinwarsBuf";
import { FinwarsEffectTag } from "@/utils/finwars/abstract/FinwarsEffectTag";

export abstract class FinwarsBufPositive extends AbsFinwarsBuf {
  constructor(parent: FinwarsEffect | null) {
    super(parent);
    this.tags.add(FinwarsEffectTag.BUF_POSITIVE);
  }
}
