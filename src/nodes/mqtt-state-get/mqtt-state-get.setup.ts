import { EditorRED } from 'node-red';

import { MqttStateGetEditorNodeProperties } from './shared/types';

declare const RED: EditorRED;

RED.nodes.registerType<MqttStateGetEditorNodeProperties>('mqtt-state-get', {
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
  paletteLabel: 'get block from mqtt state',
  label: function () {
    return this.name || `get block '${this.blockId}' from mqtt state`;
  },
});
