import { NodeInitializer } from 'node-red';

import { schemas } from '../../schemas';
import { SparkStateEvent } from '../../shared-types';
import { validate } from '../../validation';
import { BlockGetNode, BlockGetNodeDef } from './shared/types';

const nodeInit: NodeInitializer = (RED): void => {
  function BlockGetNodeConstructor(
    this: BlockGetNode,
    config: BlockGetNodeDef,
  ): void {
    RED.nodes.createNode(this, config);

    this.on('input', (msg, send, done) => {
      const event = validate<SparkStateEvent>(schemas.SparkStateEvent, msg.payload);

      if (event?.key === config.serviceId && !!config.blockId) {
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

  RED.nodes.registerType('block-get', BlockGetNodeConstructor);
};

export = nodeInit;
