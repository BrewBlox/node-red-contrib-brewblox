import { EditorNodeProperties, Node, NodeDef } from 'node-red';

export interface TempSensorValueOptions {
  value: number;
  operator: 'gte' | 'lte';
}

// export interface TempSensorValueNode extends Node {}
export type TempSensorValueNode = Node;

export interface TempSensorValueNodeDef extends NodeDef, TempSensorValueOptions { }

export interface TempSensorValueEditorNodeProperties
  extends EditorNodeProperties, TempSensorValueOptions {
  // node properties
}
