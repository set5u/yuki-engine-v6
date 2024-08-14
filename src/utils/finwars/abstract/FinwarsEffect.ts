import type { FinwarsState } from "../type/FinwarsState";
import type {
  FinwarsMultiDimensional,
  FinwarsSerialized,
} from "../type/FinwarsMultiDimensional";
import { FinwarsEvent } from "./FinwarsEvent";
import type { FinwarsEffectTag } from "./FinwarsEffectTag";

const eventFuncProcess = (
  state: FinwarsState,
  effects: FinwarsEffect[],
  event: FinwarsEvent,
  thisEffects: FinwarsEffect[],
) => {
  return effects.reduce((prev, curr) => {
    prev.push(...curr.onEvent(state, event, thisEffects));
    return prev;
  }, [] as FinwarsEffect[]);
};
export abstract class FinwarsEffect {
  constructor(public parent: FinwarsEffect | null) {
    const c = this.getClass();
    FinwarsEffect.registry[c.name] = c;
  }
  abstract getClass(): typeof FinwarsEffect;
  effects: FinwarsEffect[] = [];
  tags: Set<FinwarsEffectTag> = new Set();
  isDisposed: boolean = false;
  eventFuncs = {
    [FinwarsEvent.EFFECT_ADD]: this.onEffectAdd,
    [FinwarsEvent.EFFECT_REMOVE]: this.onEffectRemove,
    [FinwarsEvent.ADDED_TO_EFFECT]: this.onAddedToEffect,
    [FinwarsEvent.REMOVED_FROM_EFFECT]: this.onRemovedFromEffect,
  };
  /**
   * @returns このエフェクトが追加されることによっておきたエフェクトの追加を表す。再帰的に呼び出される
   */
  onEvent(
    state: FinwarsState,
    event: FinwarsEvent,
    arg: FinwarsEffect[],
  ): FinwarsEffect[] {
    return this.eventFuncs[event].bind(this)(state, arg);
  }
  /**
   * 追加できるかできないかと、調べることで発生したエフェクトが返される
   */
  onEffectCheckAbleToAdd(
    state: FinwarsState,
    effects: FinwarsEffect[],
    _isChild = false,
  ): [boolean[], FinwarsEffect[]] {
    const retBools = Array<boolean>(effects.length).fill(true);
    const retEffects: FinwarsEffect[] = [];
    for (let i = 0; i < effects.length; i++) {
      const r = effects[i].onEffectCheckAbleToAdd(state, this.effects, true);
      for (let j = 0; j < effects.length; j++) {
        retBools[j] &&= r[0][j] ?? true;
      }
      retEffects.push(...r[1]);
    }
    return [retBools, retEffects];
  }
  /**
   * Add版と同様
   */
  onEffectCheckAbleToRemove(
    state: FinwarsState,
    effects: FinwarsEffect[],
    _isChild = false,
  ): [boolean[], FinwarsEffect[]] {
    const retBools = Array<boolean>(effects.length).fill(true);
    const retEffects: FinwarsEffect[] = [];
    for (let i = 0; i < effects.length; i++) {
      const r = effects[i].onEffectCheckAbleToRemove(state, this.effects, true);
      for (let j = 0; j < effects.length; j++) {
        retBools[j] &&= r[0][j] ?? true;
      }
      retEffects.push(...r[1]);
    }
    return [retBools, retEffects];
  }
  mergeAbility(
    ret: [boolean[], FinwarsEffect[]],
    merge: [boolean[], FinwarsEffect[]],
  ) {
    for (let i = 0; i < ret[0].length; i++) {
      ret[0][i] &&= merge[0][i] ?? true;
    }
    ret[1].push(...merge[1]);
  }

  dispose() {
    this.isDisposed = true;
    for (const effect of this.effects) {
      effect.dispose();
    }
  }
  cruiseEffectToDispose() {
    for (const effect of this.effects) {
      if (effect.isDisposed) {
        effect.dispose();
        this.effects.splice(this.effects.indexOf(effect), 1);
      } else {
        effect.cruiseEffectToDispose();
      }
    }
  }
  addEffect(state: FinwarsState, effects: FinwarsEffect[], force = false) {
    if (!effects.length) {
      return [];
    }
    const addable = force
      ? ([effects.map((v) => true), [] as FinwarsEffect[]] as const)
      : this.onEffectCheckAbleToAdd(state, effects);
    const added: FinwarsEffect[] = [];
    addable[0].forEach((e, i) => {
      if (e) {
        added.push(effects[i]);
        this.effects.push(effects[i]);
      }
    });
    addable[1].push(...this.onEffectAdd(state, added));
    for (const add of added) {
      addable[1].push(...add.onAddedToEffect(state, this.effects));
    }
    return addable[1];
  }
  removeEffect(state: FinwarsState, effects: FinwarsEffect[], force = false) {
    if (!effects.length) {
      return [];
    }
    const removable = force
      ? ([effects.map((v) => true), [] as FinwarsEffect[]] as const)
      : this.onEffectCheckAbleToRemove(state, effects);
    const removed: FinwarsEffect[] = [];
    removable[0].forEach((e, i) => {
      if (e) {
        removed.push(effects[i]);
        effects[i].dispose();
      }
    });
    removable[1].push(...this.onEffectRemove(state, removed));
    for (const remove of removed) {
      removable[1].push(...remove.onRemovedFromEffect(state, this.effects));
    }
    this.cruiseEffectToDispose();
    return removable[1];
  }
  onEffectAdd(state: FinwarsState, effects: FinwarsEffect[]): FinwarsEffect[] {
    return eventFuncProcess(
      state,
      effects,
      FinwarsEvent.EFFECT_ADD,
      this.effects,
    );
  }
  onEffectRemove(
    state: FinwarsState,
    effects: FinwarsEffect[],
  ): FinwarsEffect[] {
    return eventFuncProcess(
      state,
      effects,
      FinwarsEvent.EFFECT_REMOVE,
      this.effects,
    );
  }
  onAddedToEffect(state: FinwarsState, parentEffects: FinwarsEffect[]) {
    return eventFuncProcess(
      state,
      parentEffects,
      FinwarsEvent.ADDED_TO_EFFECT,
      this.effects,
    );
  }
  onRemovedFromEffect(state: FinwarsState, parentEffects: FinwarsEffect[]) {
    return eventFuncProcess(
      state,
      parentEffects,
      FinwarsEvent.REMOVED_FROM_EFFECT,
      this.effects,
    );
  }
  onTurnStart(state: FinwarsState, effects: FinwarsEffect[]): FinwarsEffect[] {
    return eventFuncProcess(
      state,
      effects,
      FinwarsEvent.EFFECT_REMOVE,
      this.effects,
    );
  }
  abstract serialize(): FinwarsMultiDimensional;
  abstract deserialize(object: FinwarsMultiDimensional): this;
  static serialize(object: FinwarsMultiDimensional): FinwarsSerialized {
    if (
      object == null ||
      typeof object === "number" ||
      typeof object === "boolean"
    ) {
      return object;
    }
    if (Array.isArray(object)) {
      return object.map((e) => this.serialize(e));
    } else {
      return {
        v: this.serialize(object.serialize()),
        e: object.effects.map((e) => this.serialize(e)),
        n: object.constructor.name,
      };
    }
  }
  static deserialize(object: FinwarsSerialized): FinwarsMultiDimensional {
    if (
      object == null ||
      typeof object === "number" ||
      typeof object === "boolean"
    ) {
      return object;
    }
    if (Array.isArray(object)) {
      return object.map((e) => this.deserialize(e));
    } else {
      //@ts-ignore: 抽象クラスのインスタンスの作成不可について
      const ret = new this.registry[object.n]().deserialize(
        this.deserialize(object.v),
      ) as FinwarsEffect;
      ret.effects = object.e.map((e) => this.deserialize(e)) as FinwarsEffect[];
      return ret;
    }
  }
  static registry: { [key: string]: typeof FinwarsEffect } = {};
  equals(effect: FinwarsEffect) {
    if (this.constructor.name !== effect.constructor.name) {
      return false;
    }
    if (this.effects.every((e, i) => e.equals(effect.effects[i]))) {
      return true;
    }
    return false;
  }
  abstract getAllEffect(): FinwarsEffect[];
  getAllEffectIncludingThis(): FinwarsEffect[] {
    return [this, ...this.getAllEffect()];
  }
  getTopParent(): FinwarsEffect {
    let current: FinwarsEffect = this;
    let last = null;
    while (current.parent) {
      last = current;
      current = current.parent;
    }
    return last!;
  }
  hasParent(parent: FinwarsEffect | null): boolean {
    let current = this.parent;
    while (current && current !== parent) {
      current = current.parent;
    }
    return !!current;
  }
}
