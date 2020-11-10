import { EditorRED } from 'node-red';

import { MqttBlockEditorNodeProperties } from './shared/types';

declare const RED: EditorRED;

RED.nodes.registerType<MqttBlockEditorNodeProperties>('mqtt-block', {
  category: 'function',
  color: '#a6bbcf',
  defaults: {
    name: { value: '' },
    serviceId: { value: '' },
    blockId: { value: '' },
  },
  inputs: 1,
  outputs: 1,
  icon: 'font-awesome/fa-microchip',
  paletteLabel: 'mqtt block',
  label: function () {
    return this.name || 'mqtt block';
  },
});
