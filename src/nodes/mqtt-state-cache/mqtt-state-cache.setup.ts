import { EditorRED } from 'node-red';

import { MqttStateCacheEditorNodeProperties } from './shared/types';

declare const RED: EditorRED;

RED.nodes.registerType<MqttStateCacheEditorNodeProperties>('mqtt-state-cache', {
  category: 'function',
  color: '#a6bbcf',
  defaults: {
    name: { value: '' },
  },
  inputs: 1,
  outputs: 1,
  icon: 'font-awesome/fa-microchip',
  paletteLabel: 'mqtt state cache',
  label: function () {
    return this.name || 'mqtt state cache';
  },
});
