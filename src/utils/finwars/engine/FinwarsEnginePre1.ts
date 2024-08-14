import type { FinwarsEffect } from "../abstract/FinwarsEffect";
import type { FinwarsHandler } from "../abstract/FinwarsHandler";
import type { FinwarsPlayerDefault } from "../effect/disp/player/FinwarsPlayerDefault";
import type { FinwarsState } from "../type/FinwarsState";
import { FinwarsGamePre1 } from "../effect/disp/game/FinwarsGamePre1";
import { FinwarsGUIHandler } from "../abstract/FinwarsGUIHandler";
import type { FinwarsGUIContextPre1 } from "../gui/context/FinwarsGUIContextPre1";
import { FinwarsButtonConfirm } from "../effect/disp/button/FinwarsButtonConfirm";
import { FinwarsEventAnimationEnd } from "../effect/event/FinwarsEffectAnimationEnd";
import { FinwarsEventAnimationStart } from "../effect/event/FinwarsEffectAnimationStart";
import { FinwarsEventActStep } from "../effect/event/FinwarsEventActStep";
import { FinwarsEventBattleStart } from "../effect/event/FinwarsEventBattleStart";
import { FinwarsEffectMouseOvering } from "../effect/targetting/FinwarsEffectMouseovering";
import { FinwarsEffectTargetting } from "../effect/targetting/FinwarsEffectTargetting";

export class FinwarsEnginePre1 {
  constructor({
    handlers,
    game,
    context,
  }: {
    handlers: [FinwarsHandler, FinwarsHandler];
    game: FinwarsGamePre1;
    context: FinwarsGUIContextPre1;
  }) {
    this.handlers = handlers;
    this.game = game;
    this.context = context;
  }
  handlers: [FinwarsHandler, FinwarsHandler];
  game: FinwarsGamePre1;
  context: FinwarsGUIContextPre1;
  stepListeners: (() => unknown)[] = [];
  addStepListeners(listener: () => unknown) {
    this.stepListeners.push(listener);
  }
  protected invokeStepListeners() {
    this.stepListeners.forEach((s) => s());
  }
  addEffectAndProcessGUIHandlerRecursively(
    state: FinwarsState,
    effect: FinwarsEffect,
    adding: FinwarsEffect[],
  ) {
    if (!adding.length) {
      return Promise.resolve(false);
    }
    return new Promise<boolean>((resolve) => {
      const gui = adding.filter((e) => e instanceof FinwarsGUIHandler);
      const nogui = adding.filter((e) => !(e instanceof FinwarsGUIHandler));
      this.addEffectAndProcessGUIHandlerRecursively(
        state,
        effect,
        effect.addEffect(state, nogui),
      );
      const promises: Promise<boolean>[] = [];
      for (const g of gui) {
        const p = new Promise<boolean>((resolve) => {
          g.addEffect(state, [new FinwarsEventAnimationStart(g)]);
          this.addEffectAndProcessGUIHandlerRecursively(
            state,
            effect,
            this.context.animate(state, [], g, () =>
              this.addEffectAndProcessGUIHandlerRecursively(
                state,
                effect,
                g.addEffect(state, [new FinwarsEventAnimationEnd(g)]),
              ).then(resolve),
            ),
          );
        });
        promises.push(p);
      }
      Promise.all(promises).then((b) => resolve(b.some((v) => v)));
    });
  }
  async start() {
    const state: FinwarsState = {};
    // battle start
    this.game
      .getAllEffectIncludingThis()
      .forEach((e) =>
        this.addEffectAndProcessGUIHandlerRecursively(
          state,
          e,
          e.onEffectAdd(state, [new FinwarsEventBattleStart(this.game)]),
        ),
      );
    this.invokeStepListeners();
    while (true) {
      // select command
      const commandAPromise = this.selectCommand(
        this.handlers[0],
        this.game,
        this.game.player[0] as FinwarsPlayerDefault,
        state,
      );
      const commandBPromise = this.selectCommand(
        this.handlers[1],
        this.game,
        this.game.player[1] as FinwarsPlayerDefault,
        state,
      );
      await commandAPromise;
      await commandBPromise;
      this.game.getAllEffectIncludingThis().forEach((v) =>
        this.addEffectAndProcessGUIHandlerRecursively(
          state,
          v,
          v.removeEffect(
            state,
            v.effects.filter((v) => v instanceof FinwarsEffectMouseOvering),
            true,
          ),
        ),
      );
      // act
      let step = 0;
      while (
        (
          await Promise.all(
            this.game.getAllEffectIncludingThis().map((e) =>
              this.addEffectAndProcessGUIHandlerRecursively(
                state,
                e,
                e.onEffectAdd(state, [
                  (() => {
                    const stepEffect = new FinwarsEventActStep(
                      this.game.player[this.game.fase % 2],
                    );
                    stepEffect.fase = this.game.fase;
                    stepEffect.step = step;
                    return stepEffect;
                  })(),
                ]),
              ),
            ),
          )
        ).some((v) => v)
      ) {
        step++;
      }
      this.invokeStepListeners();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      step = 0;
      while (
        (
          await Promise.all(
            this.game.getAllEffectIncludingThis().map((e) =>
              this.addEffectAndProcessGUIHandlerRecursively(
                state,
                e,
                e.onEffectAdd(state, [
                  (() => {
                    const stepEffect = new FinwarsEventActStep(
                      this.game.player[(this.game.fase + 1) % 2],
                    );
                    stepEffect.fase = this.game.fase;
                    stepEffect.step = step;
                    return stepEffect;
                  })(),
                ]),
              ),
            ),
          )
        ).some((v) => v)
      ) {
        step++;
      }
      this.invokeStepListeners();
      // reset
      this.game.getAllEffectIncludingThis().forEach((v) =>
        v.removeEffect(
          state,
          v.effects.filter((v) => v instanceof FinwarsEffectTargetting),
          true,
        ),
      );
      this.invokeStepListeners();
      this.game.fase++;
      this.invokeStepListeners();
    }
  }
  async selectCommand(
    handler: FinwarsHandler,
    game: FinwarsGamePre1,
    player: FinwarsPlayerDefault,
    state: FinwarsState,
  ) {
    const targetting: FinwarsEffect[] = [];
    const allTargettables = game.getAllEffectIncludingThis();
    let index = 0;
    select: while (true) {
      const targettables: FinwarsEffect[] = [];
      const targetEffect = new FinwarsEffectTargetting(null);
      targetEffect.otherTargettables = targetting;
      targetEffect.targetIndex = index++;
      targetEffect.player = player;
      for (const all of allTargettables) {
        targetEffect.parent = all;
        const ret = targetting.includes(all)
          ? all.onEffectCheckAbleToRemove(
              state,
              all.effects.filter(
                (v) =>
                  v instanceof FinwarsEffectTargetting && v.player === player,
              ),
            )
          : all.onEffectCheckAbleToAdd(state, [targetEffect]);
        all.addEffect(state, ret[1]);
        ret[0][0] && targettables.push(all);
      }
      const command = await handler.awaitCommand(targettables);
      if (targettables.includes(command)) {
        targetEffect.parent = command;
        const removing = targetting.includes(command);
        const r = removing
          ? command.removeEffect(
              state,
              command.effects.filter(
                (e) =>
                  e instanceof FinwarsEffectTargetting && e.player === player,
              ),
            )
          : command.addEffect(state, [targetEffect]);
        removing
          ? targetting.splice(targetting.indexOf(command), 1)
          : targetting.push(command);
        this.addEffectAndProcessGUIHandlerRecursively(state, command, r);
        removing ? index-- : index++;
        this.invokeStepListeners();
        if (command instanceof FinwarsButtonConfirm) {
          break select;
        }
      } else if (command instanceof FinwarsEffectMouseOvering) {
        command.player = player;
        if (command.blur) {
          const mo = command.parent!.effects.filter(
            (v) => v instanceof FinwarsEffectMouseOvering,
          );
          this.addEffectAndProcessGUIHandlerRecursively(
            state,
            command.parent!,
            command.parent!.removeEffect(state, mo),
          );
        } else {
          this.addEffectAndProcessGUIHandlerRecursively(
            state,
            command.parent!,
            [command],
          );
        }
        this.invokeStepListeners();
      }
    }
    return targetting;
  }
}
