import type { FinwarsEffect } from "./FinwarsEffect";

export abstract class FinwarsHandler {
  abstract awaitCommand(
    targettableEffects: FinwarsEffect[],
  ): Promise<FinwarsEffect>;
}
