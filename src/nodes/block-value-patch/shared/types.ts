import { EditorNodeProperties, Node, NodeDef } from 'node-red';

export interface BlockValuePatchOptions {
  // node options
}

// export interface BlockValuePatchNode extends Node {}
export type BlockValuePatchNode = Node;

export interface BlockValuePatchNodeDef extends NodeDef, BlockValuePatchOptions {}

export interface BlockValuePatchEditorNodeProperties
  extends EditorNodeProperties, BlockValuePatchOptions {
  // node properties
}
