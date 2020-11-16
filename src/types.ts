export * from './shared-types';

import { BlockType } from './shared-types';

export interface JSONBloxField {
  __bloxtype: string;
}

export interface JSONQuantity extends JSONBloxField {
  __bloxtype: 'Quantity';
  value: number | null;
  unit: string;
  readonly?: boolean;
}

export interface JSONLink extends JSONBloxField {
  __bloxtype: 'Link';
  id: string | null;
  type: string;
  driven?: boolean;
}

export interface BlockPatch {
  id: string;
  serviceId: string;
  data: any; // Partial

  // Optional values
  nid?: number;
  groups?: number[];
  type?: BlockType;
}
