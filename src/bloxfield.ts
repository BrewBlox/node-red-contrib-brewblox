import { JSONBloxField, JSONLink, JSONQuantity } from './types';

export const isBloxField =
  (obj: unknown): obj is JSONBloxField =>
    obj instanceof Object
    && typeof (obj as JSONBloxField).__bloxtype === 'string';

export const isJSONQuantity =
  (obj: unknown): obj is JSONQuantity =>
    isBloxField(obj)
    && (obj as JSONQuantity).__bloxtype === 'Quantity';

export const isJSONLink =
  (obj: unknown): obj is JSONLink =>
    isBloxField(obj)
    && (obj as JSONLink).__bloxtype === 'Link';
