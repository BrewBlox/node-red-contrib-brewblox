import { EditorNodeProperties, Node, NodeDef } from 'node-red';

export interface BlockValueCheckOptions {
  field: string;
  operator: 'gte' | 'lte';
  value: string; // Number parsing is optional
  unit: string;
}

// export interface BlockValueCheckNode extends Node {}
export type BlockValueCheckNode = Node;

export interface BlockValueCheckNodeDef extends NodeDef, BlockValueCheckOptions { }

export interface BlockValueCheckEditorNodeProperties
  extends EditorNodeProperties, BlockValueCheckOptions {
  // node properties
}
