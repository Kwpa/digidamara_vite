import Phaser, { Scene, Tweens } from 'phaser';
import BaseWebsite from './elements/BaseWebsite';
import ChatPage from './elements/ChatPage';
import VideoPage from './elements/VideoPage';
import ChatMessageOtherUser from './elements/ChatMessageOtherUser';
import ChatMessageCurrentUser from './elements/ChatMessageCurrentUser';
import NotificationHome from './elements/NotificationHome';
import VideoTile from './elements/VideoTile';
import VoteScenario from './elements/VoteScenario';
import AvatarOverlay from './elements/AvatarOverlay';
import VideoPlayerOverlay from './elements/VideoPlayerOverlay';
import TeamProfile from './elements/TeamProfile';
import VotingPage from './elements/VotingPage';
import StoryAccordian from './elements/StoryAccordian';
import ChatChannel from './elements/ChatChannel';


import Bulma from '../node_modules/bulma/css/bulma.css';
import { ChannelMessage, ChannelMessageList, Client, Session, Socket, StorageObject, Users, User, Match, StorageObjects, MatchData, GroupList, Group, UserGroup } from "@heroiclabs/nakama-js";
import collect from 'collect.js';
import PerspectiveImagePlugin from 'phaser3-rex-plugins/plugins/perspectiveimage-plugin.js';
import { PerspectiveCarousel } from 'phaser3-rex-plugins/plugins/perspectiveimage.js';
import YoutubePlayerPlugin from 'phaser3-rex-plugins/plugins/youtubeplayer-plugin.js';
import LocalGameState, { TeamImages, TeamRenderTextures, TeamState, VoteScenarioState } from './LocalGameState';
import StaticData, { NotificationData } from './StaticData';
import RenderTexture from 'phaser3-rex-plugins/plugins/gameobjects/mesh/perspective/rendertexture/RenderTexture';
import Sprite from 'phaser3-rex-plugins/plugins/gameobjects/mesh/perspective/sprite/Sprite';
import Image from 'phaser3-rex-plugins/plugins/gameobjects/mesh/perspective/image/Image';
import { Rectangle } from 'phaser3-rex-plugins/plugins/gameobjects/shape/shapes/geoms';
import * as bulmaToast from 'bulma-toast';
import DynamicData from './DynamicData';

export default class MainScene extends Phaser.Scene {

  localState!: LocalGameState;
  staticData!: StaticData;
  dynamicData!: DynamicData;
  getSystemUsers!: User[];

  teams_data!: object;
  barks_data!: object;
  items_data!: object;
  story_data!: object;
  notifications_data!: object;
  voteScenarios_data!: object;
  labels_data!: object;
  videoContent_data!: object;
  chatChannels_data!: object;

  teamProfilePages!: Phaser.GameObjects.DOMElement[];
  chatPages!: Phaser.GameObjects.DOMElement[];
  session!: Session;
  client!: Client;
  match!: Match;
  textElement!: HTMLElement;
  anotherTextElement!: HTMLElement;
  messageInput!: HTMLInputElement;
  danceFloor!: HTMLElement;
  chatMessageContainer!: HTMLElement;
  videoTileContainer!: HTMLElement;
  storeMatchReferece!: StorageObjects;

  chatChannelOpen!: HTMLElement;
  chatChannels!: HTMLElement;
  chatSubmitButton!: HTMLElement;
  chatChannelTitle!: HTMLElement;
  chatChannelIcon!: HTMLImageElement;
  returnToChatChannelsButton!: HTMLElement;
  settingsHeaderButton!: HTMLElement;
  chatFooterButton!: HTMLElement;
  voteFooterButton!: HTMLElement;
  videoFooterButton!: HTMLElement;
  helpFootButton!: HTMLElement;
  closeSettingsPageButton!: HTMLElement;
  closeChatPageButton!: HTMLElement;
  closeChatChannelsPageButton!: HTMLElement;
  closeVotePageButton!: HTMLElement;
  closeVideoPageButton!: HTMLElement;
  closeHelpPageButton!: HTMLElement;
  closeVideoPlayerButton!: HTMLElement;
  playVideoPlayerButton!: HTMLElement;
  pauseVideoPlayerButton!: HTMLElement;
  loadNextVideoPlayerButton!: HTMLElement;
  loadPreviousVideoPlayerButton!: HTMLElement;

  roundCounter!: HTMLElement;
  actionPointsCounter!: HTMLElement;
  sparksCounter!: HTMLElement;

  tapAreaLeft;
  tapAreaRight;

  logo;

  avatarOverlayButton!: HTMLElement;
  overlayProgressBar!: HTMLInputElement;
  voteContainer!: HTMLElement;
  avatarOverlay!: Phaser.GameObjects.DOMElement;
  notificationsArea!: HTMLElement;
  videoPlayerContainer!: HTMLElement;
  notificationHome!: Phaser.GameObjects.DOMElement;

  voteChoiceOneUser!: HTMLElement;
  voteChoiceOneGlobal!: HTMLElement;
  voteChoiceTwoUser!: HTMLElement;
  voteChoiceTwoGlobal!: HTMLElement;

  width!: number;
  height!: number;

  carouselTapBool!: boolean;

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

  //avatarRenderTextures
  avatarRenderTextures;
  avatarSprites;

  assetsLoaded: boolean = false;
  startStarField: boolean = false;
  startCharacterGraphics: boolean = false;

  receiveServerNotifications: boolean = false;

  webConfig;
  rexVideoPlayer;

  constructor() {
    super('MainScene');
  }

  preload() {
    //this.load.crossOrigin = "Anonymous";
    this.LoadingBar();

    this.load.atlas('atlas', '/assets/test_avatars/avatar_atlas.png', ' /assets/json/avatar_atlas.json');
    this.load.image('arrow', '/assets/images/arrow.png');
    this.load.image('star', '/assets/images/star.png');
    this.load.image('heart', '/assets/images/heart.png');
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

    //this.load.on('complete', () => {this.flag = true});
  }

  ShowVideo(scene: Scene, width: number, height: number, url: string)
  {
    this.rexVideoPlayer = scene.add.rexYoutubePlayer( //this does work, typescript def error :/
      -width, -height, 400, 300, 
      { 
        videoId: url,
        autoPlay: false
      }).on('ready', () => 
      {
        this.rexVideoPlayer.setPosition(0,0);
        var playeriFrame = document.querySelectorAll('iframe')[0];
        this.videoPlayerContainer.append(playeriFrame);
      }).on('statechange', () =>
      {
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
    });
  }

  create() //to tackle - server code and setup for typescript!
  {
    var { width, height } = this.sys.game.canvas;
    console.log('load Main Scene');
    this.logo = this.add.image(width / 2, height / 2 - 200, 'logo');
    this.logo.scale = Math.min(((0.8 * width) / 512), 1.5);
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
    this.labels_data = this.cache.json.get('appLabels_content') as object;
    this.videoContent_data = this.cache.json.get('video_content') as object;
    this.chatChannels_data = this.cache.json.get('chat_channels') as object;
    this.webConfig = this.cache.json.get('web_config') as object;
  }

  async AsyncCreate() {
    
    await this.waitUntilAssetsLoaded();
    await this.LoadJSON();
    await this.delay(1200);
    //console.log(this.cache.json);
    let { width, height } = this.sys.game.canvas;

    const leftCurtain = this.add.graphics();
    const rightCurtain = this.add.graphics();
    const dots = Math.floor(height / 50);
    leftCurtain.fillStyle(0x545454, 1);
    leftCurtain.fillRect(0, 0, width / 2, height);
    leftCurtain.fillStyle(0x2a2a2a);
    leftCurtain.fillRect(width / 2 - 3, 0, 3, height);
    for (var i = 0; i < dots; i++) {
      leftCurtain.fillCircle(width / 2 - 10, i * height / dots, 4);
    }
    leftCurtain.depth = 2;
    rightCurtain.fillStyle(0x545454, 1);
    rightCurtain.fillRect(width / 2, 0, width / 2, height);
    rightCurtain.fillStyle(0x2a2a2a);
    rightCurtain.fillRect(width / 2, 0, 3, height);
    for (var i = 0; i < dots; i++) {
      rightCurtain.fillCircle(width / 2 + 10, i * height / dots, 4);
    }
    rightCurtain.depth = 2;

    var leftCurtainTween = this.tweens.add(
      {
        targets: leftCurtain,
        x: -width,
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
        x: width,
        duration: 2200,
        ease: 'Quad.easeIn',
        yoyo: false,
        loop: 0,
        delay: 1000,
        onComplete: () => { this.avatarOverlay.setVisible(true); }
      }
    );

    const game = document.getElementsByTagName('canvas')[0];
    game.style.setProperty('position', 'absolute');
    game.style.setProperty('z-index', '-1');

    const baseWebsite = this.add.dom(width / 2, height / 2, BaseWebsite() as HTMLElement);
    const videoPage = this.add.dom(width / 2, height / 2, VideoPage() as HTMLElement);
    const videoPlayerOverlay = this.add.dom(width / 2, height / 2, VideoPlayerOverlay() as HTMLElement);
    const votePage = this.add.dom(width / 2, height / 2, VotingPage() as HTMLElement);
    this.notificationHome = this.add.dom(width / 2, 190, NotificationHome('','') as HTMLElement);
    this.avatarOverlay = this.add.dom(width / 2, height / 2, AvatarOverlay('open') as HTMLElement);
    this.overlayProgressBar = this.avatarOverlay.getChildByID("teamEnergyBar") as HTMLInputElement;
    
    this.videoPlayerContainer = videoPlayerOverlay.getChildByID("video-player") as HTMLElement;
    
    this.avatarOverlay.setVisible(false);
    videoPlayerOverlay.setVisible(false);
    this.notificationHome.setVisible(false);
    videoPage.setVisible(false);
    votePage.setVisible(false);
    //baseWebsite.setVisible(false);
    
    //debug
    this.textElement = document.getElementById('rnd-update') as HTMLElement;
    this.anotherTextElement = document.getElementById('chat-update') as HTMLElement;
    this.textElement.hidden = true;
    this.anotherTextElement.hidden = true;
    
    this.roundCounter = baseWebsite.getChildByID("round-header-value") as HTMLElement;
    this.actionPointsCounter = baseWebsite.getChildByID("ap-header-value") as HTMLElement;
    this.sparksCounter = baseWebsite.getChildByID("sparks-header-value") as HTMLElement;
    this.chatFooterButton = document.getElementById('chat-footer-button') as HTMLElement;
    this.videoFooterButton = document.getElementById('video-footer-button') as HTMLElement;
    this.voteFooterButton = document.getElementById('vote-footer-button') as HTMLElement;
    this.closeVideoPageButton = videoPage.getChildByID('close-video-page-button') as HTMLElement;
    this.closeVotePageButton = votePage.getChildByID('close-voting-page-button') as HTMLElement;
    this.voteContainer = votePage.getChildByID('vote-container') as HTMLElement;
    this.videoTileContainer = videoPage.getChildByID('video-container') as HTMLElement;
    //this.closeVideoPlayerButton = videoPlayerOverlay.getChildByID('video-player-button-close') as HTMLElement;
    this.playVideoPlayerButton = videoPlayerOverlay.getChildByID('video-player-button-play') as HTMLElement;
    this.pauseVideoPlayerButton = videoPlayerOverlay.getChildByID('video-player-button-pause') as HTMLElement;
    this.loadNextVideoPlayerButton = videoPlayerOverlay.getChildByID('video-player-button-next') as HTMLElement;
    this.loadPreviousVideoPlayerButton = videoPlayerOverlay.getChildByID('video-player-button-previous') as HTMLElement;
    
    
    this.avatarOverlayButton = this.avatarOverlay.getChildByID('openProfile') as HTMLElement;
    this.notificationsArea = baseWebsite.getChildByID("gameArea") as HTMLElement;
    
    
    this.videoFooterButton.onclick = () => {
      videoPage.setVisible(true);
      this.avatarOverlay.setVisible(false);
      this.tapAreaLeft.removeInteractive();
      this.tapAreaRight.removeInteractive();
    }
    this.closeVideoPageButton.onclick = () => {
      videoPage.setVisible(false);
      this.avatarOverlay.setVisible(true);
      this.tapAreaLeft.setInteractive();
      this.tapAreaRight.setInteractive();
    }
    this.voteFooterButton.onclick = () => {
      votePage.setVisible(true);
      this.avatarOverlay.setVisible(false);
      this.tapAreaLeft.removeInteractive();
      this.tapAreaRight.removeInteractive();
    }
    this.closeVotePageButton.onclick = () => {
      votePage.setVisible(false);
      this.avatarOverlay.setVisible(true);
      this.tapAreaLeft.setInteractive();
      this.tapAreaRight.setInteractive();
    }
    this.avatarOverlayButton.onclick = () => {
      this.teamProfilePages[this.localState.carouselPosition].setVisible(true);
      var donateButton = this.teamProfilePages[this.localState.carouselPosition].getChildByID('donate-button') as HTMLInputElement;
      var fanClubButton = this.teamProfilePages[this.localState.carouselPosition].getChildByID('fan-club-button') as HTMLInputElement;
      var upgradeButton = this.teamProfilePages[this.localState.carouselPosition].getChildByID('upgrade-button') as HTMLInputElement; 

      if(this.localState.actionPoints == 0)
      {
        donateButton.setAttribute("disabled",'');
        fanClubButton.setAttribute("disabled",'');
        upgradeButton.setAttribute("disabled",'');
      }
      else
      {
        donateButton.removeAttribute("disabled");
        fanClubButton.removeAttribute("disabled");
        upgradeButton.removeAttribute("disabled");
      }

      this.avatarOverlay.setVisible(false);
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

    this.SetVideoImages(this.videoTileContainer);

    this.SetupNotifications();

    //-----------------------------

    const spotlight = this.add.image(width / 2, height / 2, 'spotlight');
    spotlight.setAlpha(0.4);
    spotlight.scaleY = height / 500;
    spotlight.scaleX = Math.max(1, width / 1000);

    this.StarField();

    await this.GetLatestStaticData();
    await this.StartClientConnection();

    this.ShowVideo(this, width,height, "wVVr4Jq_lMI");
  }

  GetListOfActiveVideos()
  {
    var listOfActiveVideos : string[] = [];
    this.staticData.videoContent.forEach((videoContent) => 
    {
      if(videoContent.active)
      {
        listOfActiveVideos.push(videoContent.youtubeId);
      }
    });
    return listOfActiveVideos;
  }

  NextVideo()
  {
    var list = this.GetListOfActiveVideos();
    var index = this.localState.RollVideoContent(1, list.length);
    this.LoadCurrentVideo(index, list);
  }

  LoadCurrentVideo(index : number, list)
  {
    this.rexVideoPlayer.load(list[index]);
  }

  PreviousVideo()
  {
    var list = this.GetListOfActiveVideos();
    var index = this.localState.RollVideoContent(-1, list.length);
    this.LoadCurrentVideo(index, list);
  }

  PlayCurrentVideo()
  {
    this.rexVideoPlayer.play();
  }

  PauseCurrentVideo()
  {
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
      this.labels_data,
      this.videoContent_data,
      this.chatChannels_data
    );
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

  async StartClientConnection() {

    //this.client = new Client("defaultkey", "127.0.0.1", "7350", false);
    this.client = new Client("defaultkey", this.webConfig.hostname, this.webConfig.port, this.webConfig.ssl);
    var deviceId = "";
    var create = true;
    var newUserStorage = false;

    try {
      const key = await localStorage.getItem('ddm_localData');
      console.log("deviceId: " + key);
      const value = JSON.parse(key as string);

      if (value == null) {
        deviceId = Phaser.Utils.String.UUID() as string;
        newUserStorage = true;
      }
      else {
        deviceId = value.deviceId as string;
      }
    }
    catch (error) {
      console.log("An error occurred: %o", error);
    }
    var rand = Math.floor(Math.random() * 100000);
    this.session = await this.client.authenticateDevice(deviceId, create);
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
          "v_006_choiceTwo": 0
        }
      ));

      await this.client.updateAccount(this.session,
        {
          avatar_url: "https://source.boringavatars.com/marble/50/" + Math.floor(Math.random() * 100000)
        }
      );
    }

    console.info("Successfully authenticated:", this.session);
    let id: string = this.session.user_id as string;
    console.info("Sesh id:", id);

    await this.GetSystemUsers();
    await this.GetLatestDynamicData();
    await this.SetupLocalState(username);

    const socket = this.client.createSocket();
    await socket.connect(this.session, true);

    if(newUserStorage)
    {
      var c001id = await this.JoinGroup(this.session, this.client, "c_001");
      var c002id = await this.JoinGroup(this.session, this.client, "c_002");
      var c003id = await this.JoinGroup(this.session, this.client, "c_003");
      this.localState.AddChatChannels(
        {
          "c_001":c001id,
          "c_002":c002id,
          "c_003":c003id
        });
    }
    else
    {
      var channels = await this.GetGroupsFromAccount();
      this.localState.AddChatChannels(channels);
    }
    
    // use object keys to get each groupId
    for(var key in this.localState.chatChannels)
    {
      var groupId = this.localState.chatChannels[key];
      this.JoinGroupChat(socket, groupId);
    }
      

    await this.SetupChatChannelsAndPages();
    await this.SetupTeamProfiles(socket);
    await this.SetupTeamAvatars();
    await this.SetupVotePage(socket);

    await this.JoinMatch(socket);
    await this.ReceiveMatchState(socket);

    var roomname = "PublicChat";
    await this.initializeChat(socket, roomname);
    await this.AddEventListeners();
    this.StartRefreshTimer();

    /* var rand = Math.floor(Math.random() * 10000);
    var email = "kaiuser_" + rand + "@gmail.com";
    var password = "password";
    var url = "https://source.boringavatars.com/marble/50/" + rand;
    this.client = new Client("defaultkey", "127.0.0.1", "7350", false);
    this.session = await this.client.authenticateEmail(email, password, true); */
    //this.session.username = "Kai";
    //this.socket = this.client.createSocket(true, false);

  }

  SetVideoImages(element: HTMLElement) {
    var videoJson =
    {
      "object":
        [
          {
            "videoTitle": "Video One",
            "videoID": "D3Fcrq9WlOo",
            "thumbnailURL": "/assets/test_avatars/avatar_cushionimp.png"
          },
          {
            "videoTitle": "Video Two",
            "videoID": "3dgx7EU66fQ",
            "thumbnailURL": "/assets/test_avatars/avatar_cushionimp.png"
          },
          {
            "videoTitle": "Video Live",
            "videoID": "gw6tsyftLRo",
            "thumbnailURL": "/assets/test_avatars/avatar_cushionimp.png"
          }
        ]
    }

    videoJson.object.forEach(
      (video) => {
        const videoTile = VideoTile(video.videoTitle, video.thumbnailURL, video.videoID) as HTMLElement;
        element.append(videoTile);
        //const playVideo = videoTile
      }
    )


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
    console.log(parsedUserData);
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

    getTeams.objects.forEach(team => {

      var teamJsonString = JSON.stringify(team.value);
      var parsedJson = JSON.parse(teamJsonString);
      teamsStateData.push(new TeamState(
        parsedJson.id,
        parsedJson.eliminated,
        parsedJson.upgradeLevel,
        parsedJson.energyRequirement,
        parsedJson.energy,
        parsedJson.inFanClub
      )
      )
    });

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

    var votesStateData: VoteScenarioState[] = [];

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


    this.dynamicData = new DynamicData(teamsStateData, parsedUserData, roundObject, votesStateData);
  }

  async SetupLocalState(username: string) {
    this.localState = new LocalGameState();

    var teamIdList: string[] = [];
    var teamStateList: TeamState[] = [];
    var voteStateList: VoteScenarioState[] = [];

    var userDynamic = this.dynamicData.dynamicUserState;
    var roundDynamic = this.dynamicData.dynamicRoundState;

    for (var i = 0; i < this.staticData.teams.length; i++) {
      var teamStatic = this.staticData.teams[i];
      var teamDynamic = this.dynamicData.dynamicTeamsState[i];
      var upgradeLevel = 0;
      switch (teamStatic.id) {
        case "t_001":
          upgradeLevel = userDynamic.t_001UpgradeLevel;
          break;
        case "t_002":
          upgradeLevel = userDynamic.t_002UpgradeLevel;
          break;
        case "t_003":
          upgradeLevel = userDynamic.t_003UpgradeLevel;
          break;
        case "t_004":
          upgradeLevel = userDynamic.t_004UpgradeLevel;
          break;
        case "t_005":
          upgradeLevel = userDynamic.t_005UpgradeLevel;
          break;
        case "t_006":
          upgradeLevel = userDynamic.t_006UpgradeLevel;
          break;
      }

      var inFanClub = false;

      switch (teamStatic.id) {
        case "t_001":
          inFanClub = userDynamic.t_001InFanClub;
          break;
        case "t_002":
          inFanClub = userDynamic.t_002InFanClub;
          break;
        case "t_003":
          inFanClub = userDynamic.t_003InFanClub;
          break;
        case "t_004":
          inFanClub = userDynamic.t_004InFanClub;
          break;
        case "t_005":
          inFanClub = userDynamic.t_005InFanClub;
          break;
        case "t_006":
          inFanClub = userDynamic.t_006InFanClub;
          break;
      }

      teamIdList.push(teamStatic.id);
      teamStateList.push(new TeamState(
        teamStatic.id,
        teamDynamic.outOfCompetition,
        upgradeLevel,
        roundDynamic.energyRequirement,
        teamDynamic.currentEnergy,
        inFanClub
      ));
    }

    for (var i = 0; i < this.dynamicData.dynamicVoteScenariosState.length; i++) {
      var voteDynamic = this.dynamicData.dynamicVoteScenariosState[i];
      var choiceOne = await this.ReadFromDDMLocalStorageNumber(this.dynamicData.dynamicVoteScenariosState[i].id + "_choiceOne");
      var choiceTwo = await this.ReadFromDDMLocalStorageNumber(this.dynamicData.dynamicVoteScenariosState[i].id + "_choiceTwo");
      var vote = new VoteScenarioState(voteDynamic.id, choiceOne, choiceTwo, voteDynamic.choiceOneVotesGlobal, voteDynamic.choiceOneVotesGlobal, voteDynamic.winnerIndex);
      voteStateList.push(vote);
    }

    this.GetSystemUsers();
    //}

    //store and reload action points from localstorage

    var actionPoints = await this.ReadFromDDMLocalStorageNumber("actionPoints");
    var sparks = await this.ReadFromDDMLocalStorageNumber("sparks");

    this.localState.Init(username, this.dynamicData.dynamicRoundState.round, actionPoints, 5, sparks, this.dynamicData.dynamicRoundState.energyRequirement, teamIdList, voteStateList, teamStateList);

    this.actionPointsCounter.innerHTML = (await this.ReadFromDDMLocalStorageNumber("actionPoints")).toString();
    this.sparksCounter.innerHTML = (await this.ReadFromDDMLocalStorageNumber("sparks")).toString();
    this.roundCounter.innerHTML = this.localState.round.toString();

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
      var voteDynamic = this.dynamicData.dynamicVoteScenariosState[i] as VoteScenarioState;
      var choiceOne = await this.ReadFromDDMLocalStorageNumber(this.localState.voteStates[i].id + "_choiceOne");
      var choiceTwo = await this.ReadFromDDMLocalStorageNumber(this.localState.voteStates[i].id + "_choiceTwo");
      this.localState.voteStates[i].UpdateFromDynamicData(choiceOne, choiceTwo, voteDynamic.choiceOneVotesGlobal, voteDynamic.choiceTwoVotesGlobal);
    }

    if (this.localState.UpdateFromDynamicData(roundDynamic)) {
      await this.WriteToDDMLocalStorage(["energyRequirement", "round"], [this.localState.roundEnergyRequirement, this.localState.round]);
      //trigger new round
    }
    else {
      await this.WriteToDDMLocalStorage(["energyRequirement", "round"], [this.localState.roundEnergyRequirement, this.localState.round]);
    }

  }

  async SetupVotePage(socket: Socket) {

    var todaysScenario = this.staticData.voteScenarios[this.localState.round - 1];
    var todaysScenarioState = this.localState.voteStates[this.localState.round - 1];
    console.log(todaysScenario);
    var voteScenario = VoteScenario(todaysScenario) as HTMLElement;
    this.voteChoiceOneUser = voteScenario.querySelector('#' + "choiceOne") as HTMLElement;
    this.voteChoiceTwoUser = voteScenario.querySelector('#' + "choiceTwo") as HTMLElement;
    this.voteChoiceOneGlobal = voteScenario.querySelector('#' + "choice-one-total-count") as HTMLElement;
    this.voteChoiceTwoGlobal = voteScenario.querySelector('#' + "choice-two-total-count") as HTMLElement;
    this.voteChoiceOneUser.innerHTML = todaysScenarioState.choiceOneVotesUser.toString();
    this.voteChoiceTwoUser.innerHTML = todaysScenarioState.choiceTwoVotesUser.toString();

    console.log(todaysScenarioState);

    this.voteChoiceOneGlobal.innerHTML = "Total Votes: " + todaysScenarioState.choiceOneVotesGlobal.toString();
    this.voteChoiceTwoGlobal.innerHTML = "Total Votes: " + todaysScenarioState.choiceTwoVotesGlobal.toString();

    const choiceOneSubtractButton = voteScenario.querySelector('#' + "choiceOneSubtract") as HTMLElement;
    choiceOneSubtractButton.onclick = async () => {
      if (this.localState.HaveSpentSparksOnTodaysVote(0)) {
        todaysScenarioState.DecreaseVote(0);
        this.localState.GainSparks(1);
        await this.WriteToDDMLocalStorage(["sparks"], [this.localState.sparksAwarded]);
        await this.WriteToDDMLocalStorage([todaysScenarioState.id + "_choiceOne"], [todaysScenarioState.choiceOneVotesUser]);
        this.sparksCounter.innerHTML = this.localState.sparksAwarded.toString();
        this.voteChoiceOneUser.innerHTML = todaysScenarioState.choiceOneVotesUser.toString();
        this.voteChoiceOneGlobal.innerHTML = "Total Votes: " + todaysScenarioState.choiceOneVotesGlobal.toString();
        this.SentVoteMatchState(socket, todaysScenarioState.id, 0, -1);
      }
    };
    const choiceOneAddButton = voteScenario.querySelector('#' + "choiceOneAdd") as HTMLElement;
    choiceOneAddButton.onclick = async () => {
      if (this.localState.HaveSparks()) {
        todaysScenarioState.IncreaseVote(0);
        this.localState.SpendSparks(1);
        await this.WriteToDDMLocalStorage(["sparks"], [this.localState.sparksAwarded]);
        await this.WriteToDDMLocalStorage([todaysScenarioState.id + "_choiceOne"], [todaysScenarioState.choiceOneVotesUser]);
        this.sparksCounter.innerHTML = this.localState.sparksAwarded.toString();
        this.voteChoiceOneUser.innerHTML = todaysScenarioState.choiceOneVotesUser.toString();
        this.voteChoiceOneGlobal.innerHTML = "Total Votes: " + todaysScenarioState.choiceOneVotesGlobal.toString();
        this.SentVoteMatchState(socket, todaysScenarioState.id, 0, 1);
      }
    };
    const choiceTwoSubtractButton = voteScenario.querySelector('#' + "choiceTwoSubtract") as HTMLElement;
    choiceTwoSubtractButton.onclick = async () => {
      if (this.localState.HaveSpentSparksOnTodaysVote(1)) {
        todaysScenarioState.DecreaseVote(1);
        this.localState.GainSparks(1);
        await this.WriteToDDMLocalStorage(["sparks"], [this.localState.sparksAwarded]);
        await this.WriteToDDMLocalStorage([todaysScenarioState.id + "_choiceTwo"], [todaysScenarioState.choiceTwoVotesUser]);
        this.sparksCounter.innerHTML = this.localState.sparksAwarded.toString();
        this.voteChoiceTwoUser.innerHTML = todaysScenarioState.choiceTwoVotesUser.toString();
        this.voteChoiceTwoGlobal.innerHTML = "Total Votes: " + todaysScenarioState.choiceTwoVotesGlobal.toString();
        this.SentVoteMatchState(socket, todaysScenarioState.id, 1, -1);
      }
    };
    const choiceTwoAddButton = voteScenario.querySelector('#' + "choiceTwoAdd") as HTMLElement;
    choiceTwoAddButton.onclick = async () => {
      if (this.localState.HaveSparks()) {
        todaysScenarioState.IncreaseVote(1);
        this.localState.SpendSparks(1);
        await this.WriteToDDMLocalStorage(["sparks"], [this.localState.sparksAwarded]);
        await this.WriteToDDMLocalStorage([todaysScenarioState.id + "_choiceTwo"], [todaysScenarioState.choiceTwoVotesUser]);
        this.sparksCounter.innerHTML = this.localState.sparksAwarded.toString();
        this.voteChoiceTwoUser.innerHTML = todaysScenarioState.choiceTwoVotesUser.toString();
        this.voteChoiceTwoGlobal.innerHTML = "Total Votes: " + this.localState.voteStates[this.localState.round - 1].choiceTwoVotesGlobal.toString();
        this.SentVoteMatchState(socket, todaysScenarioState.id, 1, 1);
      }
    };
    this.voteContainer.innerHTML = "";
    this.voteContainer.append(voteScenario);
    //element.append(voteScenario);
  }

  async SetupChatChannelsAndPages()
  {
    this.teamProfilePages = [];
    let { width, height } = this.sys.game.canvas;

    const chatPage = this.add.dom(width / 2, height / 2, ChatPage() as HTMLElement);
    chatPage.setVisible(false);
    this.chatChannelOpen = document.getElementById('chat-channel-open') as HTMLElement;
    this.chatChannels = document.getElementById('chat-channels') as HTMLElement;
    this.chatSubmitButton = document.getElementById('chat-submit-button') as HTMLElement;
    this.chatMessageContainer = document.getElementById('chat-container') as HTMLElement;
    this.closeChatPageButton = chatPage.getChildByID('close-chat-page-button') as HTMLElement;
    this.closeChatChannelsPageButton = chatPage.getChildByID('close-chat-channels-page-button') as HTMLInputElement;
    this.returnToChatChannelsButton = chatPage.getChildByID('chat-channel-button-return') as HTMLInputElement;
    this.chatChannelTitle = chatPage.getChildByID('chat-channel-title') as HTMLInputElement;
    this.chatChannelIcon = chatPage.getChildByID('channel-icon') as HTMLImageElement;
    
    this.messageInput = chatPage.getChildByID('chat-input') as HTMLInputElement;
    this.chatFooterButton.onclick = () => {
      chatPage.setVisible(true);
      this.avatarOverlay.setVisible(false);
      this.tapAreaLeft.removeInteractive();
      this.tapAreaRight.removeInteractive();
    }
    this.closeChatPageButton.onclick = () => {
      chatPage.setVisible(false);
      this.avatarOverlay.setVisible(true);
      this.tapAreaLeft.setInteractive();
      this.tapAreaRight.setInteractive();
    }
    this.closeChatChannelsPageButton.onclick = () => {
      chatPage.setVisible(false);
      this.avatarOverlay.setVisible(true);
      this.tapAreaLeft.setInteractive();
      this.tapAreaRight.setInteractive();
    }
    this.returnToChatChannelsButton.onclick = () => {
      this.chatChannelOpen.style.display="none";
      this.chatChannels.style.display="block";
    }

    const container = chatPage.getChildByID('chat-channel-container') as HTMLElement;
    var k = 0;
    this.staticData.chatChannels.forEach((channel) => {
      
      var id = channel.id;
      if(this.localState.chatChannels[id] != null)
      {
        var src = "/assets/white_icons/" + channel.iconPath + ".png"; 
        const chatChannel = ChatChannel(channel.title, src) as HTMLElement;
        const chatChannelOpenButton = chatChannel.querySelector("#chat-channel-button-open") as HTMLElement;
        
        chatChannelOpenButton.onclick = () => {
          this.chatChannelOpen.style.display="block";
          this.chatChannels.style.display="none";
          this.chatChannelTitle.innerHTML = channel.title;
          this.chatChannelIcon.src = "/assets/white_icons/" + channel.iconPath + ".png";
          this.localState.SetCurrentChatChannel(channel.id);
          this.ReloadGroupChat(channel.id);

        }
        
        container.append(chatChannel);
      }
    })
  }

  async ReloadGroupChat(groupId: string)
  {

  }

  async SetupTeamProfiles(socket: Socket) {
    this.teamProfilePages = [];
    let { width, height } = this.sys.game.canvas;

    var k = 0;
    this.staticData.teams.forEach(
      (team) => {
        
        var title = team.id as string;
        console.log("title: " + title);
        const data = { name: team.title, biography: team.biography };
        const teamProfile = this.add.dom(width / 2, height / 2, TeamProfile(data) as HTMLElement);
        const teamIcon = teamProfile.getChildByID('team-icon') as HTMLElement;
        teamIcon.classList.add(team.iconId);
        const container = teamProfile.getChildByID('story-container') as HTMLElement;
        team.story.forEach((story) => {

          const storyAccordian = StoryAccordian(story) as HTMLElement;
          const mainButton = storyAccordian.querySelectorAll("#open-close-button")[0] as HTMLElement;
          const collapsibleMessage = storyAccordian.querySelectorAll("#collapsible-message")[0] as HTMLElement;
          mainButton.onclick = () => {
            if (collapsibleMessage.style.maxHeight) {
              collapsibleMessage.style.maxHeight = null; //works as intended
            }
            else {
              collapsibleMessage.style.maxHeight = collapsibleMessage.scrollHeight + "px";
            }
          }
          container.append(storyAccordian);
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

        if(this.localState.teamStates[k].userInFanClub)
        {
          fanClubIcon.style.display = "block";
          fanClubButtonContainer.style.display = "none";
          upgradeBackground.style.display = "block";
          upgradeValue.style.display = "inline";
          upgradeValue.innerHTML = this.localState.teamStates[k].upgradeLevel.toString();
        }
        else
        {
          fanClubIcon.style.display = "none";
          upgradeButtonContainer.style.display = "none";
          upgradeBackground.style.display = "none";
          upgradeValue.style.display = "none";
        }

        if(this.localState.actionPoints == 0)
        {
          donateButton.setAttribute("disabled",'');
          fanClubButton.setAttribute("disabled",'');
          upgradeButton.setAttribute("disabled",'');
        }

        k++;
        donateButton.onclick = async () => {
          if (this.localState.SpendActionPointOnDonation()) {
            this.localState.GainSparks(1 + this.localState.GetUpgradeLevel());
            this.localState.teamStates[this.localState.carouselPosition].DonateEnergy();
            this.actionPointsCounter.innerHTML = this.localState.actionPoints.toString();
            this.sparksCounter.innerHTML = this.localState.sparksAwarded.toString();

            if(this.localState.actionPoints == 0)
            {
              donateButton.setAttribute("disabled",'');
              fanClubButton.setAttribute("disabled",'');
              upgradeButton.setAttribute("disabled",'');
            }

            await this.WriteToDDMLocalStorage(["actionPoints", "sparks"], [this.localState.actionPoints, this.localState.sparksAwarded]);

            this.SetOverlayProgress(
              this.localState.teamStates[this.localState.carouselPosition].currentEnergy,
              this.localState.roundEnergyRequirement);

            for (var j = 0; j < this.localState.teamStates.length; j++) {
              var teamState = this.localState.teamStates[j];
              this.SetTeamProfileProgress(teamState.currentEnergy, this.localState.roundEnergyRequirement, j);
            }

            this.CSSAnimation([imageContainer], "jello-horizontal", 800);

            var getUserData = await localStorage.getItem("ddm_localData");
            const value = JSON.parse(getUserData as string);

            await this.DonateEnergyMatchState(socket, this.localState.currentTeamID);
            //update UI
          }
        }

        fanClubButton.onclick = async () => {
          if (this.localState.SpendActionPointOnFanClub()) {
            this.actionPointsCounter.innerHTML = this.localState.actionPoints.toString();

            this.localState.GetCurrentTeamState().JoinFanClub();
            await this.WriteToDDMLocalStorage(["actionPoints", this.localState.currentTeamID + "InFanClub"], [this.localState.actionPoints, true]);

            if(this.localState.actionPoints == 0)
            {
              donateButton.setAttribute("disabled",'');
              fanClubButton.setAttribute("disabled",'');
              upgradeButton.setAttribute("disabled",'');
            }

            //update UI
         
            fanClubButtonContainer.style.display = "none";
            fanClubIcon.style.display = "block";
            upgradeButtonContainer.style.display = "block"
            upgradeBackground.style.display = "block";
            upgradeValue.style.display = "inline";
        
            this.CSSAnimation([fanClubIcon, upgradeBackground],"puff-in-center", 800);
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
            await this.WriteToDDMLocalStorage(["actionPoints", this.localState.currentTeamID + "UpgradeLevel"], [this.localState.actionPoints, this.localState.GetCurrentTeamState().upgradeLevel]);

            if(this.localState.actionPoints == 0)
            {
              donateButton.setAttribute("disabled",'');
              fanClubButton.setAttribute("disabled",'');
              upgradeButton.setAttribute("disabled",'');
            }

            //update UI   
            upgradeValue.innerHTML = this.localState.GetCurrentTeamState().upgradeLevel.toString(); 
            this.CSSAnimation([imageContainer], "jello-horizontal", 800);
            this.CSSAnimation([upgradeValue, upgradeBackground], "wobble-hor-bottom", 800);

            //await this.DonateEnergyMatchState(socket, this.localState.currentTeamID);
          }
        }

        closeButton.onclick = () => {
          teamProfile.setVisible(false);
          this.avatarOverlay.setVisible(true);
          this.tapAreaLeft.setInteractive();
          this.tapAreaRight.setInteractive();
        }
      });

    for (var j = 0; j < this.localState.teamStates.length; j++) {
      var teamState = this.localState.teamStates[j];
      this.SetTeamProfileProgress(teamState.currentEnergy, this.localState.roundEnergyRequirement, j);
    }
  }

  imgs!: TeamImages[];
  cardTexs!: TeamRenderTextures[];
  faces;
  tweenDummy;
  pathDummy;
  follower;

  async CSSAnimation(elements: HTMLElement[], nameOfAnimationClass: string, animationLength: number)
  {
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

  async ReadFromDDMLocalStorageNumber(key: string) {
    const data = await localStorage.getItem('ddm_localData');
    const json = JSON.parse(data as string);
    return json[key] as number;
  }

  async RefreshFromDynamicData() {
    console.log("refresh");
    await this.GetLatestDynamicData();
    await this.ReloadLocalState();
    await this.WriteToDDMLocalStorage(["actionPoints", "energyRequirement", "round"], [this.localState.actionPoints, this.localState.roundEnergyRequirement, this.localState.round]);

    this.actionPointsCounter.innerHTML = this.localState.actionPoints.toString();
    this.roundCounter.innerHTML = this.localState.round.toString();
    this.SetOverlayProgress(this.localState.GetCurrentTeamState().currentEnergy, this.localState.roundEnergyRequirement);

    this.voteChoiceOneUser.innerHTML = this.localState.voteStates[this.localState.round - 1].choiceOneVotesUser.toString();
    this.voteChoiceTwoUser.innerHTML = this.localState.voteStates[this.localState.round - 1].choiceTwoVotesUser.toString();
    this.voteChoiceOneGlobal.innerHTML = "Total Votes: " + this.localState.voteStates[this.localState.round - 1].choiceOneVotesGlobal.toString();
    this.voteChoiceTwoGlobal.innerHTML = "Total Votes: " + this.localState.voteStates[this.localState.round - 1].choiceTwoVotesGlobal.toString();

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

      var startingColour = 0x808080;
      if (i == 0) {
        startingColour = 0xffffff;
      }
      this.imgs.push(
        new TeamImages(
          't_00' + i,
          a.setTint(startingColour),
          a_f.setTint(0x808080),
          b.setTint(startingColour),
          b_f.setTint(0x808080)
        )
      );
      var rendTex_front = this.add.renderTexture(0, 0, 600, 600);
      rendTex_front.draw(this.imgs[i].img_A, 150, 300);
      rendTex_front.draw(this.imgs[i].img_B, 450, 300);
      var rendTex_back = this.add.renderTexture(0, 0, 600, 600);
      rendTex_back.draw(this.imgs[i].img_A_flipped, 150, 300);
      rendTex_back.draw(this.imgs[i].img_B_flipped, 450, 300);
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
    }
    this.imgs.forEach((img) => {
      img.img_A.setVisible(false);
      img.img_A_flipped.setVisible(false);
      img.img_B.setVisible(false);
      img.img_B_flipped.setVisible(false);
    })
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
    this.tapAreaLeft = this.add.rectangle(0, height / 2, width / 3, height - 240, 0x6666, 0);
    this.tapAreaRight = this.add.rectangle(width, height / 2, width / 3, height - 240, 0x6666, 0);
    var cappedWidth = width;
    var cappedWidth = Math.min(width, 700);
    const tapAreaLeftArrow = this.add.image(cappedWidth / (32 / (2)), height / 2, 'arrow');
    const tapAreaRightArrow = this.add.image(width - (cappedWidth / (32 / (2))), height / 2, 'arrow');

    tapAreaLeftArrow.scale = cappedWidth / (32 * 4);
    tapAreaRightArrow.scale = cappedWidth / (32 * 4);
    tapAreaLeftArrow.flipX = true;

    this.tapAreaLeft.depth = 1;
    tapAreaLeftArrow.depth = 1;
    this.tapAreaRight.depth = 1;
    tapAreaRightArrow.depth = 1;

    carousel.roll?.setDuration(300);
    carousel.roll?.on('complete', () => {
      this.carouselTapBool = true;
    });

    this.tapAreaLeft.setInteractive()
      .on('pointerdown', async (pointer, localX, localY, event) => {
        if (this.carouselTapBool) {
          this.carouselTapBool = false;
          carousel.roll?.toLeft();

          for (var i = 0; i < this.imgs.length; i++) {
            var img = this.imgs[i];
            (img.img_A as Image).setTint(0x808080);
            (img.img_B as Image).setTint(0x808080);
            (this.cardTexs[i].rendTex_front as RenderTexture).clear();
            this.cardTexs[i].rendTex_front.draw(this.imgs[i].img_A, 150, 300);
            this.cardTexs[i].rendTex_front.draw(this.imgs[i].img_B, 450, 300);
          }

          this.localState.RollCarousel(-1);
          (this.imgs[this.localState.carouselPosition].img_A as Image).setTint(0xffffff);
          (this.imgs[this.localState.carouselPosition].img_B as Image).setTint(0xffffff);
          await this.AnimateOverlayChange();
          this.avatarOverlayButton.innerHTML = this.staticData.teams[this.localState.carouselPosition].title;
        }
      });

    this.tapAreaRight.setInteractive()
      .on('pointerdown', async (pointer, localX, localY, event) => {
        if (this.carouselTapBool) {
          this.carouselTapBool = false;
          carousel.roll?.toRight();

          for (var i = 0; i < this.imgs.length; i++) {
            var img = this.imgs[i];
            (img.img_A as Image).setTint(0x808080);
            (img.img_B as Image).setTint(0x808080);
            (this.cardTexs[i].rendTex_front as RenderTexture).clear();
            this.cardTexs[i].rendTex_front.draw(this.imgs[i].img_A, 150, 300);
            this.cardTexs[i].rendTex_front.draw(this.imgs[i].img_B, 450, 300);
          }

          this.localState.RollCarousel(1);
          (this.imgs[this.localState.carouselPosition].img_A as Image).setTint(0xffffff);
          (this.imgs[this.localState.carouselPosition].img_B as Image).setTint(0xffffff);
          this.avatarOverlayButton.innerHTML = this.staticData.teams[this.localState.carouselPosition].title;

          await this.AnimateOverlayChange();
        }
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

    this.startCharacterGraphics = true;
    this.add.existing(carousel);
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
      var createMatch = await socket.createMatch();
      this.match = await socket.joinMatch(createMatch.match_id);
      console.log("match_id" + this.match.match_id);
    }
  }

  async DonateEnergyMatchState(socket: Socket, team_id: string) {

    console.log("donate!!!! " + this.localState.teamStates[this.localState.carouselPosition].currentEnergy);

    await socket.sendMatchState(this.match.match_id, 1, { "team_id": team_id }); //
  }

  async SentVoteMatchState(socket: Socket, scenarioId: string, choiceIndex: number, value: number) {

    console.log("send vote!!!! " + scenarioId + " " + choiceIndex + " " + value);

    await socket.sendMatchState(this.match.match_id, 2, { "scenarioId": scenarioId, "option": choiceIndex, "votes": value }); //
  }

  async ReceiveMatchState(socket: Socket) {
    socket.onmatchdata = async(result: MatchData) => {
      var content = result.data;
      switch (result.op_code) {
        case 101:
          this.RefreshFromDynamicData();
          this.localState.SetActionPointsToMax();
          await this.WriteToDDMLocalStorage(["actionPoints"], [this.localState.maxActionPoints]);
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
              this.UpdateNewsFeed(content);
          }
        default:
          console.info("User %o sent %o", result.presence.user_id, content);
      }
    };
  }

  async DisplayNotificationHome(id : string)
  {
    if(this.localState.notificationHomeOnScreen)
    {
      //wait
    } 
    else
    {
      var notificationData = this.staticData.notifications.filter(p=>p.id == id)[0] as NotificationData;
      if(notificationData != null)
      {
        var character = this.notificationHome.getChildByID("notification-character") as HTMLElement;
        var icon = this.notificationHome.getChildByID("notification-icon") as HTMLImageElement;
        var title = this.notificationHome.getChildByID("notification-title") as HTMLElement;
        var content = this.notificationHome.getChildByID("notification-content") as HTMLElement; 
        var nextButton = this.notificationHome.getChildByID("notification-button-next") as HTMLInputElement;
        var closeButton = this.notificationHome.getChildByID("notification-button-close") as HTMLInputElement;
      
        character.innerHTML = '<strong class="has-text-white">' + notificationData.character + '</strong>';
        icon.src = "/assets/white_icons/" + notificationData.iconPath + ".png"; 
        if(notificationData.showTitle == "TRUE")
        {
          title.style.display = "block";
          title.innerHTML = notificationData.title;
        }
        else
        {
          title.style.display = "none";
        }
        this.localState.DivideUpNotificationHomeContent(notificationData.content);
        this.localState.NextNotificationHomeContent();
        content.innerHTML = this.localState.GetCurrentNotificationHomeContent();
        if(this.localState.notificationHomeContentLength == 1)
        {
          nextButton.style.display = "none";
          closeButton.style.display = "block";
        }
        else
        {
          nextButton.style.display = "block";
          closeButton.style.display = "none";
        }

        this.notificationHome.setDepth(100);
        this.notificationHome.setVisible(true);
        this.AnimateIconWobble();

        nextButton.onclick = () => {
          if(this.localState.NextNotificationHomeContent())
          {
            content.innerHTML = this.localState.GetCurrentNotificationHomeContent();
            this.AnimateIconWobble();
          }
          else
          {
            content.innerHTML = this.localState.GetCurrentNotificationHomeContent();
            nextButton.style.display = "none";
            closeButton.style.display = "block";
            this.AnimateIconWobble();
          }
        };
        closeButton.onclick = () => {
          this.notificationHome.setVisible(false);
        };
      }
    }
    
  }

  UpdateNewsFeed(id : string)
  {

  }


  async JoinGlobalChat(socket: Socket, roomname: string)
  {
    const persistence = true;
    const hidden = false;
    const response = await socket.joinChat(roomname, 1, persistence, hidden);
  }

  async JoinGroup(session: Session, client: Client, groupName: string)
  {
    var cursor;
    var groupList = await (await this.client.listGroups(this.session, groupName, cursor, 1)).groups as Group[];
    var groupId = (groupList[0].id) as string;

    var joinedGroup = await client.joinGroup(session, groupId);
    console.info("Sent group join request", groupName);
    if(joinedGroup)
    {
      console.log("Joined " + groupName);
    }

    return groupId;
  }

  async GetGroupsFromAccount()
  {
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

  async JoinGroupChat(socket: Socket, groupname: string)
  {
    const persistence = true;
    const hidden = false;
    const response = await socket.joinChat(groupname, 3, persistence, hidden);
  }

  GetKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

  async initializeChat(socket: Socket, roomname: string) {
    //receive code is here

    socket.onchannelmessage = async (message) =>{
      
      const key = this.GetKeyByValue(this.localState.chatChannels, message.group_id);

      if(key!= null)
      {
        var account = await this.client.getUsers(this.session, [message.sender_id]);
        var users = account.users as User[];
        var avatarUrl = users[0].avatar_url as string;
        var username = users[0].username as string;

        if (message.sender_id == this.session.user_id) {

          // if chat open
          if(this.localState.GetCurrentChatChannelGroupId() == message.group_id)
          {
            const messageElement = ChatMessageCurrentUser(username, message.content.message, avatarUrl) as HTMLElement;
            this.chatMessageContainer.append(messageElement);
          }
          else
          {
            // we'll show to when the chat is changed
          }
          
          // last message chat bar
          //
        }
        else {
          // if chat open
          if(this.localState.GetCurrentChatChannelGroupId() == message.group_id)
          {
            const messageElement = ChatMessageOtherUser(username, message.content.message, avatarUrl) as HTMLElement;
            this.chatMessageContainer.append(messageElement);
          }
          else
          {
            // we'll show to when the chat is changed
          }

          // last message chat bar
          //
        }
        this.chatMessageContainer.scrollTop = this.chatMessageContainer.scrollHeight;
    
      }
    };

    socket.onchannelmessage = async (message) => {
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
    };

    const persistence = true;
    const hidden = false;

    // 1 = Room, 2 = Direct Message, 3 = Group
    console.log("About to join chat");
    const response = await socket.joinChat(roomname, 1, persistence, hidden);

    console.log("Now connected to channel id:", response.id);
    this.CreateChatMessages(this.client, this.session, response.id);

    this.chatSubmitButton.onclick = () => {
      var message = this.messageInput.value;
      console.log("text " + message);
      if (message.length > 0) {
        this.SendChatMessage(socket, "2..." + roomname, message);
        this.messageInput.value = "";
      }
    }
    //this.SendChatMessage(socket, response.id, this.session.username + " says: I think Red is the imposter!");
  }

  async SendChatMessage(socket: Socket, channelId: string, message: string) {
    var data = { "message": message };
    const messageAck = await socket.writeChatMessage(channelId, data);

    /*     var emoteData = {
        "emote": "point"
        //,"emoteTarget": "<redPlayerUserId>"
    }
    const emoteMessageAck = await socket.writeChatMessage(channelId, emoteData);
     */
  }

  async CreateChatMessages(client: Client, session: Session, channelId: string) {
    var forward = false;
    var result: ChannelMessageList = await client.listChannelMessages(session, channelId, 10, forward);
    result.messages?.forEach(async (message) => {
      console.log("Message has id %o and content %o", message.message_id, message.content);
      let getMessage: any = {};
      getMessage = message.content;

      var account = await this.client.getUsers(this.session, [message.sender_id as string]);
      var users = account.users as User[];
      var avatarUrl = users[0].avatar_url as string;
      var username = users[0].username as string;

      if (message.sender_id == this.session.user_id) {
        const messageElement = ChatMessageCurrentUser(username, getMessage.message, avatarUrl) as HTMLElement; // works! but can't find the message :/
        this.chatMessageContainer.prepend(messageElement);
      }
      else {
        const messageElement = ChatMessageOtherUser(username, getMessage.message, avatarUrl) as HTMLElement; // works! but can't find the message :/
        this.chatMessageContainer.prepend(messageElement);
      }
    });

    this.chatMessageContainer.scrollTop = this.chatMessageContainer.scrollHeight + 50;
  }


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
    if (this.startCharacterGraphics) this.UpdateDancers();
    if (this.startStarField) this.UpdateStarField();
  }
}



