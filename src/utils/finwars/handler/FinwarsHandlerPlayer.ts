import type { FinwarsEffect } from "../abstract/FinwarsEffect";
import { FinwarsHandler } from "../abstract/FinwarsHandler";

export class FinwarsHandlerPlayer extends FinwarsHandler {
  resolve: ((effect: FinwarsEffect) => void) | null = null;
  override awaitCommand(): Promise<FinwarsEffect> {
    return new Promise((resolve) => {
      this.resolve = resolve;
    });
  }
  selectTarget(effect: FinwarsEffect) {
    this.resolve?.(effect);
    this.resolve = null;
  }
}
