import { EditorRED } from 'node-red';

import { BlockValuePatchEditorNodeProperties } from './shared/types';

declare const RED: EditorRED;

RED.nodes.registerType<BlockValuePatchEditorNodeProperties>('block-value-patch', {
  category: 'function',
  color: '#a6bbcf',
  defaults: {
    name: { value: '' },
  },
  inputs: 1,
  outputs: 1,
  icon: 'font-awesome/fa-microchip',
  paletteLabel: 'block value patch',
  label: function () {
    return this.name || 'block value patch';
  },
});
