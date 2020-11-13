export * from './shared-types/automation-types';
export * from './shared-types/spark-block-enums';
export * from './shared-types/spark-block-types';
export * from './shared-types/spark-service-types';

import { BlockType } from './shared-types/spark-block-enums';

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

export interface StateEvent {
  key: string;
  type: string;
  ttl: string;
  data: any;
}
