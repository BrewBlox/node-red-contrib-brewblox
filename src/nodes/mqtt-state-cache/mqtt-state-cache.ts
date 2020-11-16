import { NodeInitializer } from 'node-red';

import { SparkPatchEvent, SparkStateEvent } from '../../types';
import { schemas, validate } from '../../validation';
import { MqttStateCacheNode, MqttStateCacheNodeDef } from './shared/types';

const nodeInit: NodeInitializer = (RED): void => {
  function MqttStateCacheNodeConstructor(
    this: MqttStateCacheNode,
    config: MqttStateCacheNodeDef,
  ): void {
    RED.nodes.createNode(this, config);

    this.on('input', (msg, send, done) => {

      // Handle full state events
      const state = validate<SparkStateEvent>(schemas.SparkStateEvent, msg.payload);
      if (state) {
        this.context().flow.set(`brewcast/state/${state.key}`, state);
        send(msg);
        return done();
      }

      // Handle patch events
      const patch = validate<SparkPatchEvent>(schemas.SparkPatchEvent, msg.payload);
      if (patch) {
        const flow = this.context().flow;
        const key = `brewcast/state/${patch.key}`;
        const flowState = flow.get(key) as SparkStateEvent | null;
        if (flowState) {
          const { blocks } = flowState.data;
          const { changed, deleted } = patch.data;
          const affected = [
            ...changed.map(block => block.id),
            ...deleted,
          ];
          flowState.data.blocks = [
            ...blocks.filter(v => !affected.includes(v.id)),
            ...changed,
          ];
          flow.set(key, flowState);
          msg.payload = flowState; // always forward full state
          send(msg);
          return done();
        }
      }

      done();
    });
  }

  RED.nodes.registerType('mqtt-state-cache', MqttStateCacheNodeConstructor);
};

export = nodeInit;
