import { EditorNodeProperties, Node, NodeDef } from 'node-red';

export interface MqttBlockOptions {
  serviceId: string;
  blockId: string;
}

// export interface MqttBlockNode extends Node {}
export type MqttBlockNode = Node;

export interface MqttBlockNodeDef extends NodeDef, MqttBlockOptions { }

export interface MqttBlockEditorNodeProperties
  extends EditorNodeProperties, MqttBlockOptions {
  // node properties
}
