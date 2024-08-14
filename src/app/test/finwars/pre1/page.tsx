"use client";

import { FinwarsPre1Game } from "@/components/finwars/pre1/Game";
import { FinwarsPre1GameContext } from "@/components/finwars/pre1/gameContext";
import { FinwarsEffect } from "@/utils/finwars/abstract/FinwarsEffect";
import { FinwarsGamePre1 } from "@/utils/finwars/effect/disp/game/FinwarsGamePre1";
import { FinwarsEnginePre1 } from "@/utils/finwars/engine/FinwarsEnginePre1";
import { FinwarsGUIContextPre1 } from "@/utils/finwars/gui/context/FinwarsGUIContextPre1";
import { FinwarsHandlerPlayer } from "@/utils/finwars/handler/FinwarsHandlerPlayer";
import { FinwarsHandlerRandomAwait100ms } from "@/utils/finwars/handler/FinwarsHandlerRandomAwait100ms";
import { useEffect, useMemo, useState } from "react";

export default function FinwarsPre1Page({}) {
  const [step, setStep] = useState(0);
  const game = useMemo(() => new FinwarsGamePre1(null), []);
  const randomHandler = useMemo(() => new FinwarsHandlerRandomAwait100ms(), []);
  const playerHandler = useMemo(() => new FinwarsHandlerPlayer(), []);
  const context = useMemo(() => new FinwarsGUIContextPre1(), []);
  useEffect(() => {
    const ret = new FinwarsEnginePre1({
      game: game,
      handlers: [playerHandler, randomHandler],
      context: context,
    });
    ret.addStepListeners(() => setStep((v) => v + 1));
    ret.start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const target = (effect: FinwarsEffect) => {
    playerHandler.selectTarget(effect);
  };
  return (
    <div className="text-center m-4">
      <FinwarsPre1GameContext.Provider value={{ game, step, context, target }}>
        <FinwarsPre1Game game={game}></FinwarsPre1Game>
        <div>Hold buttons to see descriptions.</div>
      </FinwarsPre1GameContext.Provider>
    </div>
  );
}
