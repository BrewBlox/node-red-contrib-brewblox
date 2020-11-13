import { EditorNodeProperties, Node, NodeDef } from 'node-red';

export interface BlockValueUpdateOptions {
  field: string;
  value: string; // We parse to number if existing value is number
  unit: string;
}

// export interface BlockValueUpdateNode extends Node {}
export type BlockValueUpdateNode = Node;

export interface BlockValueUpdateNodeDef extends NodeDef, BlockValueUpdateOptions { }

export interface BlockValueUpdateEditorNodeProperties
  extends EditorNodeProperties, BlockValueUpdateOptions {
  // node properties
}
