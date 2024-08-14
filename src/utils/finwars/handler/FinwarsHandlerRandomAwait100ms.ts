import type { FinwarsEffect } from "../abstract/FinwarsEffect";
import { FinwarsHandler } from "../abstract/FinwarsHandler";

export class FinwarsHandlerRandomAwait100ms extends FinwarsHandler {
  override awaitCommand(t: FinwarsEffect[]): Promise<FinwarsEffect> {
    return new Promise<FinwarsEffect>((resolve) => {
      setTimeout(() => {
        const r = t[Math.floor(Math.random() * t.length)];
        resolve(r);
      }, 100);
    });
  }
}
