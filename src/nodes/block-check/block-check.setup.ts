import { EditorRED } from 'node-red';

import { BlockCheckEditorNodeProperties } from './shared/types';

declare const RED: EditorRED;

RED.nodes.registerType<BlockCheckEditorNodeProperties>('block-check', {
  category: 'brewblox',
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
  paletteLabel: 'check block value',
  label: function () {
    return this.name || `check ${this.field || 'block'} value`;
  },
});
