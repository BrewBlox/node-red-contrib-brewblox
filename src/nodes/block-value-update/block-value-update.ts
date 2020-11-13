import get from 'lodash/get';
import set from 'lodash/set';
import { NodeInitializer } from 'node-red';

import { isDurationString } from '../../duration';
import { isJSONQuantity, qty } from '../../quantity';
import { Block, JSONQuantity } from '../../types';
import { schemas, validate } from '../../validation';
import { BlockValueUpdateNode, BlockValueUpdateNodeDef } from './shared/types';

type FieldValue = JSONQuantity | string | number | Object;

const findUpdated = (oldV: FieldValue, newV: string, newUnit: string): FieldValue => {
  if (isJSONQuantity(oldV)) {
    return isDurationString(newV)
      ? qty(newV)
      : qty(Number(newV), newUnit.trim() || oldV.unit);
  }
  else if (typeof oldV === 'number') {
    return Number(newV);
  }
  else if (oldV instanceof Object) {
    return JSON.parse(newV);
  }
  else {
    return newV;
  }
};

const nodeInit: NodeInitializer = (RED): void => {
  function BlockValueUpdateNodeConstructor(
    this: BlockValueUpdateNode,
    config: BlockValueUpdateNodeDef,
  ): void {
    RED.nodes.createNode(this, config);

    this.on('input', (msg, send, done) => {
      const block = validate<Block>(schemas.Block, msg.payload);
      const value = get(block?.data, config.field);

      if (block === null || value === undefined || config.value.trim() === '') {
        return done();
      }

      const updated = findUpdated(value, config.value, config.unit);
      set(block.data, config.field, updated);
      msg.payload = block;
      send(msg);
      done();
    });
  }

  RED.nodes.registerType('block-value-update', BlockValueUpdateNodeConstructor);
};

export = nodeInit;
