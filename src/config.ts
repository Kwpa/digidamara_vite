import Phaser from 'phaser';
import MainScene from "./scenes/MainScene";
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';

export default {
  type: Phaser.AUTO,
  parent: 'phaser-container',
  dom: {
    createContainer: true
  },
  //backgroundColor: '#FFFF00',
  transparent: true,
  scale: {
    width: '100%',
    height: '100%',
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    isPortrait: true
  },
  scene: [MainScene],
  plugins: {
    scene: [
      {
        key: 'rexUI',
        plugin: UIPlugin,
        mapping: 'rexUI'
      }
    ]
  }
}
