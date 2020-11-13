import Ajv from 'ajv';

import Block from './schemas/Block.json';
import BlockPatch from './schemas/BlockPatch.json';
import SparkStateEvent from './schemas/SparkStateEvent.json';
import StateEvent from './schemas/StateEvent.json';

const ajv = new Ajv();
export const schemas = {
  Block,
  BlockPatch,
  StateEvent,
  SparkStateEvent,
};

// One of the values in the `schemas` object
type SchemaType = typeof schemas[keyof typeof schemas];

export function validate<T>(schema: SchemaType, data: unknown): T | null {
  return ajv.validate(schema, data)
    ? data as T
    : null;
}
