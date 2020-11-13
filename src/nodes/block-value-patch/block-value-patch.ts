import merge from 'lodash/merge';
import { NodeInitializer } from 'node-red';

import { BlockPatch, SparkStateEvent } from '../../types';
import { schemas, validate } from '../../validation';
import { BlockValuePatchNode, BlockValuePatchNodeDef } from './shared/types';

const nodeInit: NodeInitializer = (RED): void => {
  function BlockValuePatchNodeConstructor(
    this: BlockValuePatchNode,
    config: BlockValuePatchNodeDef,
  ): void {
    RED.nodes.createNode(this, config);

    this.on('input', (msg, send, done) => {
      const patch = validate<BlockPatch>(schemas.BlockPatch, msg.payload);

      if (!patch) {
        return done();
      }

      const cache = this.context().flow.get(`brewcast/state/${patch.serviceId}`);
      const state = validate<SparkStateEvent>(schemas.SparkStateEvent, cache);

      if (state) {
        const block = state.data
          .blocks
          .find(block => block.id === patch.id);

        if (block) {
          block.data = merge(block.data, patch.data);
          msg.payload = block;
          send(msg);
        }
      }

      done();
    });
  }

  RED.nodes.registerType('block-value-patch', BlockValuePatchNodeConstructor);
};

export = nodeInit;
