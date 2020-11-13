import { NodeInitializer } from 'node-red';

import { StateEvent } from '../../types';
import { schemas, validate } from '../../validation';
import { MqttStateCacheNode, MqttStateCacheNodeDef } from './shared/types';

const nodeInit: NodeInitializer = (RED): void => {
  function MqttStateCacheNodeConstructor(
    this: MqttStateCacheNode,
    config: MqttStateCacheNodeDef,
  ): void {
    RED.nodes.createNode(this, config);

    this.on('input', (msg, send, done) => {
      const state = validate<StateEvent>(schemas.StateEvent, msg.payload);
      if (state) {
        this.context().flow.set(`brewcast/state/${state.key}`, state);
        send(msg);
      }

      done();
    });
  }

  RED.nodes.registerType('mqtt-state-cache', MqttStateCacheNodeConstructor);
};

export = nodeInit;
