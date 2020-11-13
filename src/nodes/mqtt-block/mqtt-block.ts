import { NodeInitializer } from 'node-red';

import { SparkStateEvent } from '../../types';
import { schemas, validate } from '../../validation';
import { MqttBlockNode, MqttBlockNodeDef } from './shared/types';

const nodeInit: NodeInitializer = (RED): void => {
  function MqttBlockNodeConstructor(
    this: MqttBlockNode,
    config: MqttBlockNodeDef,
  ): void {
    RED.nodes.createNode(this, config);

    this.on('input', (msg, send, done) => {
      const event = validate<SparkStateEvent>(schemas.SparkStateEvent, msg.payload);

      if (event?.key === config.serviceId) {
        const block = event.data
          .blocks
          .find(block => block.id === config.blockId);

        if (block) {
          msg.payload = block;
          send(msg);
        }
      }

      done();
    });
  }

  RED.nodes.registerType('mqtt-block', MqttBlockNodeConstructor);
};

export = nodeInit;
