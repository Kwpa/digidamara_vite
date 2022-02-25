import Phaser, { Scene, Tweens } from 'phaser';
import BaseWebsite from './elements/BaseWebsite';
import ChatPage from './elements/ChatPage';
import VideoPage from './elements/VideoPage';
import ChatMessageOtherUser from './elements/ChatMessageOtherUser';
import ChatMessageCurrentUser from './elements/ChatMessageCurrentUser';
import VideoTile from './elements/VideoTile';
import VoteScenario from './elements/VoteScenario';
import AvatarOverlay from './elements/AvatarOverlay';
import TeamProfile from './elements/TeamProfile';
import VotingPage from './elements/VotingPage';
import Bulma from '../node_modules/bulma/css/bulma.css';
import { ChannelMessage, ChannelMessageList, Client, Session, Socket, StorageObject, Users, User, Match, StorageObjects, MatchData } from "@heroiclabs/nakama-js";
import collect from 'collect.js';
import PerspectiveImagePlugin from 'phaser3-rex-plugins/plugins/perspectiveimage-plugin.js';
import { PerspectiveCarousel } from 'phaser3-rex-plugins/plugins/perspectiveimage.js';
import LocalGameState, { TeamImages, TeamRenderTextures } from './LocalGameState';
import StaticData from './StaticData';
import RenderTexture from 'phaser3-rex-plugins/plugins/gameobjects/mesh/perspective/rendertexture/RenderTexture';
import Sprite from 'phaser3-rex-plugins/plugins/gameobjects/mesh/perspective/sprite/Sprite';
import Image from 'phaser3-rex-plugins/plugins/gameobjects/mesh/perspective/image/Image';
import { Rectangle } from 'phaser3-rex-plugins/plugins/gameobjects/shape/shapes/geoms';

export default class MainScene extends Phaser.Scene {

  localState!: LocalGameState;
  staticData!: StaticData;
  
  teams_data!: object;
  barks_data!: object;
  items_data!: object;
  story_data!: object;
  notifications_data!: object;
  voteScenarios_data!: object;
  labels_data!: object;

  teamProfilePages!: Phaser.GameObjects.DOMElement[];

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

  chatSubmitButton!: HTMLElement;
  settingsHeaderButton!: HTMLElement;
  chatFooterButton!: HTMLElement;
  voteFooterButton!: HTMLElement;
  videoFooterButton!: HTMLElement;
  helpFootButton!: HTMLElement;
  closeSettingsPageButton!: HTMLElement;
  closeChatPageButton!: HTMLElement;
  closeVotePageButton!: HTMLElement;
  closeVideoPageButton!: HTMLElement;
  closeHelpPageButton!: HTMLElement;
  
  roundCounter!: HTMLElement;
  actionPointsCounter!: HTMLElement;
  sparksCounter!: HTMLElement;

  tapAreaLeft;
  tapAreaRight;

  avatarOverlayButton!: HTMLElement;
  voteContainer!: HTMLElement;
  avatarOverlay!: Phaser.GameObjects.DOMElement;

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


  constructor() {
    super('MainScene');
  }

  preload() {
    //this.load.crossOrigin = "Anonymous";
    
    this.load.atlas('atlas', '/assets/test_avatars/avatar_atlas.png', ' /assets/json/avatar_atlas.json');
    this.load.image('arrow', '/assets/ui/arrow.png');
    this.load.image('star', '/assets/ui/star.png');
    this.load.image('heart', '/assets/ui/heart.png');
    this.load.image('spotlight', '/assets/ui/spotlight2.png');
    this.load.json('voteScenarios_content', 'https://digidamara.com/data/eng/VotingScenarios.json'); //https://digidamara.com/data/eng/VotingScenarios.json
    this.load.json('teams_content', 'https://digidamara.com/data/eng/Teams.json');
    this.load.json('barks_content', 'https://digidamara.com/data/eng/Barks.json');
    this.load.json('items_content', 'https://digidamara.com/data/eng/Items.json');
    this.load.json('storyUnlocks_content', 'https://digidamara.com/data/eng/Story.json');
    this.load.json('notifications_content', 'https://digidamara.com/data/eng/Notifications.json');
    this.load.json('appLabels_content', 'https://digidamara.com/data/eng/Labels.json');
    this.load.json('eightpath', '/assets/json/paths/path_2.json');
    //this.load.on('complete', this.AsyncCreate);
  }

  create() //to tackle - server code and setup for typescript!
  {
    console.log('load Main Scene');
    
    this.AsyncCreate();
  }

  async LoadJSON()
  {
    this.teams_data = this.cache.json.get('teams_content') as object;
    this.barks_data = this.cache.json.get('barks_content') as object;
    this.items_data = this.cache.json.get('items_content') as object;
    this.story_data = this.cache.json.get('storyUnlocks_content') as object;
    this.notifications_data = this.cache.json.get('notifications_content') as object;
    this.voteScenarios_data = this.cache.json.get('voteScenarios_content') as object;
    console.log(this.notifications_data);
    this.labels_data = this.cache.json.get('appLabels_content') as object;
  }

  async AsyncCreate()
  {
    await this.delay(10000);
    await this.LoadJSON();
    console.log(this.cache.json);
    let { width, height } = this.sys.game.canvas;
    const game = document.getElementsByTagName('canvas')[0];
    game.style.setProperty('position', 'absolute');
    game.style.setProperty('z-index', '-1');

    const baseWebsite = this.add.dom(width / 2, height / 2, BaseWebsite() as HTMLElement);
    const chatPage = this.add.dom(width / 2, height / 2, ChatPage() as HTMLElement);
    const videoPage = this.add.dom(width / 2, height / 2, VideoPage() as HTMLElement);
    const votePage = this.add.dom(width / 2, height / 2, VotingPage() as HTMLElement);
    this.avatarOverlay = this.add.dom(width / 2, height / 2, AvatarOverlay('open') as HTMLElement);

    chatPage.setVisible(false);
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
    this.chatSubmitButton = document.getElementById('chat-submit-button') as HTMLElement;
    this.chatMessageContainer = document.getElementById('chat-container') as HTMLElement;
    this.messageInput = chatPage.getChildByID('chat-input') as HTMLInputElement;
    this.chatFooterButton = document.getElementById('chat-footer-button') as HTMLElement;
    this.videoFooterButton = document.getElementById('video-footer-button') as HTMLElement;
    this.voteFooterButton = document.getElementById('vote-footer-button') as HTMLElement;
    this.closeChatPageButton = chatPage.getChildByID('close-chat-page-button') as HTMLElement;
    this.closeVideoPageButton = videoPage.getChildByID('close-video-page-button') as HTMLElement;
    this.closeVotePageButton = votePage.getChildByID('close-voting-page-button') as HTMLElement;
    this.voteContainer = votePage.getChildByID('vote-container') as HTMLElement;
    this.videoTileContainer = videoPage.getChildByID('video-container') as HTMLElement;
    this.avatarOverlayButton = this.avatarOverlay.getChildByID('openProfile') as HTMLElement;


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
      this.avatarOverlay.setVisible(false);
      this.tapAreaLeft.removeInteractive();
      this.tapAreaRight.removeInteractive();
    }
    this.SetVideoImages(this.videoTileContainer);

    //-----------------------------

    const spotlight = this.add.image(width / 2, height / 2, 'spotlight');
    spotlight.setAlpha(0.4);
    spotlight.scaleY = height / 500;
    spotlight.scaleX = Math.max(1, width / 1000);

    this.GetLatestStaticData();
    this.StartClientConnection();


    this.GetLatestDynamicData();

    this.StarField();
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
      this.labels_data
    );
  }

  async GetLatestDynamicData() {

  }

  StarField() {
    let { width, height } = this.sys.game.canvas;
    this.starSprite = this.add.sprite(0, 0, 'heart');
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
  }

  async StartClientConnection() {
    var rand = Math.floor(Math.random() * 10000);
    var email = "kaiuser_" + rand + "@gmail.com";
    var password = "password";
    var url = "https://source.boringavatars.com/marble/50/" + rand;
    this.client = new Client("defaultkey", "127.0.0.1", "7350", false);
    this.session = await this.client.authenticateEmail(email, password, true);

    await this.client.updateAccount(this.session,
      {
        username: rand.toString(),
        avatar_url: url
      }
    );

    //this.session.username = "Kai";
    //this.socket = this.client.createSocket(true, false);
    console.info("Successfully authenticated:", this.session);
    let id: string = this.session.user_id as string;
    console.info("Sesh id:", id);

    await this.SetupLocalState(id);

    const socket = this.client.createSocket();
    await socket.connect(this.session, true);

    await this.SetupTeamProfiles(socket);
    await this.SetupTeamAvatars();
    await this.SetupVotePage(socket);

    await this.JoinMatch(socket);
    await this.ReceiveMatchState(socket);

    var roomname = "PublicChat";
    await this.initializeChat(socket, roomname);

    //await this.GetRandomNumberDelay();

    //-----------------------------
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

  async SetupLocalState(user_id: string) {
    var account = await this.client.getAccount(this.session);
    this.localState = new LocalGameState();
    var list: string[] = [];
    this.staticData.teams.forEach((team) => {
      list.push(team.id);
    })
    var username = account.user?.username as string;
    this.localState.Init(username, 5, list);
    this.actionPointsCounter.innerHTML=this.localState.actionPoints.toString();
    this.sparksCounter.innerHTML=this.localState.sparksAwarded.toString();
    this.roundCounter.innerHTML=this.localState.round.toString();
  }

  async SetupVotePage(socket: Socket) {

    var todaysScenario = this.staticData.voteScenarios[this.localState.GetRound()-1];
    console.log(todaysScenario);
    var voteScenario = VoteScenario(todaysScenario) as HTMLElement;
    const choiceOneField = voteScenario.querySelector('#' + "choiceOne") as HTMLElement;
    const choiceOneSubtractButton = voteScenario.querySelector('#' + "choiceOneSubtract") as HTMLElement;
    choiceOneSubtractButton.onclick=()=>{
      if(this.localState.HaveSpentSparksOnTodaysVote(0))
      {
        this.localState.voteState.DecreaseVote(0);
        this.localState.GainSparks(1,false);
        this.sparksCounter.innerHTML=this.localState.sparksAwarded.toString();
        choiceOneField.innerHTML = this.localState.voteState.choiceOneVotes.toString();
      }
    };
    const choiceOneAddButton = voteScenario.querySelector('#' + "choiceOneAdd") as HTMLElement;
    choiceOneAddButton.onclick=()=>{
      if(this.localState.HaveSparks())
      {
        this.localState.voteState.IncreaseVote(0);
        this.localState.SpendSparks(1);
        this.sparksCounter.innerHTML=this.localState.sparksAwarded.toString();
        choiceOneField.innerHTML = this.localState.voteState.choiceOneVotes.toString();
      }
    };
    const choiceTwoField = voteScenario.querySelector('#' + "choiceTwo") as HTMLElement;
    const choiceTwoSubtractButton = voteScenario.querySelector('#' + "choiceTwoSubtract") as HTMLElement;
    choiceTwoSubtractButton.onclick=()=>{
      if(this.localState.HaveSpentSparksOnTodaysVote(1))
      {
        this.localState.voteState.DecreaseVote(1);
        this.localState.GainSparks(1, false);
        this.SpendSparkOnTodaysVoteMatchState(socket, -1);
        this.sparksCounter.innerHTML=this.localState.sparksAwarded.toString();
        choiceTwoField.innerHTML = this.localState.voteState.choiceTwoVotes.toString();
      }
    };
    const choiceTwoAddButton = voteScenario.querySelector('#' + "choiceTwoAdd") as HTMLElement;
    choiceTwoAddButton.onclick=()=>{
      if(this.localState.HaveSparks())
      {
        this.localState.voteState.IncreaseVote(1);
        this.localState.SpendSparks(1);
        this.SpendSparkOnTodaysVoteMatchState(socket, 1);
        this.sparksCounter.innerHTML=this.localState.sparksAwarded.toString();
        choiceTwoField.innerHTML = this.localState.voteState.choiceTwoVotes.toString();
      }
    };
    this.voteContainer.innerHTML = "";
    this.voteContainer.append(voteScenario);
    //element.append(voteScenario);
  }

  async SetupTeamProfiles(socket: Socket) {
    this.teamProfilePages = [];
    let { width, height } = this.sys.game.canvas;

    this.staticData.teams.forEach(
      (team) => {
        var title = team.id as string;
        console.log("title: " + title);
        const data = { name: team.title };
        const teamProfile = this.add.dom(width / 2, height / 2, TeamProfile(data) as HTMLElement);
        teamProfile.setVisible(false);
        this.teamProfilePages.push(teamProfile);
        var donateButton = teamProfile.getChildByID('donateButton') as HTMLElement;
        var closeButton = teamProfile.getChildByID('close-team-page-button') as HTMLElement;
        donateButton.onclick = () => {
          if (this.localState.SpendActionPoints(1)) {
            this.localState.GainSparks(1, true);
            this.actionPointsCounter.innerHTML=this.localState.actionPoints.toString();
            this.sparksCounter.innerHTML=this.localState.sparksAwarded.toString();
            this.DonateEnergyMatchState(socket, this.localState.currentTeamID);
            //update UI
          }
        }
        closeButton.onclick = () => {
          teamProfile.setVisible(false);
          this.avatarOverlay.setVisible(true);
          this.tapAreaLeft.setInteractive();
          this.tapAreaRight.setInteractive();
        }
      });
  }

  imgs!: TeamImages[];
  cardTexs!: TeamRenderTextures[];
  faces;
  tweenDummy;
  pathDummy;
  follower;

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
    this.tapAreaLeft = this.add.rectangle(0, height / 2, width / 3, height, 0x6666, 0);
    this.tapAreaRight = this.add.rectangle(width, height / 2, width / 3, height, 0x6666, 0);
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
          console.log("new team " + this.localState.currentTeamID);
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
          console.log("new team " + this.localState.currentTeamID);
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


    this.add.existing(carousel);
  }

  async delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
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

    await socket.sendMatchState(this.match.match_id, 1, { "team_id": team_id }); //
  }

  async SpendSparkOnTodaysVoteMatchState(socket: Socket, choiceIndex: number) {

    await socket.sendMatchState(this.match.match_id, 2, { "choice": choiceIndex }); //
  }

  async ReceiveMatchState(socket: Socket) {
    socket.onmatchdata = (result: MatchData) => {
      var content = result.data;
      switch (result.op_code) {
        case 101:
          console.log("A custom opcode.");
          break;
        case 1:
          console.log("User " + result.presences[0].username + " donated Energy to " + content);
          break;
        case 2:
          console.log("User " + result.presences[0].username + " spent Sparks on " + content);
          break;
        case 4:
          console.log("User " + result.presences[0].username + " joined " + content + "s fan club");
          break;
        case 5:
          console.log("User " + result.presences[0].username + " upgraded " + content);
          break;
        default:
          console.info("User %o sent %o", result.presences[0].user_id, content);
      }
    };
  }

  async initializeChat(socket: Socket, roomname: string) {
    //receive code is here

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

  async GetRandomNumberDelay() {
    const users = await this.client.getUsers(this.session, ["ba700f1c-d7f0-4782-a0b4-ed7d8a1d1301"]);
    var user = collect(users.users).first();
    //console.info("username: " + user.username);
    //console.info("Repeat");    
    var result = await this.client.readStorageObjects(this.session, {
      "object_ids": [{
        "collection": "random",
        "key": "randomNumber_1",
        "user_id": user.id
      }]
    });

    //17739cb2-6fc6-4143-b9e1-4a82bfe62eb5

    if (result.objects.length > 0) {
      var storageObject = collect(result.objects).first();
      var jsonString = JSON.stringify(storageObject.value);
      var number = JSON.parse(jsonString).number;
      //console.info("Number: ", number);

      this.textElement.innerHTML = number;
    }

    this.time.delayedCall(1000, this.GetRandomNumberDelay, [], this);
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


      this.starSprite.setTint(this.listOfColours[i]);
      this.starFieldTexture.batchDraw(this.starSprite, x, y);
    }
    this.starFieldTexture.endDraw();
  }

  UpdateDancers() {

  }

  update() {
    // if (this.cardTexs != null) {
    //   /* this.TintRenderTexture(i, 0xffff0000); */
    //   this.pathDummy.getPoint(this.follower.t, this.follower.vec);
    //   var x = this.follower.vec.x;
    //   var y = this.follower.vec.y;

    //   var id = this.localState.carouselPosition;
    //   this.cardTexs[id].rendTex_front.clear();
    //   /* this.cardTexs[id].rendTex_front.draw(this.imgs[id].img_A, 150+(this.tweenDummy as Tweens.Tween).getValue()*10, 300);
    //   this.cardTexs[id].rendTex_front.draw(this.imgs[id].img_B, 450+(this.tweenDummy as Tweens.Tween).getValue()*-10,300); */

    //   this.cardTexs[id].rendTex_front.draw(this.imgs[id].img_A, 150 + x * 0.2, 200 + y * 0.2);
    //   x = -x + 460;
    //   y = y;
    //   this.cardTexs[id].rendTex_front.draw(this.imgs[id].img_B, 350 + x * 0.2, 200 + y * 0.2);
    // }
    // this.UpdateStarField();
  }
}



