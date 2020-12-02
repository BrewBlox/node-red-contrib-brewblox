import { EditorNodeProperties, Node, NodeDef } from 'node-red';

export interface SparkStateCacheOptions {
  // node options
}

// export interface SparkStateCacheNode extends Node {}
export type SparkStateCacheNode = Node;

export interface SparkStateCacheNodeDef extends NodeDef, SparkStateCacheOptions {}

export interface SparkStateCacheEditorNodeProperties
  extends EditorNodeProperties, SparkStateCacheOptions {
  // node properties
}
