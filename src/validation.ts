import Ajv from 'ajv';

import Block from './schemas/Block.json';
import SparkStateEvent from './schemas/SparkStateEvent.json';

const ajv = new Ajv();
export const schemas = {
  Block,
  SparkStateEvent,
};

// One of the values in the `schemas` object
type SchemaType = typeof schemas[keyof typeof schemas];

export function validate<T>(schema: SchemaType, data: unknown): T | null {
  return ajv.validate(schema, data)
    ? data as T
    : null;
}
