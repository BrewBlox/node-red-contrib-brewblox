import { EditorNodeProperties, Node, NodeDef } from 'node-red';

export interface BlockGetOptions {
  serviceId: string;
  blockId: string;
}

// export interface BlockGetNode extends Node {}
export type BlockGetNode = Node;

export interface BlockGetNodeDef extends NodeDef, BlockGetOptions { }

export interface BlockGetEditorNodeProperties
  extends EditorNodeProperties, BlockGetOptions {
  // node properties
}
