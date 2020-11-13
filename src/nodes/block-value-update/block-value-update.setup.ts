import { EditorRED } from 'node-red';

import { BlockValueUpdateEditorNodeProperties } from './shared/types';

declare const RED: EditorRED;

RED.nodes.registerType<BlockValueUpdateEditorNodeProperties>('block-value-update', {
  category: 'function',
  color: '#a6bbcf',
  defaults: {
    name: { value: '' },
    field: { value: '' },
    value: { value: '' },
    unit: { value: '' },
  },
  inputs: 1,
  outputs: 1,
  icon: 'font-awesome/fa-microchip',
  paletteLabel: 'block value update',
  label: function () {
    return this.name || 'block value update';
  },
});
