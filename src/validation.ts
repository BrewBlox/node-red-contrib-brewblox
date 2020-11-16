import Ajv from 'ajv';

import { schemas } from './schemas';
export { schemas } from './schemas';

const ajv = new Ajv();

// One of the values in the `schemas` object
export type SchemaType = typeof schemas[keyof typeof schemas];

export function validate<T>(schema: SchemaType, data: unknown): T | null {
  return ajv.validate(schema, data)
    ? data as T
    : null;
}
