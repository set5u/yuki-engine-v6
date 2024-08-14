import type { FinwarsEffect } from "@/utils/finwars/abstract/FinwarsEffect";
import { FinwarsGameDefault } from "./FinwarsGameDefault";
import { FinwarsPlayerDefault } from "../player/FinwarsPlayerDefault";
import { FinwarsCardEmpty } from "../card/FinwarsCardEmpty";
import { FinwarsHandDefault } from "../hand/FinwarsHandDefault";
import { FinwarsGearEmpty } from "../gear/FinwarsGearEmpty";

export class FinwarsGamePre1 extends FinwarsGameDefault {
  override getClass(): typeof FinwarsEffect {
    return FinwarsGamePre1;
  }
  fase = 0;
  constructor(parent: FinwarsEffect | null) {
    super(parent);
    const playerA = new FinwarsPlayerDefault(this);
    this.player.push(playerA);
    const playerB = new FinwarsPlayerDefault(this);
    this.player.push(playerB);
    for (let i = 0; i < 8; i++) {
      playerA.card.push(new FinwarsCardEmpty(playerA));
      playerB.card.push(new FinwarsCardEmpty(playerB));
    }
    const playerAHandL = new FinwarsHandDefault(playerA);
    const playerAHandR = new FinwarsHandDefault(playerA);
    const playerBHandL = new FinwarsHandDefault(playerB);
    const playerBHandR = new FinwarsHandDefault(playerB);
    playerA.hand.push(playerAHandL);
    playerA.hand.push(playerAHandR);
    playerB.hand.push(playerBHandL);
    playerB.hand.push(playerBHandR);
    playerAHandL.gear.push(new FinwarsGearEmpty(playerAHandL));
    playerAHandR.gear.push(new FinwarsGearEmpty(playerAHandR));
    playerBHandL.gear.push(new FinwarsGearEmpty(playerBHandL));
    playerBHandR.gear.push(new FinwarsGearEmpty(playerBHandR));
  }
}
