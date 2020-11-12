import { EditorRED } from 'node-red';

import { BlockValueCheckEditorNodeProperties } from './shared/types';

declare const RED: EditorRED;

RED.nodes.registerType<BlockValueCheckEditorNodeProperties>('block-value-check', {
  category: 'function',
  color: '#a6bbcf',
  defaults: {
    name: { value: '' },
    field: { value: '' },
    operator: { value: 'gte' },
    value: { value: '' },
    unit: { value: '' },
  },
  inputs: 1,
  outputs: 1,
  icon: 'font-awesome/fa-microchip',
  paletteLabel: 'block value check',
  label: function () {
    return this.name || 'block value check';
  },
});
