import { NodeInitializer } from 'node-red';

import { MqttBlockNode, MqttBlockNodeDef, SparkStatus } from './shared/types';

const nodeInit: NodeInitializer = (RED): void => {
  function MqttBlockNodeConstructor(
    this: MqttBlockNode,
    config: MqttBlockNodeDef,
  ): void {
    RED.nodes.createNode(this, config);

    this.on('input', (msg, send, done) => {
      const status = msg.payload as SparkStatus | null;

      if (status?.type === 'Spark.state'
        && status?.key === config.serviceId) {
        const block = status.data
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
