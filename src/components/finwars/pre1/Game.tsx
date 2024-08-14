import { FinwarsGamePre1 } from "@/utils/finwars/effect/disp/game/FinwarsGamePre1";
import { FinwarsPre1Effect } from "./Effect";
import { useContext, useMemo } from "react";
import { FinwarsPre1GameContext } from "./gameContext";

export function FinwarsPre1Game({ game }: { game: FinwarsGamePre1 }) {
  const context = useContext(FinwarsPre1GameContext);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fase = useMemo(() => context.game.fase, [context.step]);
  return (
    <>
      <FinwarsPre1Effect effect={game}>Fase: {fase}</FinwarsPre1Effect>
    </>
  );
}
