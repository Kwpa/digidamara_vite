import Phaser from 'phaser';
import MainScene from "./scenes/MainScene";
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import PerspectiveImagePlugin from 'phaser3-rex-plugins/plugins/perspectiveimage-plugin';
import YoutubePlayerPlugin from 'phaser3-rex-plugins/plugins/youtubeplayer-plugin.js';

export default {
  type: Phaser.AUTO,
  parent: 'phaser-container',
  dom: {
    createContainer: true
  },
  backgroundColor: '#000000',
  transparent: false,
  pixelArt:true,
  scale: {
    width: '100%',
    height: '100%',
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    isPortrait: true
  },
  scene: [MainScene],
  plugins: {
    global: [{
      key: 'rexPerspectiveImagePlugin',
      plugin: PerspectiveImagePlugin,
      start: true
    },
    {
      key: 'rexYoutubePlayer',
      plugin: YoutubePlayerPlugin,
      start: true
    }],
    scene: [
      {
        key: 'rexUI',
        plugin: UIPlugin,
        mapping: 'rexUI'
      }
    ]
  }
}
