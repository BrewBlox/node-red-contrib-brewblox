import { EditorRED } from 'node-red';

import { TempSensorValueEditorNodeProperties } from './shared/types';

declare const RED: EditorRED;

RED.nodes.registerType<TempSensorValueEditorNodeProperties>('temp-sensor-value', {
  category: 'function',
  color: '#a6bbcf',
  defaults: {
    name: { value: '' },
    value: { value: 0 },
    operator: { value: 'gte' },
  },
  inputs: 1,
  outputs: 1,
  icon: 'font-awesome/fa-microchip',
  paletteLabel: 'temp sensor value',
  label: function () {
    return this.name || 'temp sensor value';
  },
});
