import { EditorRED } from 'node-red';

import { BlockChangeEditorNodeProperties } from './shared/types';

declare const RED: EditorRED;

RED.nodes.registerType<BlockChangeEditorNodeProperties>('block-change', {
  category: 'brewblox',
  color: '#a6bbcf',
  defaults: {
    name: { value: '' },
    merge: { value: 'msg-input' },
    data: { value: '{}' },
  },
  inputs: 1,
  outputs: 1,
  icon: 'font-awesome/fa-microchip',
  paletteLabel: 'change block',
  label: function () {
    return this.name || 'change block';
  },
  oneditprepare: function () {
    $('#node-input-data').typedInput({
      default: 'json',
      types: ['json'],
    });
  },
});
