import { EditorNodeProperties, Node, NodeDef } from 'node-red';

export interface BlockCheckOptions {
  field: string;
  operator: 'gte' | 'lte';
  value: string; // Number parsing is optional
  unit: string;
}

// export interface BlockCheckNode extends Node {}
export type BlockCheckNode = Node;

export interface BlockCheckNodeDef extends NodeDef, BlockCheckOptions { }

export interface BlockCheckEditorNodeProperties
  extends EditorNodeProperties, BlockCheckOptions {
  // node properties
}
