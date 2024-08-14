import { FinwarsEffect } from "@/utils/finwars/abstract/FinwarsEffect";
import { FinwarsGamePre1 } from "@/utils/finwars/effect/disp/game/FinwarsGamePre1";
import { FinwarsGUIContextPre1 } from "@/utils/finwars/gui/context/FinwarsGUIContextPre1";
import { createContext } from "react";

export const FinwarsPre1GameContext = createContext<{
  game: FinwarsGamePre1;
  step: number;
  context: FinwarsGUIContextPre1;
  target: (target: FinwarsEffect) => void;
}>(null!);
