import Phaser, { Scene } from 'phaser';

export default class AudioManager {
    scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    LoadAudio() {
        this.scene.load.audio('danceFloorAudioOne', ['/assets/audio/DDM-DanceFloor-1.mp3']);
        this.scene.load.audio('danceFloorAudioTwo', ['/assets/audio/DDM-DanceFloor-2.mp3']);
        this.scene.load.audio('sfxInit', ['/assets/audio/ddm_sfx_init.wav']);
    }

}