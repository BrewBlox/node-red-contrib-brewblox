import { EditorRED } from 'node-red';

import { BlockGetEditorNodeProperties } from './shared/types';

declare const RED: EditorRED;

RED.nodes.registerType<BlockGetEditorNodeProperties>('block-get', {
  category: 'brewblox',
  color: '#a6bbcf',
  defaults: {
    name: { value: '' },
    serviceId: { value: '' },
    blockId: { value: '' },
  },
  inputs: 1,
  outputs: 1,
  icon: 'font-awesome/fa-microchip',
  paletteLabel: 'get block',
  label: function () {
    return this.name || `get ${this.blockId ? (this.blockId + ' block') : 'block'}`;
  },
});
