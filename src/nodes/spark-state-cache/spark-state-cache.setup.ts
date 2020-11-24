import { EditorRED } from 'node-red';

import { SparkStateCacheEditorNodeProperties } from './shared/types';

declare const RED: EditorRED;

RED.nodes.registerType<SparkStateCacheEditorNodeProperties>('spark-state-cache', {
  category: 'brewblox',
  color: '#a6bbcf',
  defaults: {
    name: { value: '' },
  },
  inputs: 1,
  outputs: 1,
  icon: 'font-awesome/fa-microchip',
  paletteLabel: 'cache spark state',
  label: function () {
    return this.name || 'cache spark state';
  },
});
