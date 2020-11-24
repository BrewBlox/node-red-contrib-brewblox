import { EditorNodeProperties, Node, NodeDef } from 'node-red';

export interface BlockChangeOptions {
  merge: 'cache-msg' | 'msg-input';
  data: any;
}

// export interface BlockChangeNode extends Node {}
export type BlockChangeNode = Node;

export interface BlockChangeNodeDef extends NodeDef, BlockChangeOptions { }

export interface BlockChangeEditorNodeProperties
  extends EditorNodeProperties, BlockChangeOptions {
  // node properties
}
