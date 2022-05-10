import Phaser, { Scene } from 'phaser';

export default class AudioManager {
    scene: Phaser.Scene;

    public static sfx_init: string = "sfx_init";
    public static sfx_ui_accent: string = "sfx_ui_accent";
    public static sfx_notification: string = "sfx_notification";
    public static sfx_left: string = "sfx_left";    
    public static sfx_right: string = "sfx_right";
    public static sfx_open: string = "sfx_open";    
    public static sfx_close: string = "sfx_close";
    public static sfx_ui_click: string = "sfx_ui_click";
    public static sfx_ui_confirm: string = "sfx_ui_confirm";

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    LoadAudio() {
        this.scene.load.audio('danceFloorAudioOne', ['/assets/audio/DDM-DanceFloor-1.mp3']);
        this.scene.load.audio('danceFloorAudioTwo', ['/assets/audio/DDM-DanceFloor-2.mp3']);

        this.scene.load.audio(AudioManager.sfx_init, ['/assets/audio/ddm_sfx_init.mp3']);
        this.scene.load.audio(AudioManager.sfx_ui_accent, ['/assets/audio/ddm_sfx_ui.mp3']);
        this.scene.load.audio(AudioManager.sfx_ui_click, ['/assets/audio/ddm_sfx_ui_click.mp3']);
        this.scene.load.audio(AudioManager.sfx_ui_confirm, ['/assets/audio/ddm_sfx_ui_confirm.mp3']);
        this.scene.load.audio(AudioManager.sfx_notification, ['/assets/audio/ddm_sfx_notification.mp3']);        
        this.scene.load.audio(AudioManager.sfx_left, ['/assets/audio/ddm_sfx_left_1.mp3']);
        this.scene.load.audio(AudioManager.sfx_right, ['/assets/audio/ddm_sfx_right_1.mp3']);
        this.scene.load.audio(AudioManager.sfx_close, ['/assets/audio/ddm_sfx_left_1.mp3']);
        this.scene.load.audio(AudioManager.sfx_open, ['/assets/audio/ddm_sfx_right_1.mp3']);
    }

    PlayOneshot(key: string) {
        this.scene.sound.play(key, {'detune': (Math.random() - 0.5) * 50});
    }

}