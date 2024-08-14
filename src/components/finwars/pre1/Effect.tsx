import { FinwarsEffect } from "@/utils/finwars/abstract/FinwarsEffect";

export function FinwarsPre1Effect({
  effect,
  children,
}: {
  effect: FinwarsEffect;
  children: React.ReactNode;
}) {
  return (
    <div className="inline-block border-2 rounded-2xl">
      <div>{effect.constructor.name}</div>
      <div>{children}</div>
    </div>
  );
}
