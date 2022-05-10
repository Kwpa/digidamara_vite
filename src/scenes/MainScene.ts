import Phaser, { Scene, Tweens } from 'phaser';
import Header from './elements/Header';
import Footer from './elements/Footer';
import ChatPage from './elements/ChatPage';
import HelpPage from './elements/HelpPage';
import SettingsPage from './elements/SettingsPage';
import ChatMessageOtherUser from './elements/ChatMessageOtherUser';
import ChatMessageCurrentUser from './elements/ChatMessageCurrentUser';
import NotificationHome from './elements/NotificationHome';
import VideoTile from './elements/VideoTile';
import VoteScenario from './elements/VoteScenario';
import AvatarOverlay from './elements/AvatarOverlay';
import VideoPlayerOverlay from './elements/VideoPlayerOverlay';
import TeamProfile from './elements/TeamProfile';
import VotingPage from './elements/VotingPage';
import LeaderboardPage from './elements/LeaderboardPage';
import LeaderboardRow from './elements/LeaderboardRow';
import StoryAccordian from './elements/StoryAccordian';
import ChatChannel from './elements/ChatChannel';
import SlideDownButton from './elements/SlideDownButton';
import VoteOption from './elements/VoteOption';
import DynamicVoteScenario from './elements/DynamicVoteScenario';
import LandingPage from './elements/LandingPage';
import Driver from 'driver.js';
import 'driver.js/dist/driver.min.css';


import Bulma from '../node_modules/bulma/css/bulma.css';
import { ChannelMessage, ChannelMessageList, Client, Session, Socket, StorageObject, Users, User, Match, StorageObjects, MatchData, GroupList, Group, UserGroup } from "@heroiclabs/nakama-js";
import collect from 'collect.js';
import PerspectiveImagePlugin from 'phaser3-rex-plugins/plugins/perspectiveimage-plugin.js';
import { PerspectiveCarousel } from 'phaser3-rex-plugins/plugins/perspectiveimage.js';
import YoutubePlayerPlugin from 'phaser3-rex-plugins/plugins/youtubeplayer-plugin.js';
import LocalGameState, { AppState, DynamicVoteScenarioState, TeamImages, TeamRenderTextures, TeamState, VoteScenarioState } from './LocalGameState';
import StaticData, { ChatChannelData, NotificationData } from './StaticData';
import RenderTexture from 'phaser3-rex-plugins/plugins/gameobjects/mesh/perspective/rendertexture/RenderTexture';
import Sprite from 'phaser3-rex-plugins/plugins/gameobjects/mesh/perspective/sprite/Sprite';
import Image from 'phaser3-rex-plugins/plugins/gameobjects/mesh/perspective/image/Image';
import { Rectangle } from 'phaser3-rex-plugins/plugins/gameobjects/shape/shapes/geoms';
import * as bulmaToast from 'bulma-toast';
import DynamicData from './DynamicData';
import VoteChoiceHTML from './VoteChoiceHTML';
import { humanized_time_span } from '../utils/humanized_time_span.js';
import NakaChannelMessage from './NakaChannelMessage';

export default class MainScene extends Phaser.Scene {

  localState!: LocalGameState;
  staticData!: StaticData;
  dynamicData!: DynamicData;
  dynamicVoteChoicesHTML!: VoteChoiceHTML[];
  socket!: Socket;
  getSystemUsers!: User[];

  teams_data!: object;
  barks_data!: object;
  items_data!: object;
  story_data!: object;
  notifications_data!: object;
  voteScenarios_data!: object;
  dynamicVoteOptions_data!: object;
  colours_data!: object;
  labels_data!: object;
  videoContent_data!: object;
  chatChannels_data!: object;
  

  whiteIconPath: string = "/assets/white_icons/";

  teamProfilePages!: Phaser.GameObjects.DOMElement[];
  landingPage!: Phaser.GameObjects.DOMElement; 
  header!: Phaser.GameObjects.DOMElement;
  footer!: Phaser.GameObjects.DOMElement;
  chatPage!: Phaser.GameObjects.DOMElement;
  votePage!: Phaser.GameObjects.DOMElement;
  leaderboardPage!: Phaser.GameObjects.DOMElement;
  helpPage!: Phaser.GameObjects.DOMElement;
  settingsPage!: Phaser.GameObjects.DOMElement;
  videoPlayerOverlay!: Phaser.GameObjects.DOMElement;
  session!: Session;
  client!: Client;
  match!: Match;
  textElement!: HTMLElement;
  anotherTextElement!: HTMLElement;
  messageInput!: HTMLInputElement;
  danceFloor!: HTMLElement;
  chatMessageContainer!: HTMLElement;
  storeMatchReferece!: StorageObjects;

  slideDownButton!: Phaser.GameObjects.DOMElement;
  chatChannelOpen!: HTMLElement;
  chatChannels!: HTMLElement;
  chatSubmitButton!: HTMLElement;
  chatChannelTitle!: HTMLElement;
  chatChannelIcon!: HTMLImageElement;
  returnToChatChannelsButton!: HTMLElement;
  settingsFooterButton!: HTMLElement;
  chatFooterButton!: HTMLElement;
  leaderboardHeaderButton!: HTMLElement;
  voteFooterButton!: HTMLElement;
  videoFooterButton!: HTMLElement;
  helpHeaderButton!: HTMLElement;
  closeSettingsPageButton!: HTMLElement;
  closeChatPageButton!: HTMLElement;
  closeChatChannelsPageButton!: HTMLElement;
  chatChannelContainer!: HTMLElement;
  closeVotePageButton!: HTMLElement;
  closeHelpPageButton!: HTMLElement;
  closeVideoPlayerButton!: HTMLElement;
  playVideoPlayerButton!: HTMLElement;
  pauseVideoPlayerButton!: HTMLElement;
  loadNextVideoPlayerButton!: HTMLElement;
  loadPreviousVideoPlayerButton!: HTMLElement;
  currentVideoTitle!: HTMLElement;
  
  leaderboardRows!: HTMLElement[];

  roundCounter!: HTMLElement;
  actionPointsCounter!: HTMLElement;
  sparksCounter!: HTMLElement;

  tapAreaLeft;
  tapAreaRight;

  logo;

  avatarOverlayButton!: HTMLElement;
  overlayProgressBar!: HTMLInputElement;
  overlayProgressContainer!: HTMLElement;
  overlayEliminated!: HTMLElement;
  voteContainer!: HTMLElement;
  waitForDynamicVotes!: HTMLElement;
  
  avatarOverlay!: Phaser.GameObjects.DOMElement;
  videoPlayerContainer!: HTMLElement;
  notificationHome!: Phaser.GameObjects.DOMElement;

  voteChoiceOneUser!: HTMLElement;
  voteChoiceOneGlobal!: HTMLElement;
  voteChoiceTwoUser!: HTMLElement;
  voteChoiceTwoGlobal!: HTMLElement;

  width!: number;
  height!: number;

  carouselTapBool!: boolean;
  mouseDownOnLeaderboardButton: boolean = false;
  newRound: boolean = false; 

  //starfield
  distance = 300;
  speed = 1;
  starSprite;
  starFieldTexture;
  max = 100;
  listOfColours!: number[];
  xx!: number[];
  yy!: number[];
  zz!: number[];

  storeMouseYPosition: number = 0;
  leaderboardIsOpen: boolean = false;

  depthLayers: object = { gameLayer: 0, background: 0, foreground: 1, overlay: 2, slideDownPage: 3, headerFooter: 4, curtains: 4, slideDownButton: 5, notifications: 6, videoPlayer: 7 };

  //avatarRenderTextures
  avatarRenderTextures;
  avatarSprites;

  assetsLoaded: boolean = false;
  startStarField: boolean = false;
  startCharacterGraphics: boolean = false;

  danceFloorAudioOne;
  danceFloorAudioTwo;


  receiveServerNotifications: boolean = false;

  webConfig;
  rexVideoPlayer;

  constructor() {
    super('MainScene');
  }

  preload() {
    //this.load.crossOrigin = "Anonymous";
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    this.localState = new LocalGameState();
    this.localState.StartAppState();
    this.localState.UpdateAppState(AppState.LoadingScreen);

    this.LoadingBar();

    this.load.atlas('atlas', '/assets/test_avatars/avatar_atlas.png', ' /assets/json/avatar_atlas.json');
    this.load.image('arrow', '/assets/images/arrow.png');
    this.load.image('star', '/assets/images/star.png');
    this.load.image('heart', '/assets/images/heart.png');
    this.load.image('galaxy', '/assets/images/galaxy.png');
    this.load.image('spotlight', '/assets/images/spotlight2.png');
    this.load.json('voteScenarios_content', '/assets/json/VotingScenarios.json'); //https://digidamara.com/data/eng/VotingScenarios.json
    this.load.json('teams_content', '/assets/json/Teams.json');
    this.load.json('barks_content', '/assets/json/Barks.json');
    this.load.json('items_content', '/assets/json/Items.json');
    this.load.json('story_content', '/assets/json/Story.json');
    this.load.json('notifications_content', '/assets/json/Notifications.json');
    this.load.json('appLabels_content', '/assets/json/Labels.json');
    this.load.json('video_content', '/assets/json/VideoContent.json');
    this.load.json('chat_channels', '/assets/json/ChatChannels.json');
    this.load.json('eightpath', '/assets/json/paths/path_2.json');
    this.load.json('web_config', '/assets/json/web_config.json');
    this.load.json('dynamicVoteOptions_content', '/assets/json/DynamicVoteOptions.json');
    this.load.json('colours_content', '/assets/json/Colours.json');

    this.load.audio('danceFloorAudioOne', ['/assets/audio/DDM-DanceFloor-1.mp3']);
    this.load.audio('danceFloorAudioTwo', ['/assets/audio/DDM-DanceFloor-2.mp3']);

    //this.load.on('complete', () => {this.flag = true});
  }

  keyboardOn: boolean = false;
  storeHeightSize: number = 0;

  SetResizeListener()
  {
    this.storeHeightSize = window.innerHeight;
    console.log("STORED HEIGHT::: " + this.storeHeightSize); 

    window.addEventListener("resize", (e) => {
      var deviceType = this.GetDeviceType();
      var newHeight = window.innerHeight;
      console.log("STORED HEIGHT::: " + this.storeHeightSize + " NEW HEIGHT::: " + newHeight);
      switch(deviceType)
      {
        case "tablet":
        case "mobile":
          if(!this.keyboardOn)
          {
            if(newHeight < this.storeHeightSize-40)
            {
              console.log("turn on keyboard");
              document.documentElement.style.setProperty('overflow', 'auto'); 
              const metaViewport = document.querySelector('meta[name=viewport]') as Element;
              metaViewport.setAttribute('content', 'height=' + this.height + 'px, width=device-width, initial-scale=1.0');
              this.footer.setVisible(false);
              this.storeHeightSize = newHeight;
              this.keyboardOn = true;
            }
          }
          else
          {
            if(newHeight > this.storeHeightSize+40)
            {
              console.log("turn off keyboard");
              const metaViewport = document.querySelector('meta[name=viewport]') as Element;
              metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
              this.footer.setVisible(true);
              this.keyboardOn = false;
              this.storeHeightSize = newHeight;
            }
          }
          break;
        case "desktop": 
          console.log("desktop");
          break;
      }
    });
  }

  ShowVideo(scene: Scene, width: number, height: number, url: string) {
    this.rexVideoPlayer = scene.add.rexYoutubePlayer( //this does work, typescript def error :/
      -width, -height, Math.min(Math.max(width*0.7, 360),1000), Math.min(Math.max((width*0.7*0.5625), 360*0.5625),562),
      {
        videoId: url,
        autoPlay: false
      }).on('ready', () => {
        this.rexVideoPlayer.setPosition(0, 0);
        var playeriFrame = document.querySelectorAll('iframe')[0];
        this.videoPlayerContainer.append(playeriFrame);
      }).on('statechange', () => {
        console.log("video state" + this.rexVideoPlayer.videoState);
      }
      );
    //this.rexVideoPlayer.
  }

  async LoadingBar() {
    this.load.image('logo', '/assets/images/logo.png');
    var { width, height } = this.sys.game.canvas;
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 2 - (160), height / 2 - (10), 320, 50);

    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 + 150,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        color: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 + 195,
      text: '0%',
      style: {
        font: '18px monospace',
        color: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 250,
      text: '',
      style: {
        font: '18px monospace',
        color: '#ffffff'
      }
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', function (value) {
      percentText.setText(parseInt("" + (value * 100)) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(width / 2 - 150, height / 2 - (0), 300 * value, 30);
    });

    this.load.on('fileprogress', function (file) {
      assetText.setText('Loading asset: ' + file.key);
    });
    this.load.on('complete', async () => {
      await this.delay(3000);
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.logo.destroy();
      this.assetsLoaded = true;
      this.localState.UpdateAppState(AppState.AppOpen);
    });
  }

  create() //to tackle - server code and setup for typescript!
  {
    var { width, height } = this.sys.game.canvas;
    this.SetResizeListener();
    console.log('load Main Scene');
    this.logo = this.add.image(width / 2, height / 2 - 200, 'logo');
    this.logo.scale = Math.min(((0.8 * width) / 512), 1.5);
    this.IS_TOUCH = 0;
    this.AsyncCreate();
  }

  SetupNotifications() {
    /* bulmaToast.setDefaults({
      type: 'is-warning',
      position: 'top-center',
      closeOnClick: true,
      pauseOnHover: true,
      duration: 100000,
      dismissible: true,
      appendTo: this.notificationsArea
    }); */

    this.receiveServerNotifications = true;
  }

  async LoadJSON() {
    this.teams_data = this.cache.json.get('teams_content') as object;
    this.barks_data = this.cache.json.get('barks_content') as object;
    this.items_data = this.cache.json.get('items_content') as object;
    this.story_data = this.cache.json.get('story_content') as object;
    this.notifications_data = this.cache.json.get('notifications_content') as object;
    this.voteScenarios_data = this.cache.json.get('voteScenarios_content') as object;
    this.dynamicVoteOptions_data = this.cache.json.get('dynamicVoteOptions_content') as object;
    this.labels_data = this.cache.json.get('appLabels_content') as object;
    this.videoContent_data = this.cache.json.get('video_content') as object;
    this.chatChannels_data = this.cache.json.get('chat_channels') as object;
    this.webConfig = this.cache.json.get('web_config') as object;
    this.colours_data = this.cache.json.get("colours_content") as object;
  }

  IS_TOUCH!: number;


  SetupLeaderboardForMouse() {
    /* this.leaderboardHeaderButton.addEventListener("mousedown", () => {
      console.log("mousedown");
      addEventListener("mousemove", this.onDrag);
    });

    addEventListener("mouseup", () => {
      console.log("mouseup");
      removeEventListener("mousemove", this.onDrag);
      this.SetPositionOfLeaderBoardAndSlideDownButton();
    }); */

    this.leaderboardHeaderButton.onclick = () => {

      this.SetPositionOfLeaderBoardAndSlideDownButton()
    }
  }



  onFirstMouseDown(e: MouseEvent) {
    /* console.log("touch = " + this.IS_TOUCH);

    this.IS_TOUCH = 1 as number;
    this.SetupLeaderboardForMouse(); */
  }

  SetupLeaderboardForTouch() {
    this.leaderboardHeaderButton.addEventListener("touchstart", () => {
      addEventListener("touchmove", this.onDragTouch);
    });

    this.SetupTouchSlideDownButton();

    addEventListener("touchend", () => {

      removeEventListener("touchmove", this.onDragTouch);
    });
  }

  onFirstTouchDown(e: TouchEvent) {
    /* if (this.IS_TOUCH == 0) {
      this.IS_TOUCH = 2;
      this.SetupLeaderboardForTouch();
      window.removeEventListener('touchstart', this.onFirstTouchDown);
      window.removeEventListener('mousedown', this.onFirstMouseDown);
    } */
  }

  SetupClickSlideDownButton() {
    this.leaderboardHeaderButton.onclick = () => {

      if (!this.leaderboardIsOpen) {
        console.log("OpenTheLeaderBoard");
        this.leaderboardPage.setY(this.height / 2);
        this.leaderboardHeaderButton.style.top = "calc(100vh - 260px)";
        this.leaderboardIsOpen = true;
      }
      else {
        console.log("CloseTheLeaderboard");
        this.leaderboardPage.setY(-10000);
        this.leaderboardHeaderButton.style.top = "0px";
        this.leaderboardIsOpen = false;
      }
    };
  }

  SetupTouchSlideDownButton() {
    this.leaderboardHeaderButton.onclick = () => {

      if (!this.leaderboardIsOpen) {
        console.log("OpenTheLeaderBoard");
        this.leaderboardPage.setY(this.height / 2);
        this.leaderboardHeaderButton.style.top = "calc(100vh - 260px)";
        this.leaderboardIsOpen = true;
      }
      else {
        console.log("CloseTheLeaderboard");
        this.leaderboardPage.setY(-10000);
        this.leaderboardHeaderButton.style.top = "0px";
        this.leaderboardIsOpen = false;
      }
    };
  }

  SetPositionOfLeaderBoardAndSlideDownButton() {
    console.log("leaderboard is open? " + this.leaderboardIsOpen + ", Y? " + this.storeMouseYPosition + ", Height? " + this.height);
    if (!this.leaderboardIsOpen) {
      //if (this.storeMouseYPosition > this.height / 2) {
        console.log("OpenTheLeaderBoard");
        this.leaderboardPage.setY(this.height / 2 - 16);
        this.leaderboardHeaderButton.style.top = "calc(100vh - 258px)";
        this.leaderboardIsOpen = true;
      /* }
      else {
        console.log("KeepClosed");
        this.leaderboardPage.setY(-10000);
        this.leaderboardHeaderButton.style.top = "0px";
        this.leaderboardIsOpen = false;
      } */
    }
    else {
      /* if (this.storeMouseYPosition > this.height / 2) {
        console.log("KeepOpen");
        this.leaderboardPage.setY(this.height / 2 - 16);
        this.leaderboardHeaderButton.style.top = "calc(100vh - 258px)";
        this.leaderboardIsOpen = true;
      }
      else { */
        console.log("CloseTheLeaderboard");
        this.leaderboardPage.setY(-10000);
        this.leaderboardHeaderButton.style.top = "0px";
        this.leaderboardIsOpen = false;
      //}
    }
  }

  onDrag = (event: MouseEvent) => {
    let getStyle = window.getComputedStyle(this.leaderboardHeaderButton);
    let top = parseInt(getStyle.top);
    this.leaderboardHeaderButton.style.top = `${event.clientY - 112}px`;
    this.leaderboardPage.setY(event.clientY - this.leaderboardPage.height / 2);
    this.storeMouseYPosition = event.clientY;
    console.log("drag " + event.clientY);
  }

  previousTouch!: Touch;

  onDragTouch = (event: TouchEvent) => {

    const touch = event.touches[0];

    if (this.previousTouch) {
      var movementY = touch.pageY - this.previousTouch.pageY;
      let getStyle = window.getComputedStyle(this.leaderboardHeaderButton);
      let top = parseInt(getStyle.top);
      this.leaderboardHeaderButton.style.top = `${top + movementY}px`;
      this.leaderboardPage.setY(touch.clientY - this.leaderboardPage.height / 2);
      this.storeMouseYPosition = touch.clientY;

    }

    this.previousTouch = touch;
  }

  storeDeviceId!: string;
  hasValidActivationCode: boolean = false;
  hasValidStoredDeviceId: boolean = false;
  emailQueryVar: string = "";
  activationCodeQueryVar: string = "";

  async AsyncCreate() {

    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop as string),
    });
    // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
    this.emailQueryVar = params["email"]; // "some_value"
    //let usernameQueryVar = params["username"]; 
    this.activationCodeQueryVar = params["activationCode"]; 
    
    if(this.emailQueryVar == null || this.emailQueryVar == undefined || this.emailQueryVar == "")
    {
      this.hasValidActivationCode = false;
      console.log("no email value");
    }
    else
    {
      var noLocalStorage = false; 

      
      var storeEmail = await this.ReadJSONFromLocalStorage("storeEmail") as object;
      if(storeEmail == undefined || storeEmail == null)
      {
        noLocalStorage = true;
      }
      else if(storeEmail["email"] == undefined || storeEmail["email"] == null || storeEmail["email"] == "")
      {
        noLocalStorage = true;
      }
      
      if(noLocalStorage)
      {
        if(true) // activationCodeQueryVar is valid
        {
          var emailJson = {"email": this.emailQueryVar} as object;
          await localStorage.setItem("storeEmail", JSON.stringify(emailJson));
          this.hasValidActivationCode = true;
          console.log("have an email value");
        }  
      }
      else
      {
        if(this.emailQueryVar == storeEmail["email"] as string)
        {
          this.hasValidActivationCode = false;
          console.log("have previous email");
        }
        else
        {
          if(true) // activationCodeQueryVar is valid
          {
            var emailJson = {"email": this.emailQueryVar} as object;
            await localStorage.setItem("storeEmail", JSON.stringify(emailJson));
            this.hasValidActivationCode = true;
            console.log("have an email value");
          }  
        }
      }
    }

    
    await this.waitUntilAssetsLoaded();
    await this.LoadJSON();
    await this.GetLatestStaticData();

    if(!this.hasValidActivationCode)
    {
      // do you have a device id?
      try {
        const key = await localStorage.getItem('ddm_localData');
        console.log("deviceId: " + key);
        const value = JSON.parse(key as string);
  
        if (value !== null){
          this.storeDeviceId = value.deviceId as string;
          this.hasValidStoredDeviceId = true;
          console.log("I have a valid device id");
        }
        else
        {
          console.log("I DON'T have a valid device id");
          this.hasValidStoredDeviceId = false;
        }
      }
      catch (error) {
        console.log("An error occurred: %o", error);
      }
    }

    if(!this.hasValidStoredDeviceId && !this.hasValidActivationCode)
    {
      console.log("I DON'T have a valid device id or a valid activation code");
      this.ShowLandingPage();
      return;
    }

    this.localState.UpdateAppState(AppState.CurtainsClosed);
    //var firstTimeTodayCurtainsClosed = await this.ReadFromDDMLocalStorageBoolean("firstVisitTodayWithCurtainsClosed");

    //show initial info - requires a rethink

    await this.delay(1200);
    this.localState.UpdateAppState(AppState.CurtainsOpen);

    //console.log(this.cache.json);1
    this.width = this.sys.game.canvas.width;
    this.height = this.sys.game.canvas.height;

    const leftCurtain = this.add.graphics();
    const rightCurtain = this.add.graphics();
    const dots = Math.floor(this.height / 50);
    leftCurtain.fillStyle(0x545454, 1);
    leftCurtain.fillRect(0, 0, this.width / 2, this.height);
    leftCurtain.fillStyle(0x2a2a2a);
    leftCurtain.fillRect(this.width / 2 - 3, 0, 3, this.height);
    for (var i = 0; i < dots; i++) {
      leftCurtain.fillCircle(this.width / 2 - 10, i * this.height / dots, 4);
    }
    leftCurtain.depth = this.depthLayers["curtains"];
    rightCurtain.fillStyle(0x545454, 1);
    rightCurtain.fillRect(this.width / 2, 0, this.width / 2, this.height);
    rightCurtain.fillStyle(0x2a2a2a);
    rightCurtain.fillRect(this.width / 2, 0, 3, this.height);
    for (var i = 0; i < dots; i++) {
      rightCurtain.fillCircle(this.width / 2 + 10, i * this.height / dots, 4);
    }
    rightCurtain.depth = this.depthLayers["curtains"];

    var leftCurtainTween = this.tweens.add(
      {
        targets: leftCurtain,
        x: -this.width,
        duration: 2200,
        ease: 'Quad.easeIn',
        yoyo: false,
        loop: 0,
        delay: 1000
      }
    );

    var rightCurtainTween = this.tweens.add(
      {
        targets: rightCurtain,
        x: this.width,
        duration: 2200,
        ease: 'Quad.easeIn',
        yoyo: false,
        loop: 0,
        delay: 1000,
        onComplete: () => { this.avatarOverlay.setVisible(true); }
      }
    );

    this.leaderboardRows = [];

    const game = document.getElementsByTagName('canvas')[0];
    game.style.setProperty('position', 'absolute');
    game.style.setProperty('z-index', '-1');

    this.header = this.add.dom(this.width / 2, 55, Header() as HTMLElement);
    this.footer = this.add.dom(this.width / 2, 55, Footer() as HTMLElement);
    this.header.depth = this.depthLayers["headerFooter"];
    this.footer.depth = this.depthLayers["headerFooter"];

    this.videoPlayerOverlay = this.add.dom(this.width / 2, this.height / 2, VideoPlayerOverlay() as HTMLElement);
    this.videoPlayerOverlay.setDepth(this.depthLayers["videoPlayer"]);
    this.votePage = this.add.dom(0, 0, VotingPage() as HTMLElement);
    this.helpPage = this.add.dom(0, 0, HelpPage() as HTMLElement);
    this.settingsPage = this.add.dom(0, 0, SettingsPage() as HTMLElement);
    const slideDownButton = this.add.dom(this.width / 2, this.height / 2, SlideDownButton() as HTMLElement);
    slideDownButton.depth = this.depthLayers["slideDownButton"];

    this.leaderboardPage = this.add.dom(this.width / 2, this.height / 2, LeaderboardPage() as HTMLElement);
    this.notificationHome = this.add.dom(this.width / 2, 190, NotificationHome('', '') as HTMLElement);
    this.avatarOverlay = this.add.dom(this.width / 2, 0, AvatarOverlay('open') as HTMLElement);
    this.overlayProgressBar = this.avatarOverlay.getChildByID("teamEnergyBar") as HTMLInputElement;
    this.overlayProgressContainer = this.avatarOverlay.getChildByID("teamProgressContainer") as HTMLInputElement;
    this.overlayEliminated = this.avatarOverlay.getChildByID("teamEliminated") as HTMLInputElement;
    this.videoPlayerContainer = this.videoPlayerOverlay.getChildByID("video-player") as HTMLElement;
    this.currentVideoTitle = this.videoPlayerOverlay.getChildByID("video-player-overlay-title") as HTMLElement;
    this.leaderboardPage.depth = this.depthLayers["slideDownPage"];;
    this.leaderboardPage.setY(-10000);
    this.avatarOverlay.setVisible(false);
    this.videoPlayerOverlay.setVisible(false);
    this.notificationHome.setVisible(false);
    this.votePage.setVisible(false);
    this.helpPage.setVisible(false);
    this.settingsPage.setVisible(false);

    //audio
    this.danceFloorAudioOne = this.sound.add('danceFloorAudioOne', {
      volume: 0.4,
      loop: true,

    }) as Phaser.Sound.BaseSound;
    this.danceFloorAudioTwo = this.sound.add('danceFloorAudioTwo', {
      volume: 0.0,
      loop: true
    }) as Phaser.Sound.BaseSound;

    this.roundCounter = this.header.getChildByID("round-header-value") as HTMLElement;
    this.actionPointsCounter = this.header.getChildByID("ap-header-value") as HTMLElement;
    this.sparksCounter = this.header.getChildByID("sparks-header-value") as HTMLElement;
    this.chatFooterButton = this.footer.getChildByID('chat-footer-button') as HTMLElement;
    this.videoFooterButton = this.footer.getChildByID('video-footer-button') as HTMLElement;
    this.voteFooterButton = this.footer.getChildByID('vote-footer-button') as HTMLElement;
    this.helpHeaderButton = this.header.getChildByID('help-header-button') as HTMLElement;
    this.settingsFooterButton = this.footer.getChildByID('settings-footer-button') as HTMLElement;
    this.closeVotePageButton = this.votePage.getChildByID('close-voting-page-button') as HTMLElement;
    this.voteContainer = this.votePage.getChildByID('vote-container') as HTMLElement;
    this.closeVideoPlayerButton = this.videoPlayerOverlay.getChildByID('video-overlay-button-close') as HTMLElement;
    this.playVideoPlayerButton = this.videoPlayerOverlay.getChildByID('video-player-button-play') as HTMLElement;
    this.pauseVideoPlayerButton = this.videoPlayerOverlay.getChildByID('video-player-button-pause') as HTMLElement;
    this.loadNextVideoPlayerButton = this.videoPlayerOverlay.getChildByID('video-player-button-next') as HTMLElement;
    this.loadPreviousVideoPlayerButton = this.videoPlayerOverlay.getChildByID('video-player-button-previous') as HTMLElement;
    this.leaderboardHeaderButton = slideDownButton.getChildByID('leaderboard-header-button') as HTMLElement;
    this.closeHelpPageButton = this.helpPage.getChildByID('close-help-page-button') as HTMLElement;
    this.closeSettingsPageButton = this.settingsPage.getChildByID('close-settings-page-button') as HTMLElement;
    this.avatarOverlayButton = this.avatarOverlay.getChildByID('openProfile') as HTMLElement;

    this.voteFooterButton.onclick = () => {
      this.SetPage("votePage");
      this.tapAreaLeft.removeInteractive();
      this.tapAreaRight.removeInteractive();
    }
    this.settingsFooterButton.onclick = () => {
      this.SetPage("settingsPage");
      this.tapAreaLeft.removeInteractive();
      this.tapAreaRight.removeInteractive();
    }
    this.helpHeaderButton.onclick = () => {
      this.SetPage("helpPage");
      this.tapAreaLeft.removeInteractive();
      this.tapAreaRight.removeInteractive();
    }
    this.videoFooterButton.onclick = () => {
      this.SetPage("videoOverlay");
      this.FadeOutDanceFloorAudio();
      this.tapAreaLeft.removeInteractive();
      this.tapAreaRight.removeInteractive();
    }
    this.closeVideoPlayerButton.onclick = () => {
      this.FadeInDanceFloorAudioOne();
      this.PauseCurrentVideo();
      this.SetPage("avatarOverlay");
      this.tapAreaLeft.setInteractive();
      this.tapAreaRight.setInteractive();
    }
    this.closeHelpPageButton.onclick = () => {
      this.SetPage("avatarOverlay");
      this.tapAreaLeft.setInteractive();
      this.tapAreaRight.setInteractive();
    }
    this.closeSettingsPageButton.onclick = () => {
      this.SetPage("avatarOverlay");
      this.tapAreaLeft.setInteractive();
      this.tapAreaRight.setInteractive();
    }
    this.closeVotePageButton.onclick = () => {
      this.SetPage("avatarOverlay");
      this.tapAreaLeft.setInteractive();
      this.tapAreaRight.setInteractive();
    }
    this.avatarOverlayButton.onclick = () => {
      this.SetPage("teamProfile");
      var donateButton = this.teamProfilePages[this.localState.carouselPosition].getChildByID('donate-button') as HTMLInputElement;
      var fanClubButton = this.teamProfilePages[this.localState.carouselPosition].getChildByID('fan-club-button') as HTMLInputElement;
      var upgradeButton = this.teamProfilePages[this.localState.carouselPosition].getChildByID('upgrade-button') as HTMLInputElement;
      var tagsActive = this.teamProfilePages[this.localState.carouselPosition].node.getElementsByClassName("tagsActive");
      var tagsNotEnoughAP = this.teamProfilePages[this.localState.carouselPosition].node.getElementsByClassName("tagsNotEnoughAP");
      var tagsEliminated = this.teamProfilePages[this.localState.carouselPosition].node.getElementsByClassName("tagsEliminated");

      if (this.localState.GetCurrentTeamState().eliminated) {
        donateButton.classList.remove("is-primary");
        donateButton.classList.add("is-danger");
        donateButton.setAttribute("disabled", '');
        fanClubButton.classList.remove("is-primary");
        fanClubButton.classList.add("is-danger");
        fanClubButton.setAttribute("disabled", '');
        upgradeButton.classList.remove("is-primary");
        upgradeButton.classList.add("is-danger");
        upgradeButton.setAttribute("disabled", '');

        Array.from(tagsActive).forEach(element => {
          (element as HTMLElement).style.display = "none";
        });

        Array.from(tagsNotEnoughAP).forEach(element => {
          (element as HTMLElement).style.display = "none";
        });

        Array.from(tagsEliminated).forEach(element => {
          (element as HTMLElement).style.display = "block";
        });

      }
      else if (this.localState.actionPoints == 0) {
        donateButton.setAttribute("disabled", '');
        fanClubButton.setAttribute("disabled", '');
        upgradeButton.setAttribute("disabled", '');

        Array.from(tagsActive).forEach(element => {
          (element as HTMLElement).style.display = "none";
        });

        Array.from(tagsNotEnoughAP).forEach(element => {
          (element as HTMLElement).style.display = "block";
        });

        Array.from(tagsEliminated).forEach(element => {
          (element as HTMLElement).style.display = "none";
        });
      }
      else {
        donateButton.removeAttribute("disabled");
        fanClubButton.removeAttribute("disabled");
        upgradeButton.removeAttribute("disabled");

        Array.from(tagsActive).forEach(element => {
          (element as HTMLElement).style.display = "block";
        });

        Array.from(tagsNotEnoughAP).forEach(element => {
          (element as HTMLElement).style.display = "none";
        });

        Array.from(tagsEliminated).forEach(element => {
          (element as HTMLElement).style.display = "none";
        });
      }

      this.tapAreaLeft.removeInteractive();
      this.tapAreaRight.removeInteractive();
    }
    this.loadNextVideoPlayerButton.onclick = () => {
      this.NextVideo();
    }
    this.loadPreviousVideoPlayerButton.onclick = () => {
      this.PreviousVideo();
    }
    this.playVideoPlayerButton.onclick = () => {
      this.PlayCurrentVideo();
    }
    this.pauseVideoPlayerButton.onclick = () => {
      this.PauseCurrentVideo();
    }

    this.SetupNotifications();

    //-----------------------------

    const spotlight = this.add.image(this.width / 2, this.height / 2, 'spotlight');
    spotlight.setAlpha(0.4);
    spotlight.scaleY = this.height / 500;
    spotlight.scaleX = Math.max(1, this.width / 1000);


    

    this.StarField();

    this.SetupDynamicVoteChoices();

    await this.StartClientConnection();

    this.ShowVideo(this, this.width, this.height, "wVVr4Jq_lMI");

    this.SetupLeaderboardForMouse();

    if (!this.sound.locked) {
      // already unlocked so play
      this.danceFloorAudioOne.play();
      this.danceFloorAudioTwo.play();

    }
    else {
      // wait for 'unlocked' to fire and then play
      this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
        this.danceFloorAudioOne.play();
        this.danceFloorAudioTwo.play();
      })
    }

    var firstTimeTodayOpen = await this.ReadFromDDMLocalStorageBoolean("firstVisitTodayWithCurtainsOpen");
    if (firstTimeTodayOpen) {
      console.log("firstVisitTodayWithCurtainsOpen");
      await this.CallNotificationsForTheDay();
    }
  }

  ShowLandingPage()
  {
    var innerHTML = this.GetLabel("l_landing_page") as string;
    const landingPage = this.add.dom(0, 0, LandingPage(innerHTML) as HTMLElement);
  }

  StartTimeLeftTiner() {
    var timer = this.time.addEvent({
      delay: 1000,                // ms
      callback: this.TimeLeftTimer,
      //args: [],
      callbackScope: this,
      loop: true
    });
  }

  MillisecondsToTime(duration) {
    var milliseconds = Math.floor((duration % 1000) / 100);
    var seconds = Math.floor((duration / 1000) % 60);
    var minutes = Math.floor((duration / (1000 * 60)) % 60);
    var hours = Math.floor((duration / (1000 * 60 * 60)));

    var hoursString = hours.toString();
    var minutesString = (minutes < 10) ? "0" + minutes : minutes;
    var secondsString = (seconds < 10) ? "0" + seconds : seconds;

    if(hours >= 10)
    {
      return hoursString + ":" + minutesString;  
    }
    else
    {
        return hoursString + ":" + minutesString + ":" + secondsString;
    }

  }

  TimeLeftTimer()
  {
    var timeRange = new Date(this.localState.endOfShowDateTime).getTime() - new Date(Date.now()).getTime();
    timeRange = Math.max(timeRange,0);
    this.roundCounter.innerHTML = this.MillisecondsToTime(timeRange);
  }

  dailyNotificationCount: number = 0;
  dailyNotificationTotal: number = 0;

  async CallNotificationsForTheDay() {
    var todaysNotifications = this.staticData.notifications.filter(p => p.round == this.localState.round);
    todaysNotifications = todaysNotifications.filter(p => p.type == "arrivetoday");
    console.log("**** round: " + this.localState.round + " todaysnotifications: " + todaysNotifications.length);

    var orderedNotifications = todaysNotifications.sort(
      (notificationA, notificationB) => {
        return notificationA.order - notificationB.order;
      }
    );

    var notificationsState = await this.ReadFromDDMLocalStorage("notificationsState");
    
    orderedNotifications.forEach(
      (notification) => {
        console.log("notification: " + notification.id);
        var seen = notificationsState[notification.id].seen;
        if (seen == false) {
          this.dailyNotificationTotal++;
          console.log("****2");
          this.QueueNotificationHome(notification.id);
        }
      }
    )
    await this.DisplayQueuedNotification(1000);
  }

  async DisplayQueuedNotification(delay: number) {
    if (this.queuedNotificationList.length > 0) {
      console.log("****3");
      var id = this.queuedNotificationList[0];
      await this.delay(delay);
      this.DisplayNotificationHome(id);
      this.UnqueueFirstNotificationHome();
    }
  }

  async FadeInOutDanceFloorAudioTwo() {
    if (!this.localState.danceFloorAudioTwoPlaying) {
      this.FadeInDanceFloorAudioTwo();
      this.localState.DanceFloorTwoAudio(true);
      await this.delay(1000 * 5);
      this.FadeInDanceFloorAudioOne();
      await this.delay(500);
      this.localState.DanceFloorTwoAudio(false);
    }
  }

  FadeInDanceFloorAudioOne() {
    this.tweens.add({
      targets: this.danceFloorAudioTwo,
      volume: 0,
      duration: 500
    },
    );
    this.tweens.add({
      targets: this.danceFloorAudioOne,
      volume: 0.4,
      duration: 500
    },
    );
  }

  FadeInDanceFloorAudioTwo() {
    this.tweens.add({
      targets: this.danceFloorAudioOne,
      volume: 0,
      duration: 400
    },
    );
    this.tweens.add({
      targets: this.danceFloorAudioTwo,
      volume: 0.6,
      duration: 400
    },
    );
  }

  FadeOutDanceFloorAudio() {
    this.tweens.add({
      targets: this.danceFloorAudioOne,
      volume: 0,
      duration: 400
    },
    );
    this.tweens.add({
      targets: this.danceFloorAudioTwo,
      volume: 0,
      duration: 400
    },
    );
  }

  GetListOfActiveVideos() {
    var listOfActiveVideos: string[] = [];
    this.staticData.videoContent.forEach((videoContent) => {
      if (videoContent.active) {
        listOfActiveVideos.push(videoContent.youtubeId);
      }
    });
    return listOfActiveVideos;
  }

  NextVideo() {
    var list = this.GetListOfActiveVideos();
    var index = this.localState.RollVideoContent(1, list.length);
    this.currentVideoTitle.innerHTML = this.staticData.videoContent[index].title;
    this.LoadCurrentVideo(index, list);
  }

  LoadCurrentVideo(index: number, list) {
    this.rexVideoPlayer.load(list[index]);
  }

  PreviousVideo() {
    var list = this.GetListOfActiveVideos();
    var index = this.localState.RollVideoContent(-1, list.length);
    this.currentVideoTitle.innerHTML = this.staticData.videoContent[index].title;
    this.LoadCurrentVideo(index, list);
  }

  PlayCurrentVideo() {
    /* var playeriFrame = document.querySelectorAll('iframe')[0];
    var requestFullScreen = playeriFrame.requestFullscreen || playeriFrame.mozRequestFullScreen || playeriFrame.webkitRequestFullscreen;
    if (requestFullScreen) {
      requestFullScreen.bind(playeriFrame)();
    } */
      this.rexVideoPlayer.play();
  }

  PauseCurrentVideo() {
    this.rexVideoPlayer.pause();
  }

  async GetLatestStaticData() {
    this.staticData = await new StaticData();
    this.staticData.Init(
      this.teams_data,
      this.barks_data,
      this.items_data,
      this.story_data,
      this.notifications_data,
      this.voteScenarios_data,
      this.dynamicVoteOptions_data,
      this.labels_data,
      this.videoContent_data,
      this.chatChannels_data,
      this.colours_data
    );
  }

  SetupDynamicVoteChoices()
  {
    this.dynamicVoteChoicesHTML = [];
  }

  async GetSystemUsers() {
    this.getSystemUsers = (await this.client.getUsers(this.session, [], ['SystemUser'])).users as User[];
  }

  SetOverlayProgress(value: number, maxValue: number) {
    console.log("progress: " + value + " " + maxValue);
    var normalisedValue = Math.floor(value / maxValue * 100).toString();
    this.overlayProgressBar.value = normalisedValue;
  }

  SetTeamProfileProgress(value: number, maxValue: number, teamIndex: number) {
    var normalisedValue = Math.floor(value / maxValue * 100).toString();
    var remainder = maxValue - value;
    const getTeamBar = this.teamProfilePages[teamIndex].getChildByID("teamEnergyBar") as HTMLInputElement;
    const getTeamNote = this.teamProfilePages[teamIndex].getChildByID("teamEnergy") as HTMLElement;
    getTeamBar.value = normalisedValue;
    getTeamNote.innerHTML = "Needs " + remainder + "/" + maxValue + " more energy!";
  }

  StartRefreshTimer() {
    var timer = this.time.addEvent({
      delay: 30000,                // ms
      callback: this.RefreshFromDynamicData,
      //args: [],
      callbackScope: this,
      loop: true
    });
  }
  StartTimeAgoTimer() {
    var timer = this.time.addEvent({
      delay: 100000,                // ms
      callback: this.RefreshChat,
      //args: [],
      callbackScope: this,
      loop: true
    });
  }

  async StartClientConnection() {

    //this.client = new Client("defaultkey", "127.0.0.1", "7350", false);
    this.client = new Client("defaultkey", this.webConfig.hostname, this.webConfig.port, this.webConfig.ssl);
    var deviceId = "";
    var create = true;
    var newUserStorage = false;
    var seenTutorial = true;

    //if we have a code, its valid, and we don't have a device id yet:
    if(this.hasValidActivationCode && !this.hasValidStoredDeviceId)
    {
      this.session = await this.client.authenticateEmail(this.emailQueryVar, this.activationCodeQueryVar); //username already set by dotnet client
      deviceId = Phaser.Utils.String.UUID() as string;
      console.log("made it to here");
      var link = await this.client.linkDevice(this.session, {id: deviceId});
      newUserStorage = true;
      var emailJson = {"email": this.emailQueryVar} as object;
      await localStorage.setItem("storeEmail", JSON.stringify(emailJson));
    }
    else if (this.hasValidStoredDeviceId){
      deviceId = this.storeDeviceId;
      try
      {
        this.session = await this.client.authenticateDevice(deviceId, false);
      }
      catch(error){
        console.log("error" + error);
      }
      newUserStorage = false;
    }

    console.info("Successfully authenticated:", this.session);

    var account = await this.client.getAccount(this.session);
    var username = account.user?.username as string;

    if (newUserStorage) {

      localStorage.setItem('ddm_localData', JSON.stringify(
        {
          "deviceId": deviceId,
          "username": username,
          "actionPoints": 5,
          "sparks": 0,
          "round": 0,
          "energyRequirement": 20,
          "t_001UpgradeLevel": 0,
          "t_002UpgradeLevel": 0,
          "t_003UpgradeLevel": 0,
          "t_004UpgradeLevel": 0,
          "t_005UpgradeLevel": 0,
          "t_006UpgradeLevel": 0,
          "t_001InFanClub": false,
          "t_002InFanClub": false,
          "t_003InFanClub": false,
          "t_004InFanClub": false,
          "t_005InFanClub": false,
          "t_006InFanClub": false,
          "v_001_choiceOne": 0,
          "v_001_choiceTwo": 0,
          "v_002_choiceOne": 0,
          "v_002_choiceTwo": 0,
          "v_003_choiceOne": 0,
          "v_003_choiceTwo": 0,
          "v_004_choiceOne": 0,
          "v_004_choiceTwo": 0,
          "v_005_choiceOne": 0,
          "v_005_choiceTwo": 0,
          "v_006_choiceOne": 0,
          "v_006_choiceTwo": 0,
          "notificationsState": {

          },
          "dynamicVote":{
            users:[
              0,0,0,0,0,0
            ]
          },
          firstVisitTodayWithCurtainsClosed: true,
          firstVisitTodayWithCurtainsOpen: true
        }
      ));

      localStorage.setItem('ddm_localDataTutorial', JSON.stringify(
        {
          "deviceId": deviceId,
          "username": username,
          "actionPoints": 5,
          "sparks": 0,
          "round": 0,
          "energyRequirement": 3,
          "t_001UpgradeLevel": 0,
          "t_002UpgradeLevel": 0,
          "t_003UpgradeLevel": 0,
          "t_004UpgradeLevel": 0,
          "t_005UpgradeLevel": 0,
          "t_006UpgradeLevel": 0,
          "t_001InFanClub": false,
          "t_002InFanClub": false,
          "t_003InFanClub": false,
          "t_004InFanClub": false,
          "t_005InFanClub": false,
          "t_006InFanClub": false,
          "v_101_choiceOne": 0,
          "v_101_choiceTwo": 0,
          "notificationsState": {

          },
          "dynamicVote":{
            users:[
              0,0,0,0,0,0
            ]
          },
          firstVisitTodayWithCurtainsClosed: true,
          firstVisitTodayWithCurtainsOpen: true
        }
      ));

      // await this.client.updateAccount(this.session,
      //   {
      //     avatar_url: "https://source.boringavatars.com/marble/50/" + Math.floor(Math.random() * 100000)
      //     //avatar_url: "https://sprites-as-a-service-tblytwilzq-ue.a.run.app/api/v1/sprite?q=" + Math.floor(Math.random() * 100000)
      //   }
      // );
    }

    console.info("Successfully authenticated:", this.session);
    let id: string = this.session.user_id as string;
    console.info("Sesh id:", id);
    
    await this.GetSystemUsers();

    if(!seenTutorial)
    {
      await this.GetLatestDynamicDataTutorial();
      await this.SetupLocalStateTutorial(username);
      await this.SetupTeamProfiles(true);
      this.SetupLeaderboard();
      await this.SetupTeamAvatars();
      await this.SetupVotePage(true);
      await this.SetupChatChannelsAndPages(false);
      this.StartTutorial();
    }
    else
    {
      await this.GetLatestDynamicData();
      await this.SetupLocalState(username);
  
      this.socket = this.client.createSocket(this.webConfig.ssl);
      await this.socket.connect(this.session, true);
  
      if (newUserStorage) {
        var c001id = await this.JoinGroup(this.session, this.client, "c_001");
        var c002id = await this.JoinGroup(this.session, this.client, "c_002");
        //var c003id = await this.JoinGroup(this.session, this.client, "c_003");
        this.localState.AddChatChannels(
          {
            "c_001": c001id,
            "c_002": c002id
          });
  
        const nTrig = {};
        this.staticData.notifications.forEach(
          (notification) => {
            if (notification.type == "arrivetoday") {
              console.log(notification.id);
              nTrig[notification.id] = { seen: false };
            }
          }
        );
        await this.WriteToDDMLocalStorage(["notificationsState"], [nTrig]);
      }
      else {
        var channels = await this.GetGroupsFromAccount();
        this.localState.AddChatChannels(channels);
      }
  
      // use object keys to get each groupId
      for (var key in this.localState.chatChannels) {
        var groupId = this.localState.chatChannels[key];
        await this.JoinGroupChat(this.socket, groupId);
      }
  
      await this.SetupChatChannelsAndPages(false);
      await this.SetupTeamProfiles(false);
      this.SetupLeaderboard();
      await this.SetupTeamAvatars();
      await this.SetupVotePage(false);
  
      await this.JoinMatch(this.socket);
      await this.ReceiveMatchState(this.socket);
  
      var roomname = "PublicChat";
      await this.initializeChat(this.socket);
      await this.AddEventListeners();
      this.StartRefreshTimer();
      this.StartTimeAgoTimer();
      this.StartTimeLeftTiner();
    }


  }

  StartTutorial()
  {
    const driver = new Driver(
    {
      className: 'scoped-class',        // className to wrap driver.js popover
      animate: true,                    // Whether to animate or not
      opacity: 0.75,                    // Background opacity (0 means only popovers and without overlay)
      padding: 10,                      // Distance of element from around the edges
      allowClose: false,                 // Whether the click on overlay should close or not
      overlayClickNext: false,          // Whether the click on overlay should move next
      doneBtnText: 'Done',              // Text on the final button
      closeBtnText: 'Close',            // Text on the close button for this step
      stageBackground: '#00a000',       // Background color for the staged behind highlighted element
      nextBtnText: 'Next',              // Next button text for this step
      prevBtnText: 'Previous',          // Previous button text for this step
      showButtons: true,               // Do not show control buttons in footer
    });

    // Define the steps for introduction
    driver.defineSteps([{
      element: '#ap-value',
      popover: {
        title: 'Title for the Popover',
        description: 'Description for it',
      }
    }]);
    driver.start();
  }

  async AddEventListeners() {
    this.game.events.addListener(Phaser.Core.Events.FOCUS, this.OnFocus, this);
    this.game.events.addListener(Phaser.Core.Events.BLUR, this.OnBlur, this);
  }

  async OnFocus() {
    console.log("on focus");
    this.RefreshFromDynamicData();
  }

  async OnBlur() {
    console.log("on blur");
  }

  async GetLatestDynamicData() {
    var getUserData = await localStorage.getItem("ddm_localData");
    var parsedUserData = JSON.parse(getUserData as string);

    var getTeams = await this.client.readStorageObjects(this.session, {
      "object_ids": [{
        "collection": "teams",
        "key": "t_001",
        "user_id": this.getSystemUsers[0].id
      }, {
        "collection": "teams",
        "key": "t_002",
        "user_id": this.getSystemUsers[0].id
      }, {
        "collection": "teams",
        "key": "t_003",
        "user_id": this.getSystemUsers[0].id
      }, {
        "collection": "teams",
        "key": "t_004",
        "user_id": this.getSystemUsers[0].id
      }, {
        "collection": "teams",
        "key": "t_005",
        "user_id": this.getSystemUsers[0].id
      }, {
        "collection": "teams",
        "key": "t_006",
        "user_id": this.getSystemUsers[0].id
      }]
    }) as StorageObjects;

    var teamsStateData: TeamState[] = [];

    var k = 0;
    getTeams.objects.forEach(team => {

      var teamJsonString = JSON.stringify(team.value);
      var parsedJson = JSON.parse(teamJsonString);

      var storyBools = {
        "s_001": parsedJson.s_001Unlocked,
        "s_002": parsedJson.s_002Unlocked,
        "s_003": parsedJson.s_003Unlocked,
        "s_004": parsedJson.s_004Unlocked,
        "s_005": parsedJson.s_005Unlocked,
        "s_006": parsedJson.s_006Unlocked
      }
      teamsStateData.push(new TeamState(
        parsedJson.id,
        k,
        "",
        parsedJson.eliminated,
        parsedJson.upgradeLevel,
        parsedJson.energyRequirement,
        parsedJson.energy,
        parsedJson.inFanClub,
        storyBools
      )
      )
      k++;
    }
    );

    var getRoundTrack = await this.client.readStorageObjects(this.session, {
      "object_ids": [{
        "collection": "roundTrack",
        "key": "round",
        "user_id": this.getSystemUsers[0].id
      }]
    }) as StorageObjects;

    var roundStorageObject = collect(getRoundTrack.objects).first();

    
    var jsonString = JSON.stringify(roundStorageObject.value);
    var roundObject = JSON.parse(jsonString);
    
    

    if(roundObject.round == parsedUserData.round)
    {
      //we're on the same round
    }
    else
    {
      if(roundObject.round > parsedUserData.round)
      {
        this.newRound = true;
      }
    }

    var getVotes = await this.client.readStorageObjects(this.session, {
      "object_ids": [{
        "collection": "voting_scenarios",
        "key": "v_001",
        "user_id": this.getSystemUsers[0].id
      }, {
        "collection": "voting_scenarios",
        "key": "v_002",
        "user_id": this.getSystemUsers[0].id
      }, {
        "collection": "voting_scenarios",
        "key": "v_003",
        "user_id": this.getSystemUsers[0].id
      }, {
        "collection": "voting_scenarios",
        "key": "v_004",
        "user_id": this.getSystemUsers[0].id
      }, {
        "collection": "voting_scenarios",
        "key": "v_005",
        "user_id": this.getSystemUsers[0].id
      }]
    }) as StorageObjects;


    //todo: need to write dynamic votes properly

    var getDynamicVotes = await this.client.readStorageObjects(this.session, {
      "object_ids": [{
        "collection": "dynamic_voting_scenarios",
        "key": "dynamicVote",
        "user_id": this.getSystemUsers[0].id
      }]
    }) as StorageObjects;

    var votesStateData: VoteScenarioState[] = [];


    // todo here to investigate?
      var vote = getDynamicVotes.objects[0];
      var voteJsonString = JSON.stringify(vote.value);
      var parsedJson = JSON.parse(voteJsonString);      

    var users : number[] = [];
     
    var userChoices = await this.ReadFromDDMLocalStorage("dynamicVote") as object;

    for(var i=0; i<6; i++)
    {
      console.log("i: " + i);
      users.push(userChoices["users"][i]);
    }

    console.log("**** json : " +parsedJson.globalCount);

    var dynamicVotesStateData = new DynamicVoteScenarioState(
      parsedJson.id,
      users, 
      parsedJson.globalCount,
      parsedJson.winner
    );

    for (var i = 0; i < getVotes.objects.length; i++) {
      var vote = getVotes.objects[i];
      var voteJsonString = JSON.stringify(vote.value);
      var parsedJson = JSON.parse(voteJsonString);
      var choiceOne = await this.ReadFromDDMLocalStorageNumber(parsedJson.id + "_choiceOne");
      var choiceTwo = await this.ReadFromDDMLocalStorageNumber(parsedJson.id + "_choiceTwo");
      votesStateData.push(new VoteScenarioState(
        parsedJson.id,
        choiceOne, choiceTwo,
        parsedJson.choice1Votes,
        parsedJson.choice2Votes,
        parsedJson.winner
      ));
    }

    //changed dynamic data
    this.dynamicData = new DynamicData(teamsStateData, parsedUserData, roundObject, votesStateData, dynamicVotesStateData);
  }

  async GetLatestDynamicDataTutorial() {
    var getUserData = await localStorage.getItem("ddm_localDataTutorial");
    var parsedUserData = JSON.parse(getUserData as string);

    var teamsStateData: TeamState[] = [];
    var teamIds = ["t_001", "t_002", "t_003", "t_004", "t_005", "t_006"]
    var k = 0;
    for(var i=0; i< 6; i++) {

      var storyBools = {
        "s_001": true,
        "s_002": false,
        "s_003": false,
        "s_004": false,
        "s_005": false,
        "s_006": false
      }
      teamsStateData.push(new TeamState(
        teamIds[i],
        k,
        "",
        false,
        0,
        0,
        0,
        false,
        storyBools
      )
      )
      k++;
    }

    var roundObject = {
        "Key": "round",
        "endOfShowDateTime": "2022-05-22T18:17:00.001Z",
        "energyRequirement": 3,
        "id": "round",
        "round": 0,
        "showDynamicVotes": false
    }
    if(roundObject.round == parsedUserData.round)
    {
      //we're on the same round
    }
    else
    {
      if(roundObject.round > parsedUserData.round)
      {
        this.newRound = true;
      }
    }

    var votesStateData: VoteScenarioState[] = [];  

    var dynamicVotesStateData = new DynamicVoteScenarioState(
      "dynamicVote",
      [0,0,0,0,0,0], 
      0,
      -1
    );

    var voteIds = ["v_101", "v_102"];

    for(var i =0; i< 6; i++)
    {
      votesStateData.push(new VoteScenarioState(
        voteIds[i],
        0, 0,
        0,
        0,
        -1
      ));
    }

    //changed dynamic data
    this.dynamicData = new DynamicData(teamsStateData, parsedUserData, roundObject, votesStateData, dynamicVotesStateData);
  }

  async SetupLocalState(username: string) {

    var teamIdList: string[] = [];
    var teamStateList: TeamState[] = [];
    var voteStateList: VoteScenarioState[] = [];

    var userDynamic = this.dynamicData.dynamicUserState;
    var roundDynamic = this.dynamicData.dynamicRoundState;

    for (var i = 0; i < this.staticData.teams.length; i++) {
      var teamStatic = this.staticData.teams[i];
      var teamDynamic = this.dynamicData.dynamicTeamsState[i];
      var upgradeLevel = 0;
      var inFanClub = false;
      switch (teamStatic.id) {
        case "t_001":
          upgradeLevel = userDynamic.t_001UpgradeLevel;
          inFanClub = userDynamic.t_001InFanClub;
          break;
        case "t_002":
          upgradeLevel = userDynamic.t_002UpgradeLevel;
          inFanClub = userDynamic.t_002InFanClub;
          break;
        case "t_003":
          upgradeLevel = userDynamic.t_003UpgradeLevel;
          inFanClub = userDynamic.t_003InFanClub;
          break;
        case "t_004":
          upgradeLevel = userDynamic.t_004UpgradeLevel;
          inFanClub = userDynamic.t_004InFanClub;
          break;
        case "t_005":
          upgradeLevel = userDynamic.t_005UpgradeLevel;
          inFanClub = userDynamic.t_005InFanClub;
          break;
        case "t_006":
          upgradeLevel = userDynamic.t_006UpgradeLevel;
          inFanClub = userDynamic.t_006InFanClub;
          break;
      }

      teamIdList.push(teamStatic.id);
      teamStateList.push(new TeamState(
        teamStatic.id,
        i,
        teamStatic.title,
        teamDynamic.eliminated,
        upgradeLevel,
        roundDynamic.energyRequirement,
        teamDynamic.currentEnergy,
        inFanClub,
        teamDynamic.storyUnlocked
      ));
    }

    for (var i = 0; i < this.dynamicData.voteScenariosState.length; i++) {
      var voteState = this.dynamicData.voteScenariosState[i];
      var choiceOne = await this.ReadFromDDMLocalStorageNumber(this.dynamicData.voteScenariosState[i].id + "_choiceOne");
      var choiceTwo = await this.ReadFromDDMLocalStorageNumber(this.dynamicData.voteScenariosState[i].id + "_choiceTwo");
      var vote = new VoteScenarioState(voteState.id, choiceOne, choiceTwo, voteState.choiceOneVotesGlobal, voteState.choiceTwoVotesGlobal, voteState.winnerIndex);
      voteStateList.push(vote);
    }
    
      var voteDynamicState = this.dynamicData.d_dynamicVoteOptionsState;
      console.log("vote hyname : " + voteDynamicState.globalVotes);
      var userChoices = await this.ReadFromDDMLocalStorage("dynamicVote") as object;

      voteDynamicState.userVotes = userChoices["users"] as number[];

    this.GetSystemUsers();
    //}

    
    var actionPoints = await this.ReadFromDDMLocalStorageNumber("actionPoints");
    var sparks = await this.ReadFromDDMLocalStorageNumber("sparks");
    
    
    this.localState.Init(username, this.dynamicData.dynamicRoundState.round, this.dynamicData.dynamicRoundState.endOfShowDateTime, this.dynamicData.dynamicRoundState.showDynamicVotes, actionPoints, 5, sparks, this.dynamicData.dynamicRoundState.energyRequirement, teamIdList, voteStateList, voteDynamicState, teamStateList);
    
    if (this.newRound) {
      await this.WriteToDDMLocalStorage(["energyRequirement", "round"], [this.localState.roundEnergyRequirement, this.localState.round]);
      //trigger new round

      await this.TriggerNewRound();
    }
    else {
      await this.WriteToDDMLocalStorage(["energyRequirement", "round"], [this.localState.roundEnergyRequirement, this.localState.round]);
    }
    
    this.actionPointsCounter.innerHTML = (await this.ReadFromDDMLocalStorageNumber("actionPoints")).toString();
    this.sparksCounter.innerHTML = (await this.ReadFromDDMLocalStorageNumber("sparks")).toString();
    //this.roundCounter.innerHTML = (6-this.localState.round).toString();

    

    this.avatarOverlayButton.innerHTML = this.staticData.teams[this.localState.carouselPosition].title;

    this.SetOverlayProgress(
      this.localState.GetCurrentTeamState().currentEnergy,
      this.localState.roundEnergyRequirement);
  }

  async SetupLocalStateTutorial(username: string) {

    var teamIdList: string[] = [];
    var teamStateList: TeamState[] = [];
    var voteStateList: VoteScenarioState[] = [];

    var userDynamic = this.dynamicData.dynamicUserState;
    var roundDynamic = this.dynamicData.dynamicRoundState;

    for (var i = 0; i < this.staticData.teams.length; i++) {
      var teamStatic = this.staticData.teams[i];
      var teamDynamic = this.dynamicData.dynamicTeamsState[i];
      var upgradeLevel = 0;
      var inFanClub = false;

      teamIdList.push(teamStatic.id);
      teamStateList.push(new TeamState(
        teamStatic.id,
        i,
        teamStatic.title,
        teamDynamic.eliminated,
        upgradeLevel,
        roundDynamic.energyRequirement,
        teamDynamic.currentEnergy,
        inFanClub,
        teamDynamic.storyUnlocked
      ));
    }

    for (var i = 0; i < this.dynamicData.voteScenariosState.length; i++) {
      var voteState = this.dynamicData.voteScenariosState[i];
      var choiceOne = await this.ReadFromLocalStorageNumber("ddm_localDataTutorial", this.dynamicData.voteScenariosState[i].id + "_choiceOne");
      var choiceTwo = await this.ReadFromLocalStorageNumber("ddm_localDataTutorial", this.dynamicData.voteScenariosState[i].id + "_choiceTwo");
      var vote = new VoteScenarioState(voteState.id, choiceOne, choiceTwo, voteState.choiceOneVotesGlobal, voteState.choiceTwoVotesGlobal, voteState.winnerIndex);
      voteStateList.push(vote);
    }
    
      var voteDynamicState = this.dynamicData.d_dynamicVoteOptionsState;
      
      voteDynamicState.userVotes = [0,0,0,0,0,0];

    this.GetSystemUsers();
    //}

    
    var actionPoints = await this.ReadFromLocalStorageNumber("ddm_localDataTutorial","actionPoints");
    var sparks = await this.ReadFromLocalStorageNumber("ddm_localDataTutorial", "sparks");
    
    
    this.localState.Init(username, this.dynamicData.dynamicRoundState.round, this.dynamicData.dynamicRoundState.endOfShowDateTime, this.dynamicData.dynamicRoundState.showDynamicVotes, actionPoints, 5, sparks, this.dynamicData.dynamicRoundState.energyRequirement, teamIdList, voteStateList, voteDynamicState, teamStateList);
    
    if (this.newRound) {
      await this.WriteToLocalStorage("ddm_localDataTutorial",["energyRequirement", "round"], [this.localState.roundEnergyRequirement, this.localState.round]);
      //trigger new round

      await this.TriggerNewRound();
    }
    else {
      await this.WriteToLocalStorage("ddm_localDataTutorial",["energyRequirement", "round"], [this.localState.roundEnergyRequirement, this.localState.round]);
    }
    
    this.actionPointsCounter.innerHTML = actionPoints.toString();
    this.sparksCounter.innerHTML = sparks.toString();
    //this.roundCounter.innerHTML = (6-this.localState.round).toString();

    

    this.avatarOverlayButton.innerHTML = this.staticData.teams[this.localState.carouselPosition].title;

    this.SetOverlayProgress(
      this.localState.GetCurrentTeamState().currentEnergy,
      this.localState.roundEnergyRequirement);
  }

  async ReloadLocalState() {

    var userDynamicFromLocal = this.dynamicData.dynamicUserState;
    var roundDynamic = this.dynamicData.dynamicRoundState;

    for (var i = 0; i < this.dynamicData.dynamicTeamsState.length; i++) {
      var teamDynamic = this.dynamicData.dynamicTeamsState[i];
      var upgradeLevel = 0;
      var inFanClub = false;

      switch (teamDynamic.id) {
        case "t_001": upgradeLevel = userDynamicFromLocal.t_001UpgradeLevel; inFanClub = userDynamicFromLocal.t_001InFanClub; break;
        case "t_002": upgradeLevel = userDynamicFromLocal.t_002UpgradeLevel; inFanClub = userDynamicFromLocal.t_002InFanClub; break;
        case "t_003": upgradeLevel = userDynamicFromLocal.t_003UpgradeLevel; inFanClub = userDynamicFromLocal.t_003InFanClub; break;
        case "t_004": upgradeLevel = userDynamicFromLocal.t_004UpgradeLevel; inFanClub = userDynamicFromLocal.t_004InFanClub; break;
        case "t_005": upgradeLevel = userDynamicFromLocal.t_005UpgradeLevel; inFanClub = userDynamicFromLocal.t_005InFanClub; break;
        case "t_006": upgradeLevel = userDynamicFromLocal.t_006UpgradeLevel; inFanClub = userDynamicFromLocal.t_006InFanClub; break;
      }

      this.localState.teamStates[i].UpdateFromDynamicData(teamDynamic, roundDynamic.energyRequirement, upgradeLevel, inFanClub);
    }

    for (var j = 0; j < this.localState.teamStates.length; j++) {
      var teamState = this.localState.teamStates[j];
      this.SetTeamProfileProgress(teamState.currentEnergy, this.localState.roundEnergyRequirement, j);
    }

    for (var i = 0; i < this.localState.voteStates.length; i++) {
      var vote = this.dynamicData.voteScenariosState[i] as VoteScenarioState;
      var choiceOne = await this.ReadFromDDMLocalStorageNumber(this.localState.voteStates[i].id + "_choiceOne");
      var choiceTwo = await this.ReadFromDDMLocalStorageNumber(this.localState.voteStates[i].id + "_choiceTwo");
      this.localState.voteStates[i].UpdateFromDynamicData(choiceOne, choiceTwo, vote.choiceOneVotesGlobal, vote.choiceTwoVotesGlobal);
    }

    var userChoices = await this.ReadFromDDMLocalStorage("dynamicVote");
    this.localState.dynamicVoteState.UpdateFromDynamicData(userChoices["users"], this.dynamicData.d_dynamicVoteOptionsState.globalVotes);

    if (this.localState.UpdateFromDynamicData(roundDynamic)) {
      await this.WriteToDDMLocalStorage(["energyRequirement", "round"], [this.localState.roundEnergyRequirement, this.localState.round]);
      //trigger new round

      await this.TriggerNewRound();
      this.CallNotificationsForTheDay();

    }
    else {
      await this.WriteToDDMLocalStorage(["energyRequirement", "round"], [this.localState.roundEnergyRequirement, this.localState.round]);
    }

  }

  async TriggerNewRound()
  {
      this.localState.SetActionPointsToMax();
      this.actionPointsCounter.innerHTML = this.localState.actionPoints.toString();
      await this.WriteToDDMLocalStorage(["actionPoints", "firstVisitTodayWithCurtainsOpen"], [this.localState.maxActionPoints, true]);      
  }

  async SetupVotePage(tutorial: boolean) {

    var todaysScenario;
    var todaysScenarioState;
    if(tutorial)
    {
      todaysScenario = this.staticData.voteScenarios.find(p=>p.id=="v_101");
      console.log("LETS FIND TITLE " + todaysScenario["title"]);
      todaysScenarioState = this.localState.voteStates.find(p=>p.id=="v_101");
    }
    else
    {
      todaysScenario = this.staticData.voteScenarios[this.localState.round - 1];
      todaysScenarioState = this.localState.voteStates[this.localState.round - 1];
    }
    this.waitForDynamicVotes = this.votePage.getChildByID("wait-for-dynamic-votes") as HTMLElement;
    var waitTitle = this.votePage.getChildByID("wait-for-dynamic-votes-title") as HTMLElement;
    var waitContent = this.votePage.getChildByID("wait-for-dynamic-votes-content") as HTMLElement;
    waitTitle.innerHTML = this.GetLabel("l_wait_title") as string;
    waitContent.innerHTML = this.GetLabel("l_wait_content") as string;
    // todo figure out why we don't get uservotes
    const todaysScenarioDynamicState = this.localState.dynamicVoteState;
    
    if(this.localState.round == 5 && this.localState.showDynamicVoteOptions == true)
    {
      this.HideWaitingForDynamicVotes();
      await this.CreateDynamicVotes(todaysScenario, todaysScenarioDynamicState);
    }
    else if(this.localState.round == 5 && this.localState.showDynamicVoteOptions == false)
    {
      this.ShowWaitingForDynamicVotes();
    }
    else
    {
      this.HideWaitingForDynamicVotes();
      var voteScenario = VoteScenario(todaysScenario) as HTMLElement;
      this.voteChoiceOneUser = voteScenario.querySelector('#' + "choiceOne") as HTMLElement;
      this.voteChoiceTwoUser = voteScenario.querySelector('#' + "choiceTwo") as HTMLElement;
      this.voteChoiceOneGlobal = voteScenario.querySelector('#' + "choice-one-total-count") as HTMLElement;
      this.voteChoiceTwoGlobal = voteScenario.querySelector('#' + "choice-two-total-count") as HTMLElement;
      this.voteChoiceOneUser.innerHTML = todaysScenarioState.choiceOneVotesUser.toString();
      this.voteChoiceTwoUser.innerHTML = todaysScenarioState.choiceTwoVotesUser.toString();

      this.voteChoiceOneGlobal.innerHTML = "Total Votes: " + todaysScenarioState.choiceOneVotesGlobal.toString();
      this.voteChoiceTwoGlobal.innerHTML = "Total Votes: " + todaysScenarioState.choiceTwoVotesGlobal.toString();

      const choiceOneSubtractButton = voteScenario.querySelector('#' + "choiceOneSubtract") as HTMLElement;
      choiceOneSubtractButton.onclick = async () => {
        if (this.localState.HaveSpentSparksOnTodaysVote(0)) {
          todaysScenarioState.DecreaseVote(0);
          this.localState.GainSparks(1);
          
          if(tutorial)
          {
            await this.WriteToLocalStorage("ddm_localDataTutorial",["sparks"], [this.localState.sparksAwarded]);
            await this.WriteToLocalStorage("ddm_localDataTutorial",[todaysScenarioState.id + "_choiceOne"], [todaysScenarioState.choiceOneVotesUser]);
          }
          else
          {
            await this.WriteToDDMLocalStorage(["sparks"], [this.localState.sparksAwarded]);
            await this.WriteToDDMLocalStorage([todaysScenarioState.id + "_choiceOne"], [todaysScenarioState.choiceOneVotesUser]);
          }
          this.sparksCounter.innerHTML = this.localState.sparksAwarded.toString();
          this.voteChoiceOneUser.innerHTML = todaysScenarioState.choiceOneVotesUser.toString();
          this.voteChoiceOneGlobal.innerHTML = "Total Votes: " + todaysScenarioState.choiceOneVotesGlobal.toString();
          
          if(!tutorial) {
            this.SentVoteMatchState(this.socket, todaysScenarioState.id, 0, -1);
            }
        }
      };
      const choiceOneAddButton = voteScenario.querySelector('#' + "choiceOneAdd") as HTMLElement;
      choiceOneAddButton.onclick = async () => {
        if (this.localState.HaveSparks()) {
          todaysScenarioState.IncreaseVote(0);
          this.localState.SpendSparks(1);

          if(tutorial)
          {
            await this.WriteToLocalStorage("ddm_localDataTutorial",["sparks"], [this.localState.sparksAwarded]);
            await this.WriteToLocalStorage("ddm_localDataTutorial",[todaysScenarioState.id + "_choiceOne"], [todaysScenarioState.choiceOneVotesUser]);
          }
          else
          {
            await this.WriteToDDMLocalStorage(["sparks"], [this.localState.sparksAwarded]);
            await this.WriteToDDMLocalStorage([todaysScenarioState.id + "_choiceOne"], [todaysScenarioState.choiceOneVotesUser]);
          }

          this.sparksCounter.innerHTML = this.localState.sparksAwarded.toString();
          this.voteChoiceOneUser.innerHTML = todaysScenarioState.choiceOneVotesUser.toString();
          this.voteChoiceOneGlobal.innerHTML = "Total Votes: " + todaysScenarioState.choiceOneVotesGlobal.toString();
          if(!tutorial)
          {
            this.SentVoteMatchState(this.socket, todaysScenarioState.id, 0, 1);
          }
        }
      };
      const choiceTwoSubtractButton = voteScenario.querySelector('#' + "choiceTwoSubtract") as HTMLElement;
      choiceTwoSubtractButton.onclick = async () => {
        if (this.localState.HaveSpentSparksOnTodaysVote(1)) {
          todaysScenarioState.DecreaseVote(1);
          this.localState.GainSparks(1);
          
          if(tutorial)
          {
            await this.WriteToLocalStorage("ddm_localDataTutorial",["sparks"], [this.localState.sparksAwarded]);
            await this.WriteToLocalStorage("ddm_localDataTutorial",[todaysScenarioState.id + "_choiceTwo"], [todaysScenarioState.choiceTwoVotesUser]);
          }
          else
          {
            await this.WriteToDDMLocalStorage(["sparks"], [this.localState.sparksAwarded]);
            await this.WriteToDDMLocalStorage([todaysScenarioState.id + "_choiceTwo"], [todaysScenarioState.choiceTwoVotesUser]);
          }

          this.sparksCounter.innerHTML = this.localState.sparksAwarded.toString();
          this.voteChoiceTwoUser.innerHTML = todaysScenarioState.choiceTwoVotesUser.toString();
          this.voteChoiceTwoGlobal.innerHTML = "Total Votes: " + todaysScenarioState.choiceTwoVotesGlobal.toString();
          if(!tutorial)
          {
            this.SentVoteMatchState(this.socket, todaysScenarioState.id, 1, -1);
          }
        }
      };
      const choiceTwoAddButton = voteScenario.querySelector('#' + "choiceTwoAdd") as HTMLElement;
      choiceTwoAddButton.onclick = async () => {
        if (this.localState.HaveSparks()) {
          todaysScenarioState.IncreaseVote(1);
          this.localState.SpendSparks(1);

          if(tutorial)
          {
            await this.WriteToLocalStorage("ddm_localDataTutorial",["sparks"], [this.localState.sparksAwarded]);
            await this.WriteToLocalStorage("ddm_localDataTutorial",[todaysScenarioState.id + "_choiceTwo"], [todaysScenarioState.choiceTwoVotesUser]);
          }
          else
          {
            await this.WriteToDDMLocalStorage(["sparks"], [this.localState.sparksAwarded]);
            await this.WriteToDDMLocalStorage([todaysScenarioState.id + "_choiceTwo"], [todaysScenarioState.choiceTwoVotesUser]);
          }

          this.sparksCounter.innerHTML = this.localState.sparksAwarded.toString();
          this.voteChoiceTwoUser.innerHTML = todaysScenarioState.choiceTwoVotesUser.toString();
          this.voteChoiceTwoGlobal.innerHTML = "Total Votes: " + this.localState.voteStates[this.localState.round - 1].choiceTwoVotesGlobal.toString();
          if(!tutorial)
          {
            this.SentVoteMatchState(this.socket, todaysScenarioState.id, 1, 1);
          }
        }
      };
      this.voteContainer.innerHTML = "";
      this.voteContainer.append(voteScenario);
      //element.append(voteScenario);
    }
  }

  ShowWaitingForDynamicVotes()
  {
    this.voteContainer.innerHTML = "";
    this.waitForDynamicVotes.style.display = "block";
  }

  HideWaitingForDynamicVotes()
  {
    this.voteContainer.innerHTML = "";
    this.waitForDynamicVotes.style.display = "none";
  }

  async CreateDynamicVotes(todaysScenario, todaysScenarioDynamicState)
  {
    const dynamicVoteScenario = DynamicVoteScenario() as HTMLElement; //have to append into somewhere
    const dynamicVoteScenarioTitle = dynamicVoteScenario.querySelector('#' + "dynamic-vote-scenario-title") as HTMLElement;
    const dynamicVoteScenarioContent = dynamicVoteScenario.querySelector('#' + "dynamic-vote-scenario-content") as HTMLElement;
    const dynamicVoteScenarioOptions = dynamicVoteScenario.querySelector('#' + "dynamic-vote-scenario-options") as HTMLElement;

    dynamicVoteScenarioTitle.innerHTML = todaysScenario.title;
    dynamicVoteScenarioContent.innerHTML = todaysScenario.description;
    var count = 0;

    this.staticData.dynamicVoteOptions.forEach((option) =>{
      const optionData = {
        title: option.title,
        description: option.description 
      } as object;
      const createOption = VoteOption(optionData) as HTMLElement;
      console.log(createOption);
      const optionTotalCount = createOption.querySelector("#total-count") as HTMLElement;
      const optionChoiceCount = createOption.querySelector("#choice-count") as HTMLElement;
      const optionChoiceSubtract = createOption.querySelector("#choice-subtract") as HTMLInputElement;
      const optionChoiceAdd = createOption.querySelector("#choice-add") as HTMLInputElement;
      optionChoiceSubtract.setAttribute("vote_id", count.toString());
      optionChoiceAdd.setAttribute("vote_id", count.toString()); 

      //create the html references
      this.dynamicVoteChoicesHTML.push(new VoteChoiceHTML(createOption, optionTotalCount, optionChoiceCount, optionChoiceSubtract, optionChoiceAdd));
      
      optionTotalCount.innerHTML = "Total Votes: " + todaysScenarioDynamicState.globalVotes[count].toString();
      optionChoiceCount.innerHTML = todaysScenarioDynamicState.userVotes[count].toString();
      
      optionChoiceSubtract.onclick = async (el) => {
        var vote_id = el.currentTarget?.getAttribute("vote_id") as string;
        var vote_id_val = parseInt(vote_id);
        
        if (this.localState.HaveSpentSparksOnTodaysDynamicVote(vote_id_val)) {
          this.localState.dynamicVoteState.DecreaseVote(vote_id_val);
          this.localState.GainSparks(1);
          await this.WriteToDDMLocalStorage(["sparks"], [this.localState.sparksAwarded]);
          
          //get local data
          const localVoteData = await this.ReadFromDDMLocalStorage("dynamicVote") as object;
          //add a property if if doesn't exist / otherwise update it
          localVoteData["users"][vote_id_val] = this.localState.dynamicVoteState.userVotes[vote_id_val];
          await this.WriteToDDMLocalStorage(["dynamicVote"], [localVoteData]);
          
          this.sparksCounter.innerHTML = this.localState.sparksAwarded.toString();
          optionChoiceCount.innerHTML = this.localState.dynamicVoteState.userVotes[vote_id_val].toString();
          optionTotalCount.innerHTML = "Total Votes: " + this.localState.dynamicVoteState.globalVotes[vote_id_val].toString();
          this.SendDynamicVoteMatchState(this.socket, "dynamicVote", vote_id_val, -1);
        }
      };
      
      optionChoiceAdd.onclick = async (el) => {
        var vote_id = el.currentTarget?.getAttribute("vote_id") as string;
        var vote_id_val = parseInt(vote_id);
        if (this.localState.HaveSparks()) {
          this.localState.dynamicVoteState.IncreaseVote(vote_id_val);
          this.localState.SpendSparks(1);
          await this.WriteToDDMLocalStorage(["sparks"], [this.localState.sparksAwarded]);
          
          //get local data
          const localVoteData = await this.ReadFromDDMLocalStorage("dynamicVote") as object;
          //add a property if if doesn't exist / otherwise update it
          localVoteData["users"][vote_id_val] = this.localState.dynamicVoteState.userVotes[vote_id_val];
          await this.WriteToDDMLocalStorage(["dynamicVote"], [localVoteData]);
          
          this.sparksCounter.innerHTML = this.localState.sparksAwarded.toString();
          optionChoiceCount.innerHTML = this.localState.dynamicVoteState.userVotes[vote_id_val].toString();
          optionTotalCount.innerHTML = "Total Votes: " + this.localState.dynamicVoteState.globalVotes[vote_id_val].toString();
          this.SendDynamicVoteMatchState(this.socket, "dynamicVote", vote_id_val, 1);
        }
      };

      dynamicVoteScenarioOptions.append(createOption);  
      count++;
    });
    this.voteContainer.innerHTML = "";
    this.voteContainer.append(dynamicVoteScenario);
  }

  GetLabel(id: string)
  {
    return this.staticData.appLabels.find(p=>p.id == id)?.content;
  }

  async SetupChatChannelsAndPages(tutorial: boolean) {
    
    let { width, height } = this.sys.game.canvas;

    this.chatPage = this.add.dom(0, 0, ChatPage() as HTMLElement);
    this.chatPage.setVisible(false);
    if(tutorial)
    {
      return;
    }
    this.chatChannelOpen = document.getElementById('chat-channel-open') as HTMLElement;
    this.chatChannels = document.getElementById('chat-channels') as HTMLElement;
    this.chatSubmitButton = document.getElementById('chat-submit-button') as HTMLInputElement;
    this.chatMessageContainer = document.getElementById('chat-container') as HTMLElement;
    this.closeChatPageButton = this.chatPage.getChildByID('close-chat-page-button') as HTMLElement;
    this.closeChatChannelsPageButton = this.chatPage.getChildByID('close-chat-channels-page-button') as HTMLInputElement;
    this.returnToChatChannelsButton = this.chatPage.getChildByID('chat-channel-button-return') as HTMLInputElement;
    this.chatChannelTitle = this.chatPage.getChildByID('chat-channel-title') as HTMLInputElement;
    this.chatChannelIcon = this.chatPage.getChildByID('channel-icon') as HTMLImageElement;

    this.messageInput = this.chatPage.getChildByID('chat-input') as HTMLInputElement;

    // Execute a function when the user releases a key on the keyboard
    this.messageInput.addEventListener("keyup", (event) => {
      // Number 13 is the "Enter" key on the keyboard
      if (event.key === 'Enter') {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        this.chatSubmitButton.click();
      }
    });

    this.chatFooterButton.onclick = () => {
      this.SetPage("chatPage");
      this.tapAreaLeft.removeInteractive();
      this.tapAreaRight.removeInteractive();
    }
    this.closeChatPageButton.onclick = () => {
      this.SetPage("avatarOverlay");
      this.tapAreaLeft.setInteractive();
      this.tapAreaRight.setInteractive();
    }
    this.closeChatChannelsPageButton.onclick = () => {
      this.SetPage("avatarOverlay");
      this.tapAreaLeft.setInteractive();
      this.tapAreaRight.setInteractive();
    }
    this.returnToChatChannelsButton.onclick = () => {
      this.chatChannelOpen.style.display = "none";
      this.chatChannels.style.display = "block";
    }

    this.chatChannelContainer = this.chatPage.getChildByID('chat-channel-container') as HTMLElement;
    var k = 0;
    this.staticData.chatChannels.forEach(async (channel) => {
      await this.CreateChatChannelUI(this.chatChannelContainer, channel);
    });
  }

  async CreateChatChannelUI(container: HTMLElement, channel: ChatChannelData) {
    var id = channel.id;

    if (this.localState.chatChannels[id] != null) {


      var src = "/assets/team_emblems/" + channel.iconPath;
      const chatChannel = ChatChannel(channel.title, src) as HTMLElement;
      const chatChannelOpenButton = chatChannel.querySelector("#chat-channel-button-open") as HTMLElement;

      chatChannelOpenButton.onclick = async () => {

        this.chatChannelOpen.style.display = "block";
        this.chatChannels.style.display = "none";
        this.chatChannelTitle.innerHTML = channel.title;
        this.chatChannelIcon.src = "/assets/white_icons/" + channel.iconPath + ".png";
        this.localState.SetCurrentChatChannel(channel.id);
        await this.ReloadGroupChat(channel.id);

      }

      container.append(chatChannel);
    }
  }

  async ReloadGroupChat(groupId: string) {
    this.chatMessageContainer.innerHTML = "";
    var create = await this.CreateChatMessages(groupId);
  }

  async ReloadChatChannels() {
    this.chatChannelContainer.innerHTML = "";
    this.staticData.chatChannels.forEach(async (channel) => {
      await this.CreateChatChannelUI(this.chatChannelContainer, channel);
    });
  }

  SetupLeaderboard() {
    const rowContainer = this.leaderboardPage.getChildByID("leaderboard-rows-container");
    var k = 0;
    this.localState.teamStates.forEach(() => {
      var title = this.staticData.teams[k].title;
      var iconPath = this.staticData.teams[k].iconId;
      const row = LeaderboardRow(title, iconPath) as HTMLElement;
      this.leaderboardRows.push(row);
      rowContainer.append(row);
      k++;
    });
    this.UpdateLeaderboard();
    this.OrderLeaderboard();
  }

  UpdateLeaderboard() {
    var k = 0;
    this.leaderboardRows.forEach(
      (row) => {
        const energyElement = row.querySelector('#leaderboard-row-energy') as HTMLElement;
        const fansElement = row.querySelector('#leaderboard-row-fans') as HTMLElement;
        const upgradesElement = row.querySelector('#leaderboard-row-upgrades') as HTMLElement;

        var energy = "";
        var teamState = this.localState.teamStates[k] as TeamState;
        if (this.localState.teamStates[k].eliminated) {
          energy = "-";
          
        }
        else {
          energy = (teamState.currentEnergy).toString();
          
        }

        energyElement.innerHTML = energy;
        

        k++;
      }
    )
  }

  OrderLeaderboard() {
    this.localState.SetLeaderboardStatus();
    var rowBoundingBoxes = [] as DOMRect[];
    this.leaderboardRows.forEach(
      (row) => {
        rowBoundingBoxes.push(row.getBoundingClientRect());
      }
    );
    var l = 0;
    this.leaderboardRows.forEach(
      (row) => {
        const newBoxIndex = this.localState.teamStates[l].leaderboardPosition;

        const newBox = rowBoundingBoxes[newBoxIndex];
        const oldBox = rowBoundingBoxes[l];
        var deltaX = oldBox.left - newBox.left;
        var deltaY = oldBox.top - newBox.top;

        l++;
        requestAnimationFrame(() => {
          row.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
          row.style.transition = 'transform 0s';

          requestAnimationFrame(() => {
            row.style.transform = '';
            row.style.transition = 'transform 500ms';
          });
        });
      }
    );
  }

  GetDeviceType()
  {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    }
    else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return "mobile";
    }
    return "desktop";
  }

  async SetupTeamProfiles(tutorial: boolean) {
    this.teamProfilePages = [];
    let { width, height } = this.sys.game.canvas;

    var k = 0;
    this.staticData.teams.forEach(
      (team) => {

        var title = team.id as string;

        const data = { name: team.title, biography: team.biography };
        const teamProfile = this.add.dom(0, 0, TeamProfile(data) as HTMLElement);
        var content = teamProfile.getChildByID("team-profile-content") as HTMLElement;
        content.innerHTML = team.biography;
        const teamIcon = teamProfile.getChildByID('team-icon') as HTMLElement;
        teamIcon.classList.add(team.iconId);
        const container = teamProfile.getChildByID('story-container') as HTMLElement;
        var j = 1;
        team.story.forEach((story) => {

          const storyAccordian = StoryAccordian(story) as HTMLElement;
          const textTag = storyAccordian.querySelector("#textTag") as HTMLElement;
          const storyUnlocked = this.localState.teamStates[k].storyUnlocked["s_00" + j];

          const mainButton = storyAccordian.querySelectorAll("#open-close-button")[0] as HTMLElement;
          if (storyUnlocked) {
            textTag.innerHTML = "New"!;
          }
          else {
            textTag.innerHTML = "Locked"!;
            mainButton.setAttribute("disabled", '');
          }
          const collapsibleMessage = storyAccordian.querySelectorAll("#collapsible-message")[0] as HTMLElement;
          mainButton.onclick = () => {
            if (storyUnlocked == true) {
              if (collapsibleMessage.style.maxHeight) {
                collapsibleMessage.style.maxHeight = null; //works as intended
              }
              else {
                collapsibleMessage.style.maxHeight = collapsibleMessage.scrollHeight + "px";
              }
            }
          }
          container.append(storyAccordian);
          j++;
        });
        teamProfile.setVisible(false);
        this.teamProfilePages.push(teamProfile);
        var donateButton = teamProfile.getChildByID('donate-button') as HTMLInputElement;
        var fanClubButton = teamProfile.getChildByID('fan-club-button') as HTMLInputElement;
        var upgradeButton = teamProfile.getChildByID('upgrade-button') as HTMLInputElement;
        var fanClubIcon = teamProfile.getChildByID('fan-club-icon') as HTMLElement;
        var fanClubButtonContainer = teamProfile.getChildByID('fan-club-container') as HTMLElement;
        var upgradeButtonContainer = teamProfile.getChildByID('upgrade-container') as HTMLElement;
        var closeButton = teamProfile.getChildByID('close-team-page-button') as HTMLInputElement;
        var upgradeValue = teamProfile.getChildByID("upgrade-value") as HTMLElement;
        var upgradeBackground = teamProfile.getChildByID("upgrade-background-container") as HTMLElement;
        var imageContainer = teamProfile.getChildByID("image-container") as HTMLElement;

        if (this.localState.teamStates[k].userInFanClub) {
          fanClubIcon.style.display = "block";
          fanClubButtonContainer.style.display = "none";
          upgradeBackground.style.display = "block";
          upgradeValue.style.display = "inline";
          upgradeValue.innerHTML = this.localState.teamStates[k].upgradeLevel.toString();
        }
        else {
          fanClubIcon.style.display = "none";
          upgradeButtonContainer.style.display = "none";
          upgradeBackground.style.display = "none";
          upgradeValue.style.display = "none";
        }
        this.CheckIfOutOfPointsUI(donateButton, upgradeButton, fanClubButton, k);

        k++;
        donateButton.onclick = async () => {
          if (this.localState.SpendActionPointOnDonation()) {
            this.localState.GainSparks(1 + this.localState.GetUpgradeLevel());
            this.localState.teamStates[this.localState.carouselPosition].DonateEnergy();
            this.actionPointsCounter.innerHTML = this.localState.actionPoints.toString();
            this.sparksCounter.innerHTML = this.localState.sparksAwarded.toString();

            this.CheckIfOutOfPointsUI(donateButton, upgradeButton, fanClubButton, this.localState.carouselPosition);

            if(tutorial)
            {
              await this.WriteToLocalStorage("ddm_localDataTutorial", ["actionPoints", "sparks"], [this.localState.actionPoints, this.localState.sparksAwarded]);
            }
            else
            {
              await this.WriteToDDMLocalStorage(["actionPoints", "sparks"], [this.localState.actionPoints, this.localState.sparksAwarded]);
            }

            this.SetOverlayProgress(
              this.localState.teamStates[this.localState.carouselPosition].currentEnergy,
              this.localState.roundEnergyRequirement);

            for (var j = 0; j < this.localState.teamStates.length; j++) {
              var teamState = this.localState.teamStates[j];
              this.SetTeamProfileProgress(teamState.currentEnergy, this.localState.roundEnergyRequirement, j);
            }

            this.CSSAnimation([imageContainer], "jello-horizontal", 800);

            if(!tutorial)
            {
              await this.DonateEnergyMatchState(this.socket, this.localState.currentTeamID);
            }
            //update UI
          }
        }

        fanClubButton.onclick = async () => {
          if (this.localState.SpendActionPointOnFanClub()) {
            this.actionPointsCounter.innerHTML = this.localState.actionPoints.toString();

            this.localState.GetCurrentTeamState().JoinFanClub();
            if(tutorial)
            {
              await this.WriteToLocalStorage("ddm_localDataTutorial", ["actionPoints", this.localState.currentTeamID + "InFanClub"], [this.localState.actionPoints, true]);
            }
            else
            {
              await this.WriteToDDMLocalStorage(["actionPoints", this.localState.currentTeamID + "InFanClub"], [this.localState.actionPoints, true]);
            }

            // audio
            this.FadeInOutDanceFloorAudioTwo();

            // unlock chat

            var groupName = this.staticData.teams[this.localState.carouselPosition].fanClubChannelId;
            if(!tutorial)
            {
              var cId = await this.JoinGroup(this.session, this.client, groupName);
  
              var channels = this.localState.chatChannels;
              channels[groupName] = cId;
              this.localState.AddChatChannels(channels);
              this.JoinGroupChat(this.socket, cId);
  
              await this.ReloadChatChannels();
            }
            //update UI

            this.CheckIfOutOfPointsUI(donateButton, upgradeButton, fanClubButton, this.localState.carouselPosition);

            fanClubButtonContainer.style.display = "none";
            fanClubIcon.style.display = "block";
            upgradeButtonContainer.style.display = "block"
            upgradeBackground.style.display = "block";
            upgradeValue.style.display = "inline";

            this.CSSAnimation([fanClubIcon, upgradeBackground], "puff-in-center", 800);
            this.CSSAnimation([imageContainer], "jello-horizontal", 800);
            /* var getUserData = await localStorage.getItem("ddm_localData");
            const value = JSON.parse(getUserData as string); */

            //await this.DonateEnergyMatchState(socket, this.localState.currentTeamID);
          }
        }

        upgradeButton.onclick = async () => {
          if (this.localState.SpendActionPointOnUpgrade()) {
            console.log("upgrade");
            this.actionPointsCounter.innerHTML = this.localState.actionPoints.toString();
            this.localState.UpgradeTeam(this.localState.currentTeamID);
            
            if(tutorial)
            {
              await this.WriteToLocalStorage("ddm_localDataTutorial", ["actionPoints", this.localState.currentTeamID + "UpgradeLevel"], [this.localState.actionPoints, this.localState.GetCurrentTeamState().upgradeLevel]);
            }
            else
            {
              await this.WriteToDDMLocalStorage(["actionPoints", this.localState.currentTeamID + "UpgradeLevel"], [this.localState.actionPoints, this.localState.GetCurrentTeamState().upgradeLevel]);
            }

            this.CheckIfOutOfPointsUI(donateButton, upgradeButton, fanClubButton, this.localState.carouselPosition);

            //update UI   
            upgradeValue.innerHTML = this.localState.GetCurrentTeamState().upgradeLevel.toString();
            this.CSSAnimation([imageContainer], "jello-horizontal", 800);
            this.CSSAnimation([upgradeValue, upgradeBackground], "wobble-hor-bottom", 800);

            //await this.DonateEnergyMatchState(socket, this.localState.currentTeamID);
          }
        }

        closeButton.onclick = () => {
          this.SetPage("avatarOverlay");
          this.tapAreaLeft.setInteractive();
          this.tapAreaRight.setInteractive();
        }
      });

    for (var j = 0; j < this.localState.teamStates.length; j++) {
      var teamState = this.localState.teamStates[j];
      this.SetTeamProfileProgress(teamState.currentEnergy, this.localState.roundEnergyRequirement, j);
    }
  }

  CheckIfOutOfPointsUI(donateButton, fanClubButton, upgradeButton, index: number) {
    var tagsActive = this.teamProfilePages[index].node.getElementsByClassName("tagsActive");
    var tagsNotEnoughAP = this.teamProfilePages[index].node.getElementsByClassName("tagsNotEnoughAP");
    var tagsEliminated = this.teamProfilePages[index].node.getElementsByClassName("tagsEliminated");
    if (this.localState.actionPoints == 0) {
      donateButton.setAttribute("disabled", '');
      fanClubButton.setAttribute("disabled", '');
      upgradeButton.setAttribute("disabled", '');

      Array.from(tagsActive).forEach(element => {
        (element as HTMLElement).style.display = "none";
      });

      Array.from(tagsNotEnoughAP).forEach(element => {
        (element as HTMLElement).style.display = "block";
      });

      Array.from(tagsEliminated).forEach(element => {
        (element as HTMLElement).style.display = "none";
      });
    }
  }

  imgs!: TeamImages[];
  cardTexs!: TeamRenderTextures[];
  faces;
  tweenDummy;
  pathDummy;
  follower;

  async CSSAnimation(elements: HTMLElement[], nameOfAnimationClass: string, animationLength: number) {
    elements.forEach(element => {
      element.classList.add(nameOfAnimationClass);
    });
    await this.delay(animationLength);
    elements.forEach(element => {
      element.classList.remove(nameOfAnimationClass);
    });
  }

  async WriteToDDMLocalStorage(keys: string[], values: Array<any>) {
    const data = await localStorage.getItem('ddm_localData');
    const json = JSON.parse(data as string);
    var i = 0;
    keys.forEach((key) => {
      json[key] = values[i];
      i++;
    })

    localStorage.setItem('ddm_localData', JSON.stringify(json));
  }

  async WriteToLocalStorage(dict: string, keys: string[], values: Array<any>) {
    const data = await localStorage.getItem(dict);
    const json = JSON.parse(data as string);
    var i = 0;
    keys.forEach((key) => {
      json[key] = values[i];
      i++;
    })

    localStorage.setItem('ddm_localData', JSON.stringify(json));
  }

  async ReadFromDDMLocalStorageNumber(key: string) {
    const data = await localStorage.getItem('ddm_localData');
    const json = JSON.parse(data as string);
    return json[key] as number;
  }

  async ReadFromLocalStorageNumber(dict: string, key: string) {
    const data = await localStorage.getItem(dict);
    const json = JSON.parse(data as string);
    return json[key] as number;
  }

  async ReadFromDDMLocalStorage(key: string) {
    const data = await localStorage.getItem('ddm_localData');
    if(data !== null || data !== undefined)
    {
      console.log("read good");
      const json = JSON.parse(data as string);
      console.log("parse good");
      if(json !== null && json[key] !== null)
      {
        console.log("parse good");
        return json[key] as object;
      }
      else return null;
    }
    else
    {
      return null;
    }
  }

  async ReadJSONFromLocalStorage(key: string) {
    const data = await localStorage.getItem(key);
    if(data !== null || data !== undefined)
    {
      const json = JSON.parse(data as string);
      if(json !== null && json[key] !== null)
      {
        return json as object;
      }
      else return null;
    }
    else
    {
      return null;
    }
  }

  async ReadFromDDMLocalStorageBoolean(key: string) {
    const data = await localStorage.getItem('ddm_localData');
    const json = JSON.parse(data as string);
    return json[key] as boolean;
  }

  async RefreshFromDynamicData() {
    console.log("refresh");

    this.load.json('dynamicVoteOptions_content', '/assets/json/DynamicVoteOptions.json');
    this.dynamicVoteOptions_data = this.cache.json.get('dynamicVoteOptions_content') as object;
    this.staticData.UpdateDynamicVoteOptions(this.dynamicVoteOptions_data);

    //todo - the same update for notifications

    var storePrevShowDynamicVotesValue = this.localState.showDynamicVoteOptions;
    await this.GetLatestDynamicData();
    await this.ReloadLocalState();
    await this.WriteToDDMLocalStorage(["actionPoints", "energyRequirement", "round"], [this.localState.actionPoints, this.localState.roundEnergyRequirement, this.localState.round]);

    this.actionPointsCounter.innerHTML = this.localState.actionPoints.toString();
    //this.roundCounter.innerHTML = (6-this.localState.round).toString();
    this.SetOverlayProgress(this.localState.GetCurrentTeamState().currentEnergy, this.localState.roundEnergyRequirement);

    // todo! if round five, just update based on dynamic
    if(this.localState.round == 5)
    {
      const todaysScenario = this.staticData.voteScenarios[this.localState.round - 1];
      const todaysScenarioDynamicState = this.localState.dynamicVoteState;
      if(this.localState.showDynamicVoteOptions == true && storePrevShowDynamicVotesValue == false)
      {
        this.HideWaitingForDynamicVotes();
        await this.CreateDynamicVotes(todaysScenario,todaysScenarioDynamicState);
      }
      else if(this.localState.showDynamicVoteOptions == true && storePrevShowDynamicVotesValue == true)
      {
        var count = 0;
        this.dynamicVoteChoicesHTML.forEach(
          (element)=>{
            console.log("testig : " + count);
            var voteVal = this.localState.dynamicVoteState.globalVotes[count];
            console.log("voteVAL = " + this.localState.dynamicVoteState.globalVotes);
            element.optionTotalCount.innerHTML = "Total Votes: " + this.localState.dynamicVoteState.globalVotes[count].toString();
            element.optionCount.innerHTML = this.localState.dynamicVoteState.userVotes[count].toString();
            count++;
        })
      }
      else
      {
        // don't update nothing!
      }
    } 
    else
    {
      this.voteChoiceOneUser.innerHTML = this.localState.voteStates[this.localState.round - 1].choiceOneVotesUser.toString();
      this.voteChoiceTwoUser.innerHTML = this.localState.voteStates[this.localState.round - 1].choiceTwoVotesUser.toString();
      this.voteChoiceOneGlobal.innerHTML = "Total Votes: " + this.localState.voteStates[this.localState.round - 1].choiceOneVotesGlobal.toString();
      this.voteChoiceTwoGlobal.innerHTML = "Total Votes: " + this.localState.voteStates[this.localState.round - 1].choiceTwoVotesGlobal.toString();
    }

    this.UpdateLeaderboard();
    this.OrderLeaderboard();
  }

  async RefreshChat() //TODO
  {
    await this.ReloadGroupChat(this.localState.currentChatChannel);
  }

  async SetupTeamAvatars() {

    var json = this.cache.json.get('eightpath');

    var CreateCard = function (scene, front, back) {
      return scene.add.rexPerspectiveCard({
        front: { key: front },
        back: { key: back },
        flip: false
      })
    };

    this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
    this.pathDummy = new Phaser.Curves.Path(json);

    this.tweenDummy = this.tweens.addCounter({
      from: 0,
      to: 1,
      duration: 500,
      ease: 'Power0',//'Sine.easeInOut',
      yoyo: true,
      repeat: -1,
      delay: 200
    })

    this.tweens.add({
      targets: this.follower,
      t: 1,
      ease: 'Power0',
      duration: 4000,
      yoyo: false,
      repeat: -1
    });


    let { width, height } = this.sys.game.canvas;

    this.cardTexs = [];
    this.faces = [];
    this.imgs = [];
    for (var i = 0; i < this.staticData.teams.length; i++) {
      var id = i + 1;
      var a = this.add.image(300, 300, 'atlas', 't_00' + id + '_A');
      var a_f = this.add.image(300, 300, 'atlas', 't_00' + id + '_A_flipped');
      var b = this.add.image(300, 300, 'atlas', 't_00' + id + '_B');
      var b_f = this.add.image(300, 300, 'atlas', 't_00' + id + '_B_flipped');
      var c = this.add.image(300, 300, 'galaxy');

      var front, frontFlipped, back, backFlipped;

      if (this.localState.teamStates[i].eliminated) {
        front = c;
        frontFlipped = c;
        back = c;
        backFlipped = c;
      }
      else {
        front = a;
        frontFlipped = a_f;
        back = b;
        backFlipped = b_f;
      }

      var startingColour = 0x808080;
      if (i == 0 && !this.localState.teamStates[i].eliminated) {
        startingColour = 0xffffff;
      }
      this.imgs.push(
        new TeamImages(
          't_00' + i,
          front.setTint(startingColour),
          frontFlipped.setTint(0x808080),
          back.setTint(startingColour),
          backFlipped.setTint(0x808080)
        )
      );
      var rendTex_front = this.add.renderTexture(0, 0, 600, 600);
      var rendTex_back = this.add.renderTexture(0, 0, 600, 600);
      if (this.localState.teamStates[i].eliminated) {
        rendTex_front.draw(this.imgs[i].img_A, 300, 300);
        rendTex_front.draw(this.imgs[i].img_B, 1000, 1000);
        rendTex_back.draw(this.imgs[i].img_A_flipped, 1000, 1000);
        rendTex_back.draw(this.imgs[i].img_B_flipped, 1000, 1000);
      }
      else {
        rendTex_front.draw(this.imgs[i].img_A, 150, 300);
        rendTex_front.draw(this.imgs[i].img_B, 450, 300);
        rendTex_back.draw(this.imgs[i].img_A_flipped, 150, 300);
        rendTex_back.draw(this.imgs[i].img_B_flipped, 450, 300);
      }
      rendTex_front.saveTexture('t_00' + id + '_front');
      rendTex_back.saveTexture('t_00' + id + '_back');
      this.cardTexs.push(
        new TeamRenderTextures(
          't_00' + id,
          rendTex_front,
          rendTex_back
        )
      );
      var card = CreateCard(this, 't_00' + id + '_front', 't_00' + id + '_back');
      this.faces.push(card);

      a.setVisible(false);
      a_f.setVisible(false);
      b.setVisible(false);
      b_f.setVisible(false);
      c.setVisible(false);
    }
    this.imgs.forEach((img) => {
      img.img_A.setVisible(false);
      img.img_A_flipped.setVisible(false);
      img.img_B.setVisible(false);
      img.img_B_flipped.setVisible(false);
    });

    this.cardTexs.forEach((rt) => {
      rt.rendTex_front.setVisible(false);
      rt.rendTex_back.setVisible(false);
    })

    this.carouselTapBool = true;
    var atlasTexture = this.textures.get('atlas');

    var frames = atlasTexture.getFrameNames();

    //var sprite = this.add.image(width/2,height/2,'atlas', frames[0]);


    var data = {
      x: width / 2, y: height / 2,
      faces: this.faces,
      faceSpace: Math.min(width, 200)
    } as PerspectiveCarousel.IConfig;



    /*this.staticData.teams.forEach(
      (team) => {
        var frontId = team.id + "_A";
        var backId = team.id + "_A_flipped";
        console.log("frontid " + frontId + " backid" + backId);
        data.faces?.push(CreateCard(this, 'atlas', frontId, 'atlas', backId));
      })*/

    const carousel = new PerspectiveCarousel(this, data) as PerspectiveCarousel;
    if(width < 450) {
      carousel.setScale(2/3, 2/3);
    }
    this.tapAreaLeft = this.add.rectangle(0, height / 2, width / 3, height - 240, 0x6666, 0);
    this.tapAreaRight = this.add.rectangle(width, height / 2, width / 3, height - 240, 0x6666, 0);
    var cappedWidth = width;
    var cappedWidth = Math.min(width, 700);
    const tapAreaLeftArrow = this.add.image(cappedWidth / (32 / (2)), height / 2, 'arrow');
    const tapAreaRightArrow = this.add.image(width - (cappedWidth / (32 / (2))), height / 2, 'arrow');

    tapAreaLeftArrow.scale = cappedWidth / (32 * 4);
    tapAreaRightArrow.scale = cappedWidth / (32 * 4);
    tapAreaLeftArrow.flipX = true;

    this.tapAreaLeft.depth = this.depthLayers["foreground"];;
    tapAreaLeftArrow.depth = this.depthLayers["foreground"];;
    this.tapAreaRight.depth = this.depthLayers["foreground"];;
    tapAreaRightArrow.depth = this.depthLayers["foreground"];;

    carousel.roll?.setDuration(300);
    carousel.roll?.on('complete', () => {
      this.carouselTapBool = true;
    });

    this.tapAreaLeft.setInteractive()
      .on('pointerdown', async (pointer, localX, localY, event) => {
        await this.MoveCarousel(carousel, "left");
      });

    this.tapAreaRight.setInteractive()
      .on('pointerdown', async (pointer, localX, localY, event) => {
        await this.MoveCarousel(carousel, "right");
      });

    var arrowX = Math.min(width * 0.10, 100);

    var tweenLeft = this.tweens.add({
      targets: tapAreaLeftArrow,
      x: arrowX,
      duration: 1000,
      ease: 'Sine.easeInOut',
      yoyo: true,
      loop: -1,
      delay: 100
    });

    var tweenRight = this.tweens.add({
      targets: tapAreaRightArrow,
      x: width - arrowX,
      duration: 1000,
      ease: 'Sine.easeInOut',
      yoyo: true,
      loop: -1,
      delay: 100
    });

    this.MoveCarousel(carousel, "to", this.localState.GetRandomTeamStillInCompetition());

    this.startCharacterGraphics = true;
    this.add.existing(carousel);
  }

  async MoveCarousel(carousel: PerspectiveCarousel, direction: string, index?: number) {
    if (this.carouselTapBool) {
      this.carouselTapBool = false;
      switch (direction) {
        case "left":
          carousel.roll?.toLeft();
          this.localState.RollCarousel(-1);
          break;
        case "right":
          carousel.roll?.toRight();
          this.localState.RollCarousel(1);
          break;
        case "to":
          carousel.roll?.to(index as number);
          this.localState.carouselPosition = index as number;
          this.localState.SetCurrentTeamID();
          break;
      }

      for (var i = 0; i < this.imgs.length; i++) {
        var img = this.imgs[i];
        (img.img_A as Image).setTint(0x808080);
        (img.img_B as Image).setTint(0x808080);
        (this.cardTexs[i].rendTex_front as RenderTexture).clear();
        if (!this.localState.teamStates[i].eliminated) {
          this.cardTexs[i].rendTex_front.draw(this.imgs[i].img_A, 150, 300);
          this.cardTexs[i].rendTex_front.draw(this.imgs[i].img_B, 450, 300);
        }
        else {
          this.cardTexs[i].rendTex_front.draw(this.imgs[i].img_A, 300, 270);
        }
      }
      if (!this.localState.GetCurrentTeamState().eliminated) {
        (this.imgs[this.localState.carouselPosition].img_A as Image).setTint(0xffffff);
        (this.imgs[this.localState.carouselPosition].img_B as Image).setTint(0xffffff);
        this.avatarOverlayButton.classList.remove("is-danger");
        this.avatarOverlayButton.classList.add("is-primary");
        this.overlayEliminated.style.display = "none";
        this.overlayProgressContainer.style.display = "flex";
      }
      else {
        (this.imgs[this.localState.carouselPosition].img_A as Image).setTint(0x808080);
        (this.imgs[this.localState.carouselPosition].img_B as Image).setTint(0x808080);
        this.avatarOverlayButton.classList.remove("is-primary");
        this.avatarOverlayButton.classList.add("is-danger");
        this.overlayEliminated.style.display = "block";
        this.overlayProgressContainer.style.display = "none";
      }
      this.avatarOverlayButton.innerHTML = this.staticData.teams[this.localState.carouselPosition].title;
      await this.AnimateOverlayChange();
    }
  }

  StarField() {
    let { width, height } = this.sys.game.canvas;
    this.starSprite = this.add.sprite(0, 0, 'star');
    //this.starSprite.scale = 3;
    this.xx = [];
    this.yy = [];
    this.zz = [];
    this.starFieldTexture = this.add.renderTexture(0, 0, width * 2, height * 2);

    this.listOfColours = [];
    for (var i = 0; i < this.max; i++) {
      var colstring = "0x" + Math.floor(Math.random() * 16777215).toString(16);
      //colstring = "0xffffff";
      this.listOfColours.push(parseInt(colstring));
    }

    var squareDistance = Math.max(width, height);
    for (var i = 0; i < this.max; i++) {
      this.xx.push(Math.floor(Math.random() * squareDistance) - squareDistance / 2);
      this.yy.push(Math.floor(Math.random() * squareDistance) - squareDistance / 2);
      this.zz.push(Math.floor(Math.random() * 1700) - 100);
    }
    this.startStarField = true;
  }

  async AnimateOverlayChange() {
    const overlayBox = this.avatarOverlay.getChildByID("avatar-overlay-ui") as HTMLElement;
    overlayBox.style.animation = "700ms grow-and-shrink";
    await this.delay(350);
    this.SetOverlayProgress(this.localState.GetCurrentTeamState().currentEnergy, this.localState.roundEnergyRequirement);
    await this.delay(350);
    overlayBox.style.animation = "700ms steady";
  }
  async AnimateIconWobble() {
    const icon = this.notificationHome.getChildByID("notification-icon-container") as HTMLElement;
    icon.classList.add("wobble-hor-bottom");
    await this.delay(800);
    icon.classList.remove("wobble-hor-bottom");
  }

  async delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  async waitUntilAssetsLoaded() {
    await this.waitUntil(_ => this.assetsLoaded == true);
  }

  waitUntil(conditionFunction) {

    const poll = resolve => {
      if (conditionFunction()) resolve();
      else setTimeout(_ => poll(resolve), 400);
    }

    return new Promise(poll);
  }

  async JoinMatch(socket: Socket) {
    var list = await this.client.listMatches(this.session, 1);
    if (list.matches?.length == 1) {
      var match = list.matches[0];
      this.match = await socket.joinMatch(match.match_id);
      console.log("match_id" + this.match.match_id);
    }
    else {
      // TODO Activate rest/maintenance mode here
      console.warn("No active match found");
    }
  }

  async DonateEnergyMatchState(socket: Socket, team_id: string) {

    console.log("donate!!!! " + this.localState.teamStates[this.localState.carouselPosition].currentEnergy);

    await socket.sendMatchState(this.match.match_id, 1, { "team_id": team_id }); //
  }

  async SentVoteMatchState(socket: Socket, scenarioId: string, choiceIndex: number, value: number) {

    console.log("send vote!!!! " + scenarioId + " " + choiceIndex + " " + value);

    await socket.sendMatchState(this.match.match_id, 2, { "scenarioId": scenarioId, "option": choiceIndex, "votes": value, "dynamic": false}); //
  }

  async SendDynamicVoteMatchState(socket: Socket, scenarioId: string, choiceIndex: number, value: number) {

    console.log("send vote!!!! " + scenarioId + " " + choiceIndex + " " + value);

    await socket.sendMatchState(this.match.match_id, 2, { "scenarioId": scenarioId, "option": choiceIndex, "votes": value, "dynamic": true }); //
  }

  async ReceiveMatchState(socket: Socket) {
    socket.onmatchdata = async (result: MatchData) => {
      var content = result.data;
      switch (result.op_code) {
        case 101:
          this.RefreshFromDynamicData();
          // this.localState.SetActionPointsToMax();
          // await this.WriteToDDMLocalStorage(["actionPoints"], [this.localState.maxActionPoints]);
          console.log("User " + result.presence.username + " refreshed for a new round");
          break;
        case 1:
          console.log("Received! " + content.team_id);
          this.localState.GetCurrentTeamState().DonateEnergy();
          if (this.localState.currentTeamID == content.team_id) {
            this.SetOverlayProgress(this.localState.GetCurrentTeamState().currentEnergy, this.localState.roundEnergyRequirement);
          }
          for (var j = 0; j < this.localState.teamStates.length; j++) {
            var teamState = this.localState.teamStates[j];
            this.SetTeamProfileProgress(teamState.currentEnergy, this.localState.roundEnergyRequirement, j);
          }
          console.log("User " + result.presence.username + " donated Energy to " + content);
          break;
        case 2:
          console.log("User " + result.presence.username + " spent Sparks on " + content);
          break;
        case 4:
          console.log("User " + result.presence.username + " joined " + content + "s fan club");
          break;
        case 5:
          console.log("User " + result.presence.username + " upgraded " + content);
          break;
        case 100:
          console.log("Notification");
          if (this.receiveServerNotifications) {
            /* bulmaToast.toast(
              {
                message: content
              }); */
            this.DisplayNotificationHome(content);
          }
        default:
          console.info("User %o sent %o", result.presence.user_id, content);
      }
    };
  }

  async DisplayNotificationHome(id: string) {
    if (this.localState.notificationHomeOnScreen) {
      //wait
      this.QueueNotificationHome(id);
    }
    else {
      var notificationData = this.staticData.notifications.filter(p => p.id == id)[0] as NotificationData;
      if (notificationData != null) {
        var character = this.notificationHome.getChildByID("notification-character") as HTMLElement;
        var icon = this.notificationHome.getChildByID("notification-icon") as HTMLImageElement;
        var title = this.notificationHome.getChildByID("notification-title") as HTMLElement;
        var content = this.notificationHome.getChildByID("notification-content") as HTMLElement;
        var nextButton = this.notificationHome.getChildByID("notification-button-next") as HTMLInputElement;
        var closeButton = this.notificationHome.getChildByID("notification-button-close") as HTMLInputElement;
        var watchLatestVideoButton = this.notificationHome.getChildByID("notification-button-watch-latest-video") as HTMLInputElement;
        var viewTodaysVoteButton = this.notificationHome.getChildByID("notification-button-todays-vote") as HTMLInputElement;
        var viewFanClubChat = this.notificationHome.getChildByID("notification-button-fan-club-chat") as HTMLInputElement;
        var box = this.notificationHome.getChildByID("notification-box") as HTMLElement;


        character.innerHTML = '<strong class="has-text-white">' + notificationData.character + '</strong>';
        icon.src = "/assets/white_icons/" + notificationData.iconPath;
        
        if (notificationData.showTitle == "TRUE") {
          title.style.display = "block";
          title.innerHTML = notificationData.title;
        }
        else {
          title.style.display = "none";
        }

        if(notificationData.character == "SPACE STATION")
        {
          box.classList.remove("has-background-warning");
          box.classList.add("has-background-info");
          box.classList.add("has-text-white");
        }
        else{
          box.classList.remove("has-background-info");
          box.classList.add("has-background-warning");
          box.classList.remove("has-text-white");
        }

        this.localState.DivideUpNotificationHomeContent(notificationData.content);
        this.localState.NextNotificationHomeContent();
        content.innerHTML = "";
        content.prepend(this.localState.GetCurrentNotificationHomeContent());
        if (this.localState.notificationHomeContentLength == 1) {
          nextButton.style.display = "none";
          closeButton.style.display = "block";

          switch (notificationData.buttonType) {
            case "watch_latest_video":
              watchLatestVideoButton.style.display = "block";
              viewFanClubChat.style.display = "none";
              viewTodaysVoteButton.style.display = "none";
              break;

            case "view_todays_vote":
              watchLatestVideoButton.style.display = "none";
              viewFanClubChat.style.display = "none";
              viewTodaysVoteButton.style.display = "block";

              break;

            case "view_fan_club_chat":
              watchLatestVideoButton.style.display = "none";
              viewFanClubChat.style.display = "block";
              viewTodaysVoteButton.style.display = "none";

              break;

            case "none":
              watchLatestVideoButton.style.display = "none";
              viewFanClubChat.style.display = "none";
              viewTodaysVoteButton.style.display = "none";
              break;
          }
        }
        else {
          nextButton.style.display = "block";
          closeButton.style.display = "none";
          watchLatestVideoButton.style.display = "none";
              viewFanClubChat.style.display = "none";
              viewTodaysVoteButton.style.display = "none";
        }

        this.notificationHome.depth = this.depthLayers["notifications"];
        this.notificationHome.setVisible(true);
        this.AnimateIconWobble();

        nextButton.onclick = () => {
          if (this.localState.NextNotificationHomeContent()) {
            content.innerHTML = this.localState.GetCurrentNotificationHomeContent();
            this.AnimateIconWobble();
          }
          else {
            content.innerHTML = this.localState.GetCurrentNotificationHomeContent();
            nextButton.style.display = "none";
            closeButton.style.display = "block";

            switch (notificationData.buttonType) {
              case "watch_latest_video":
                watchLatestVideoButton.style.display = "block";
                viewTodaysVoteButton.style.display = "none";
                break;

              case "view_todays_vote":
                watchLatestVideoButton.style.display = "none";
                viewTodaysVoteButton.style.display = "block";
                break;

              default:
                watchLatestVideoButton.style.display = "none";
                viewTodaysVoteButton.style.display = "none";
                break;
            }

            this.AnimateIconWobble();
          }
        };
        closeButton.onclick = async () => {
          await this.CloseNotification(id);
        };
        watchLatestVideoButton.onclick = async () => {
          this.FadeOutDanceFloorAudio();
          await this.CloseNotification(id);
          var list = this.GetListOfActiveVideos();
          this.localState.LatestVideoContent(list.length);
          this.currentVideoTitle.innerHTML = this.staticData.videoContent[this.localState.videoContentPosition].title;
          this.LoadCurrentVideo(this.localState.videoContentPosition, list);
          this.SetPage("videoOverlay");
        };
        viewFanClubChat.onclick = async () => {
          await this.CloseNotification(id);
          this.chatChannelOpen.style.display = "none";
          this.chatChannels.style.display = "block";
          this.SetPage("chatPage");
        };
        viewTodaysVoteButton.onclick = async () => {
          await this.CloseNotification(id);
          this.SetPage("votePage");
        };
      }
    }
  }

  SetPage(pageName: string) {
    switch (pageName) {
      case "votePage":
        this.SetActiveOnPages(true, false, false, false, false, false, false);
        break;
      case "chatPage":
        this.SetActiveOnPages(false, true, false, false, false, false, false);
        break;
      case "videoOverlay":
        this.SetActiveOnPages(false, false, true, false, false, false, false);
        break;
      case "avatarOverlay":
        this.SetActiveOnPages(false, false, false, true, false, false, false);
        break;
      case "teamProfile":
        this.SetActiveOnPages(false, false, false, false, true, false, false);
        break;
      case "helpPage":
        this.SetActiveOnPages(false, false, false, false, false, true, false);
        break;
      case "settingsPage":
        this.SetActiveOnPages(false, false, false, false, false, false, true);
        break;
    }
  }

  SetActiveOnPages(votePage: boolean, chatPage: boolean, videoOverlay: boolean, avatarOverlay: boolean, teamProfile: boolean, helpPage: boolean, settingsPage: boolean) {
    this.votePage.setVisible(votePage);
    this.chatPage.setVisible(chatPage);
    this.videoPlayerOverlay.setVisible(videoOverlay);
    this.avatarOverlay.setVisible(avatarOverlay);

    if (teamProfile) {
      for (var index = 0; index < this.teamProfilePages.length; index++) {
        const element = this.teamProfilePages[index];
        if (index == this.localState.carouselPosition) {
          element.setVisible(true);
        }
        else {
          element.setVisible(false);
        }
      }
    }
    else {
      this.teamProfilePages.forEach(
        (el) => {
          el.setVisible(false);
        }
      )
    }

    this.helpPage.setVisible(helpPage);
    this.settingsPage.setVisible(settingsPage);

  }

  async CloseNotification(id: string) {
    this.notificationHome.setVisible(false);
    var notificationsState = (await this.ReadFromDDMLocalStorage("notificationsState") as object);
    console.log("is this seen now?" + id + " : " + notificationsState[id].seen);
    const character = this.staticData.notifications.find(p => p.id == id)?.character as string;
    notificationsState[id] = {
      seen: true,
      createdAt: new Date(Date.now()).toISOString(),
      userId: character,
      username: character
    };

    await this.WriteToDDMLocalStorage(["notificationsState"], [notificationsState]);
    console.log("is this seen now?" + id + " : " + notificationsState[id].seen);
    const type = this.staticData.notifications.find(p => p.id == id)?.type as string;
    if (type == "arrivetoday") {
      this.dailyNotificationCount++;
    }

    if (this.dailyNotificationCount == this.dailyNotificationTotal) {
      await this.WriteToDDMLocalStorage(["firstVisitTodayWithCurtainsOpen"], [false]);
    }
    this.DisplayQueuedNotification(400);
  }

  queuedNotificationList: string[] = [];

  QueueNotificationHome(id: string) {
    this.queuedNotificationList.push(id);
  }

  UnqueueFirstNotificationHome() {
    this.queuedNotificationList.shift();
  }

  async JoinGlobalChat(socket: Socket, roomname: string) {
    const persistence = true;
    const hidden = false;
    const response = await socket.joinChat(roomname, 1, persistence, hidden);
  }

  async JoinGroup(session: Session, client: Client, groupName: string) {
    var cursor;
    var groupList = await (await this.client.listGroups(this.session, groupName, cursor, 1)).groups as Group[];
    var groupId = (groupList[0].id) as string;

    var joinedGroup = await client.joinGroup(session, groupId);
    console.info("Sent group join request", groupName);
    if (joinedGroup) {
      console.log("Joined " + groupName);
    }

    return groupId;
  }

  async GetGroupsFromAccount() {
    var userId = (await this.client.getAccount(this.session)).user?.id as string;
    var groupList = await (await this.client.listUserGroups(this.session, userId)).user_groups as UserGroup[];

    var dict = {};
    groupList.forEach(userGroup => {
      var id = userGroup.group?.id as string;
      var name = userGroup.group?.name as string;
      dict[name] = id;
    });

    return dict;
  }

  async JoinGroupChat(socket: Socket, groupId: string) {
    const persistence = true;
    const hidden = false;
    const response = await socket.joinChat(groupId, 3, persistence, hidden);
    console.log("join chat: " + groupId + " response.id : " + response.id);
  }

  GetKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

  async initializeChat(socket: Socket) {
    //receive code is here

    
    socket.onchannelmessage = async (message) => {
      
      const key = this.GetKeyByValue(this.localState.chatChannels, message.group_id);
      
      if (key != null) {
        var account = await this.client.getUsers(this.session, [message.sender_id]);
        var users = account.users as User[];
        var avatarUrl = users[0].avatar_url as string;
        var username = users[0].username as string;
        
        var styleString = "";
        if(username == "SPACE STATION" || username == "THE PROMOTER")
        {
          styleString = "background-color: " + "#000000" + ";";
        }
        else
        {
          var number = parseInt(avatarUrl.split("=")[1] as string);
          console.log("number " + number);            
          var hexColor = "#" + this.staticData.colours[number].hexCode;
          styleString = "background-color: " + hexColor + ";";
        }


        if (message.sender_id == this.session.user_id) {

          // if chat open
          if (this.localState.GetCurrentChatChannelGroupId() == message.group_id) {
            var timeago = this.GetTime(message.create_time as string);
            const messageElement = ChatMessageCurrentUser(username, message.content.message, this.whiteIconPath+avatarUrl, timeago, styleString) as HTMLElement;

            if (this.localState.lastChatMessageUserId == message.sender_id) {
              var top = messageElement.querySelector('#chat-top') as HTMLElement;
              top.style.display = "none";
            }
            this.chatMessageContainer.append(messageElement);
          }
          else {
            // we'll show to when the chat is changed
          }

          // last message chat bar
          //
        }
        else {
          // if chat open
          if (this.localState.GetCurrentChatChannelGroupId() == message.group_id) {
            var timeago = this.GetTime(message.create_time as string);
            const messageElement = ChatMessageOtherUser(username, message.content.message, this.whiteIconPath+avatarUrl, timeago, styleString) as HTMLElement;
            this.chatMessageContainer.append(messageElement);
          }
          else {
            // we'll show to when the chat is changed
          }

          // last message chat bar
          //
        }
        this.chatMessageContainer.scrollTop = this.chatMessageContainer.scrollHeight;

      }
    };

    /* socket.onchannelmessage = async (message) => {
      console.log("Received a message on channel: %o", message.channel_id);
      console.log("Message content: %o", message.content);
      this.anotherTextElement.innerHTML = message.content.message;

      var account = await this.client.getUsers(this.session, [message.sender_id]);
      var users = account.users as User[];
      var avatarUrl = users[0].avatar_url as string;
      var username = users[0].username as string;

      if (message.sender_id == this.session.user_id) {
        const messageElement = ChatMessageCurrentUser(username, message.content.message, avatarUrl) as HTMLElement;
        this.chatMessageContainer.append(messageElement);
      }
      else {
        const messageElement = ChatMessageOtherUser(username, message.content.message, avatarUrl) as HTMLElement;
        this.chatMessageContainer.append(messageElement);
      }
      this.chatMessageContainer.scrollTop = this.chatMessageContainer.scrollHeight;
    }; */

    this.chatSubmitButton.onclick = () => {
      var message = this.messageInput.value;
      console.log("text " + message);
      if (message.length > 0) {
        var channelId = this.localState.GetCurrentChatChannelGroupId();
        this.SendChatMessage(socket, "3." + channelId + "..", message);
        this.messageInput.value = "";
      }
    }
    //this.SendChatMessage(socket, response.id, this.session.username + " says: I think Red is the imposter!");
  }

  async SendChatMessage(socket: Socket, groupId: string, message: string) {
    var data = { "message": message };
    const messageAck = await socket.writeChatMessage(groupId, data);
  }

  async CreateUserList(list: ChannelMessageList) {
    var userList = {};
    list.messages?.forEach(async (message) => {
      console.log("message time: " + new Date(message.create_time as string).toUTCString());
      var account = await this.client.getUsers(this.session, [message.sender_id as string]);
      var users = account.users as User[];
      var avatarUrl = users[0].avatar_url as string;
      var username = users[0].username as string;
      userList[message.sender_id as string] = { "avatar_url": avatarUrl, "username": username };
    });
    this.staticData.notifications.forEach(
      (notification) => {
        userList[notification.character] = { avatar_url: notification.iconPath, username: notification.character };
      }
    )
    return userList;
  }

  CreateNotificationSeenLocalStorage() {
    /* var storeObject = {
      id: "a",
      createdAt: "",
      userId: "",
      username: ""
    };
    this.WriteToDDMLocalStorage([],[storeObject]); */
  }

  async GenerateNotificationChannelMessages() {
    var notificationsState = await this.ReadFromDDMLocalStorage("notificationsState") as object;
    var notificationsSeen = [] as string[];
    Object.keys(notificationsState).forEach(
      (key) => {
        if (notificationsState[key].seen == true) {
          console.log("key " + key);
          notificationsSeen.push(key)
        }
        else {
          console.log("no key " + notificationsState[key].seen);
        }
      }
    );

    //var notificationsSeen = [{id: "n_001", createdAt: "2022-01-30T16:22:07Z", userId: "Promoter", username: "Promoter"},{id: "n_002", createdAt: "2023-01-31T16:22:07Z", userId: "Promoter", username: "Promoter"}] as object[];
    var channelNotifications = [] as ChannelMessage[];
    notificationsSeen.forEach(
      (key) => {
        var data = notificationsState[key];
        console.log("data ID " + key + " " + data.userId);
        const id = key; //it is there
        const createdAt = data.createdAt; //it is there
        const userId = data.userId;
        const username = data.username;
        const notificationMessage = new NakaChannelMessage();
        const content = this.staticData.notifications.find(p => p.id == id)?.content as string;
        notificationMessage.content = { message: content, button: true };
        notificationMessage.create_time = createdAt;
        notificationMessage.sender_id = userId;
        notificationMessage.username = username;
        notificationMessage.code = 0;
        channelNotifications.push(notificationMessage);
      }
    )
    return channelNotifications;
  }

  async CreateChatMessages(chatId: string) {
    var forward = true;
    var channelId = "3." + this.localState.chatChannels[chatId] + "..";
    this.localState.chatChannels
    console.log(chatId + ": " + this.localState.chatChannels[chatId]);
    var result: ChannelMessageList = await this.client.listChannelMessages(this.session, channelId, 50, forward);

    if (result.messages?.length != 0) {
      var messages = result.messages as ChannelMessage[];
      console.log(messages[0].create_time + " message made, converted is  : " + new Date(messages[0].create_time as string).toUTCString());
    }


    //if(chat)

    if (result.messages != null && result.messages.length > 0) {
      var storeUserId = "";
      var storeMessageCreateTime = "";
      var storeUserDetails = {} as object;
      var input = this.chatPage.getChildByID('chat-input-container') as HTMLElement;

      storeUserDetails = await this.CreateUserList(result);
      if (chatId == "c_001") {

        console.log("notifications!!!!!!!!!!!!!");
        input.style.visibility="hidden";
        
        var list = await this.GenerateNotificationChannelMessages();
        list.forEach(
          (notification) => {
            result.messages?.push(notification);
          }
        )

        result.messages?.sort((messageA, messageB) => {
          return new Date(messageA.create_time as string).getTime() - new Date(messageB.create_time as string).getTime();
        })
      }
      else{
        input.style.visibility="visible";
      }
      await this.delay(500); //WARNING NOT FOOL PROOF!!!

      /* messages.sort((a, b) => {

        var aTime = new Date(a.create_time as string).getTime();
        var bTime = new Date(b.create_time as string).getTime();
        return aTime-bTime;
      }); */

      result.messages.forEach(async (message) => {
        switch (message.code) {
          case 0:
            console.log("Message has id %o and content" + message.content, message.message_id);

            let getMessage: any = {};
            getMessage = message.content;
            var avatarUrl = storeUserDetails[message.sender_id as string].avatar_url as string;

            var username = storeUserDetails[message.sender_id as string].username as string;
            var styleString = "";
            console.log("username : : " + username);
            if(username == "SPACE STATION" || username == "THE PROMOTER")
            {
              styleString = "background-color: " + "#000000" + ";";
            }
            else
            {
              var number = parseInt(avatarUrl.split("=")[1] as string);
              console.log("number " + number);            
              var hexColor = "#" + this.staticData.colours[number].hexCode;
              styleString = "background-color: " + hexColor + ";";
            }
            

            var timeago = this.GetTime(message.create_time as string);

            if (message.sender_id == this.session.user_id) {
              const messageElement = ChatMessageCurrentUser(username, getMessage.message, this.whiteIconPath+avatarUrl, timeago, styleString) as HTMLElement; // works! but can't find the message :/
              var top = messageElement.querySelector('#chat-message') as HTMLElement;

              if (storeUserId == message.sender_id) {
                var top = messageElement.querySelector('#chat-top') as HTMLElement;
                top.style.display = "none";
                /* if(storeMessageCreateTime != "") 
                {
                  var prev = new Date(storeMessageCreateTime).getTime();
                  var twentyMinutesAgo = 1000*60*20;

                  if(prev - twentyMinutesAgo < 0)
                  {
                    var bottom = messageElement.querySelector('#chat-bottom') as HTMLElement;
                    bottom.style.display = "none";
                  }
                } */
              }


              this.chatMessageContainer.append(messageElement);
            }
            else {
              const messageElement = ChatMessageOtherUser(username, getMessage.message, this.whiteIconPath+avatarUrl, timeago, styleString) as HTMLElement; // works! but can't find the message :/

              if (storeUserId == message.sender_id) {
                var top = messageElement.querySelector('#chat-top') as HTMLElement;
                top.style.display = "none";
              }
              this.chatMessageContainer.append(messageElement);
            }

            storeUserId = message.sender_id as string;
            this.localState.SetLastChatChannelMessageUserId(storeUserId);
            storeMessageCreateTime = message.create_time as string;
            await this.delay(100);
            this.chatMessageContainer.scrollTop = this.chatMessageContainer.scrollHeight + 50;
            break;
        }
      });

      console.log("messages loaded");
    }
  }


  GetTime(date: string) {
    var timeago = humanized_time_span(date);
    console.log("Time ago: " + date + " " + timeago);
    return timeago;
  }

  /* GetTime(date: string) {
    var timeago = humanized_time_span(date);
    console.log("Time ago: " + timeago);
    return timeago;
  } */

  UpdateStarField() {
    this.starFieldTexture.clear();
    this.starFieldTexture.beginDraw();

    for (var i = 0; i < this.max; i++) {
      var perspective = this.distance / (this.distance - this.zz[i]);
      var x = this.cameras.main.centerX + this.xx[i] * perspective;
      var y = this.cameras.main.centerY + this.yy[i] * perspective;

      this.zz[i] += this.speed;

      if (this.zz[i] > 300) {
        this.zz[i] -= 600;
      }

      this.starSprite.setTint(0xffffff);
      //this.starSprite.setTint(this.listOfColours[i]);
      this.starFieldTexture.batchDraw(this.starSprite, x, y);
    }
    this.starFieldTexture.endDraw();
  }

  UpdateDancers() {
    if (this.cardTexs != null) {
      /* this.TintRenderTexture(i, 0xffff0000); */
      this.pathDummy.getPoint(this.follower.t, this.follower.vec);
      var x = this.follower.vec.x;
      var y = this.follower.vec.y;

      var id = this.localState.carouselPosition;
      this.cardTexs[id].rendTex_front.clear();
      /* this.cardTexs[id].rendTex_front.draw(this.imgs[id].img_A, 150+(this.tweenDummy as Tweens.Tween).getValue()*10, 300);
      this.cardTexs[id].rendTex_front.draw(this.imgs[id].img_B, 450+(this.tweenDummy as Tweens.Tween).getValue()*-10,300); */

      this.cardTexs[id].rendTex_front.draw(this.imgs[id].img_A, 150 + x * 0.2, 200 + y * 0.2);
      x = -x + 460;
      y = y;
      this.cardTexs[id].rendTex_front.draw(this.imgs[id].img_B, 350 + x * 0.2, 200 + y * 0.2);
    }
  }

  update() {
    if (this.startCharacterGraphics && !this.localState.GetCurrentTeamState().eliminated) this.UpdateDancers();
    if (this.startStarField) this.UpdateStarField();
  }
}



