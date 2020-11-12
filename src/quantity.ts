import LibQty from 'js-quantities';
import isFinite from 'lodash/isFinite';
import lodashRound from 'lodash/round';

import { isJSONQuantity } from './bloxfield';
import { durationMs, isDurationString } from './duration';
import { JSONQuantity } from './types';
import { checkCompatible, findGroup } from './unit-groups';

export { isJSONQuantity, isBloxField } from './bloxfield';

type WrapperValue = JSONQuantity | number | string | null;

const round = (value: number | null, precision = 3): number | null =>
  value !== null
    ? lodashRound(value, precision)
    : null;

const libUnit = (unit: string): string =>
  findGroup(unit)?.convert(unit) ?? unit;

export const toLibQty = (v: JSONQuantity): LibQty => {
  if (v.value == null) {
    throw new Error('No value set');
  }
  return LibQty(v.value, libUnit(v.unit)!);
};

export const isQuantity =
  (obj: unknown): obj is Quantity =>
    obj instanceof Object
    && (obj as Quantity).__bloxtype === 'Quantity'
    && typeof (obj as Quantity).toJSON === 'function';

const fromArgs =
  (value: number | null, unit: string, readonly?: boolean): JSONQuantity => ({
    __bloxtype: 'Quantity',
    value,
    unit,
    readonly,
  });

const tryFromQuantity =
  (value: any): JSONQuantity | null =>
    isJSONQuantity(value)
      ? fromArgs(value.value, value.unit, value.readonly)
      : null;

const tryFromDuration =
  (value: any): JSONQuantity | null =>
    isDurationString(value)
      ? fromArgs(durationMs(value) / 1000, 's')
      : null;

const rawQty = (value: WrapperValue, unit?: string): JSONQuantity =>
  null
  ?? tryFromQuantity(value)
  ?? tryFromDuration(value)
  ?? fromArgs(value as number, unit as string);

export class Quantity implements JSONQuantity {
  public __bloxtype: 'Quantity' = 'Quantity';
  public value: number | null;
  public unit: string;
  public readonly: boolean;

  public constructor(value: number | null, unit: string);
  public constructor(value: string); // duration
  public constructor(value: JSONQuantity);
  public constructor(value: WrapperValue, unit?: string);
  public constructor(value: WrapperValue, unit?: string) {
    const obj = rawQty(value, unit);

    if (obj.value && !isFinite(obj.value)) {
      throw new Error(`Value '${obj.value}' is not a number or null. (unit=${obj.unit}).`);
    }

    if (!obj.unit) {
      throw new Error(`No unit set. (value=${obj.value}).`);
    }

    if (unit && unit !== obj.unit) {
      throw new Error(`Multiple units set: '${obj.unit}' and '${unit}'. (value=${obj.value}).`);
    }

    this.value = obj.value;
    this.unit = obj.unit;
    this.readonly = obj.readonly ?? false;
  }

  public toJSON(): JSONQuantity {
    return {
      __bloxtype: 'Quantity',
      value: this.value,
      unit: this.unit,
      readonly: this.readonly,
    };
  }

  public toString(): string {
    return `qty(${round(this.value)}, '${this.unit}')`;
  }

  public copy(value?: number | null, unit?: string): Quantity {
    const other = new Quantity({
      ...this.toJSON(),
      value: value !== undefined ? value : this.value, // null is valid
      unit: unit ?? this.unit,
    });
    return other;
  }

  public to(unit: string): Quantity {
    const converted = toLibQty(this).to(libUnit(unit));
    return this.copy(converted.scalar, unit);
  }

  public eq(value: WrapperValue, unit?: string): boolean {
    const other = new Quantity(value, unit);
    checkCompatible(this, other);
    return toLibQty(this).eq(toLibQty(other));
  }

  public lt(value: WrapperValue, unit?: string): boolean {
    const other = new Quantity(value, unit);
    checkCompatible(this, other);
    return toLibQty(this).lt(toLibQty(other));
  }

  public lte(value: WrapperValue, unit?: string): boolean {
    const other = new Quantity(value, unit);
    checkCompatible(this, other);
    return toLibQty(this).lte(toLibQty(other));
  }

  public gt(value: WrapperValue, unit?: string): boolean {
    const other = new Quantity(value, unit);
    checkCompatible(this, other);
    return toLibQty(this).gt(toLibQty(other));
  }

  public gte(value: WrapperValue, unit?: string): boolean {
    const other = new Quantity(value, unit);
    checkCompatible(this, other);
    return toLibQty(this).gte(toLibQty(other));
  }

  public compareTo(value: WrapperValue, unit?: string): -1 | 0 | 1 {
    const other = new Quantity(value, unit);
    checkCompatible(this, other);
    return toLibQty(this).compareTo(toLibQty(other));
  }

  public plus(value: WrapperValue, unit?: string): Quantity {
    const other = new Quantity(value, unit);
    const result = toLibQty(this).add(toLibQty(other));
    return this.copy(result.scalar);
  }

  public minus(value: WrapperValue, unit?: string): Quantity {
    const other = new Quantity(value, unit);
    const result = toLibQty(this).sub(toLibQty(other));
    return this.copy(result.scalar);
  }

  // Convenience aliases
  public isEqualTo = this.eq;
  public isGreaterThan = this.gt;
  public isGreaterThanEqual = this.gte;
  public isLessThan = this.lt;
  public isLessThanEqual = this.lte;
}

export function qty(value: JSONQuantity): Quantity;
export function qty(value: string): Quantity;
export function qty(value: number | null, unit: string): Quantity;
export function qty(value: WrapperValue, unit?: string): Quantity {
  // Let the constructor handle invalid combinations of args
  return new Quantity(value as any, unit as any);
}
