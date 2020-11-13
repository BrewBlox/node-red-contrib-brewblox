import { EditorNodeProperties, Node, NodeDef } from 'node-red';

export interface MqttStateCacheOptions {
  // node options
}

// export interface MqttStateCacheNode extends Node {}
export type MqttStateCacheNode = Node;

export interface MqttStateCacheNodeDef extends NodeDef, MqttStateCacheOptions {}

export interface MqttStateCacheEditorNodeProperties
  extends EditorNodeProperties, MqttStateCacheOptions {
  // node properties
}
