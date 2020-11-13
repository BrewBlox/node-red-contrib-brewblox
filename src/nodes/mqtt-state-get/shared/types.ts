import { EditorNodeProperties, Node, NodeDef } from 'node-red';

export interface MqttStateGetOptions {
  serviceId: string;
  blockId: string;
}

// export interface MqttStateGetNode extends Node {}
export type MqttStateGetNode = Node;

export interface MqttStateGetNodeDef extends NodeDef, MqttStateGetOptions { }

export interface MqttStateGetEditorNodeProperties
  extends EditorNodeProperties, MqttStateGetOptions {
  // node properties
}
