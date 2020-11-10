import { NodeInitializer } from 'node-red';

import { TempSensorOneWireBlock, UserBlockType } from '../../types';
import { schemas, validate } from '../../validation';
import { TempSensorValueNode, TempSensorValueNodeDef } from './shared/types';

const sensorTypes = [
  UserBlockType.TempSensorCombi,
  UserBlockType.TempSensorMock,
  UserBlockType.TempSensorOneWire,
];

const nodeInit: NodeInitializer = (RED): void => {
  function TempSensorValueNodeConstructor(
    this: TempSensorValueNode,
    config: TempSensorValueNodeDef,
  ): void {
    RED.nodes.createNode(this, config);

    this.on('input', (msg, send, done) => {
      const block = validate<TempSensorOneWireBlock>(schemas.Block, msg.payload);
      if (block && sensorTypes.includes(block.type)) {
        const value = block.data.value.value;
        if (value !== null) {
          if (config.operator === 'gte' && value >= config.value) {
            send(msg);
          }
          else if (config.operator === 'lte' && value <= config.value) {
            send(msg);
          }
        }
      }
      done();
    });
  }

  RED.nodes.registerType('temp-sensor-value', TempSensorValueNodeConstructor);
};

export = nodeInit;
