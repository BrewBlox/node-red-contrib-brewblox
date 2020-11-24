import { NodeInitializer } from 'node-red';

import { schemas } from '../../schemas';
import { SparkPatchEvent, SparkStateEvent } from '../../shared-types';
import { validate } from '../../validation';
import { SparkStateCacheNode, SparkStateCacheNodeDef } from './shared/types';

const nodeInit: NodeInitializer = (RED): void => {
  function SparkStateCacheNodeConstructor(
    this: SparkStateCacheNode,
    config: SparkStateCacheNodeDef,
  ): void {
    RED.nodes.createNode(this, config);

    this.on('input', (msg, send, done) => {

      // Handle full state events
      const state = validate<SparkStateEvent>(schemas.SparkStateEvent, msg.payload);
      if (state) {
        this.context().global.set(`brewblox/spark/${state.key}`, state);
        send(msg);
        return done();
      }

      // Handle patch events
      const patch = validate<SparkPatchEvent>(schemas.SparkPatchEvent, msg.payload);
      if (patch) {
        const ctx = this.context();
        const key = `brewblox/spark/${patch.key}`;
        const cache = ctx.global.get(key) as SparkStateEvent | null;
        if (cache) {
          const { blocks } = cache.data;
          const { changed, deleted } = patch.data;
          const affected = [
            ...changed.map(block => block.id),
            ...deleted,
          ];
          cache.data.blocks = [
            ...blocks.filter(v => !affected.includes(v.id)),
            ...changed,
          ];
          ctx.global.set(key, cache);
          msg.payload = cache; // always forward full state
          send(msg);
          return done();
        }
      }

      done();
    });
  }

  RED.nodes.registerType('spark-state-cache', SparkStateCacheNodeConstructor);
};

export = nodeInit;
