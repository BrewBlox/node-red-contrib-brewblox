import get from 'lodash/get';
import { NodeInitializer } from 'node-red';

import { isJSONQuantity, qty } from '../../quantity';
import { Block } from '../../types';
import { schemas, validate } from '../../validation';
import { BlockCheckNode, BlockCheckNodeDef } from './shared/types';

const nodeInit: NodeInitializer = (RED): void => {
  function BlockCheckNodeConstructor(
    this: BlockCheckNode,
    config: BlockCheckNodeDef,
  ): void {
    RED.nodes.createNode(this, config);

    this.on('input', (msg, send, done) => {
      const block = validate<Block>(schemas.Block, msg.payload);
      const value = get(block?.data, config.field);
      const cmpValue = Number(config.value);
      const cmpUnit = config.unit.trim() || undefined;

      if (value == null || cmpValue == null) {
        return done();
      }

      if (
        (isJSONQuantity(value)
          && value.value !== null
          && qty(value)[config.operator](cmpValue, cmpUnit ?? value.unit)) ||
        (config.operator === 'gte' && value >= cmpValue) ||
        (config.operator === 'lte' && value <= cmpValue)
      ) {
        send(msg);
      }

      done();
    });
  }

  RED.nodes.registerType('block-check', BlockCheckNodeConstructor);
};

export = nodeInit;
