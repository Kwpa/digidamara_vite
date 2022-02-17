import Phaser, { Scene } from 'phaser';
import BaseWebsite from './elements/BaseWebsite';
import ChatPage from './elements/ChatPage';
import VideoPage from './elements/VideoPage';
import ChatMessageOtherUser from './elements/ChatMessageOtherUser';
import ChatMessageCurrentUser from './elements/ChatMessageCurrentUser';
import VideoTile from './elements/VideoTile';
import AvatarOverlay from './elements/AvatarOverlay';
import TeamProfile from './elements/TeamProfile';
import Bulma from '../node_modules/bulma/css/bulma.css';
import { ChannelMessage, ChannelMessageList, Client, Session, Socket, StorageObject, Users, User, Match, StorageObjects } from "@heroiclabs/nakama-js";
import collect from 'collect.js';
import PerspectiveImagePlugin from 'phaser3-rex-plugins/plugins/perspectiveimage-plugin.js';
import { PerspectiveCarousel } from 'phaser3-rex-plugins/plugins/perspectiveimage.js';
import LocalGameState from './LocalGameState';


export default class MainScene extends Phaser.Scene {

  localState!: LocalGameState;
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
  avatarOverlayButton!: HTMLElement;

  width!: number;
  height!: number;

  constructor() {
    super('MainScene');
  }

  preload() {
    this.load.image('imp', '/assets/test_avatars/avatar_cushionimp.png');
    this.load.image('imp-back', '/assets/test_avatars/avatar_cushionimp_flipped.png');

    this.load.image('spring', '/assets/test_avatars/avatar_springhand.png');
    this.load.image('spring-back', '/assets/test_avatars/avatar_springhand_flipped.png');

  }

  create() //to tackle - server code and setup for typescript!
  {
    let { width, height } = this.sys.game.canvas;
    console.log(width);
    console.log('load Main Scene');

    const game = document.getElementsByTagName('canvas')[0];
    game.style.setProperty('position', 'absolute');
    game.style.setProperty('z-index', '-1');

    var CreateCard = function (scene, front, back) {
      return scene.add.rexPerspectiveCard({
        front: { key: front },
        back: { key: back },
        flip: false
      })
    };
    const carousel = new PerspectiveCarousel(this,
      {
        x: width / 2, y: height / 2,
        faces:
          [
            CreateCard(this, 'imp', 'imp-back'),
            CreateCard(this, 'spring', 'spring-back'),
            CreateCard(this, 'imp', 'imp-back'),
            CreateCard(this, 'spring', 'spring-back'),
            CreateCard(this, 'imp', 'imp-back')
          ],
        faceSpace: width
      }
    ) as PerspectiveCarousel;

    this.add.existing(carousel);
    carousel.setInteractive()
      .on('pointerdown', function (pointer, localX, localY, event) {
        if (localX <= (carousel.width / 2)) {
          carousel.roll?.toLeft();
        } else {
          carousel.roll?.toRight();
        }
      });

    const baseWebsite = this.add.dom(width / 2, height / 2, BaseWebsite() as HTMLElement);
    const chatPage = this.add.dom(width / 2, height / 2, ChatPage() as HTMLElement);
    const videoPage = this.add.dom(width / 2, height / 2, VideoPage() as HTMLElement);
    const avatarOverlay = this.add.dom(width / 2, height / 2, AvatarOverlay() as HTMLElement); 
    
    chatPage.setVisible(false);
    videoPage.setVisible(false);
    //baseWebsite.setVisible(false);

    //debug
    this.textElement = document.getElementById('rnd-update') as HTMLElement;
    this.anotherTextElement = document.getElementById('chat-update') as HTMLElement;
    this.textElement.hidden = true;
    this.anotherTextElement.hidden = true;

    this.chatSubmitButton = document.getElementById('chat-submit-button') as HTMLElement;
    this.chatMessageContainer = document.getElementById('chat-container') as HTMLElement;
    this.messageInput = chatPage.getChildByID('chat-input') as HTMLInputElement;
    this.chatFooterButton = document.getElementById('chat-footer-button') as HTMLElement;
    this.videoFooterButton = document.getElementById('video-footer-button') as HTMLElement;
    this.closeChatPageButton = chatPage.getChildByID('close-chat-page-button') as HTMLElement;
    this.closeVideoPageButton = videoPage.getChildByID('close-video-page-button') as HTMLElement;
    this.videoTileContainer = videoPage.getChildByID('video-container') as HTMLElement;
    this.avatarOverlayButton = avatarOverlay.getChildByID('openProfile') as HTMLElement;
    

    this.chatFooterButton.onclick = () => {
      chatPage.setVisible(true);
    }
    this.closeChatPageButton.onclick = () => {
      chatPage.setVisible(false);
    }
    this.videoFooterButton.onclick = () => {
      videoPage.setVisible(true);
    }
    this.closeVideoPageButton.onclick = () => {
      videoPage.setVisible(false);
    }
    this.avatarOverlayButton.onclick = () => {
      videoPage.setVisible(false);
    }
    this.SetVideoImages(this.videoTileContainer);

    //-----------------------------

    this.StartClientConnection();

    

    this.GetLatestStaticData();
    this.GetLatestDynamicData();
    
  }

  async GetLatestStaticData()
  {

  }

  async GetLatestDynamicData()
  {
    
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

  async SetupLocalState(userid: string)
  {
    //this.localState.Init(username, maxActionPoints);
  }

  async SetupTeamProfiles(socket: Socket)
  {
    let { width, height } = this.sys.game.canvas;
    const data = {name: "milliton!"}

    const teamProfile = this.add.dom(width / 2, height / 2, TeamProfile(data) as HTMLElement);
    //teamProfile.setVisible(false); 
    
    var donateButton = teamProfile.getChildByID('donateButton') as HTMLElement;
    donateButton.onclick = () => {
      if(this.localState.SpendActionPoints(1))
      {
        this.localState.GainSparks(1);
        this.DonateEnergyMatchState(socket, "team_1");
        //update UI
      }
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

    await this.SetupLocalState(id)

    const socket = this.client.createSocket();
    await socket.connect(this.session, true);

    await this.SetupTeamProfiles(socket);

    await this.JoinMatch(socket);
    await this.ReceiveMatchState(socket);

    var roomname = "PublicChat";
    await this.initializeChat(socket, roomname);

    await this.GetRandomNumberDelay();

    //-----------------------------
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
    await socket.sendMatchState(this.match.match_id, 1, { "team_id": team_id });
  }

  async ReceiveMatchState(socket: Socket) {
    socket.onmatchdata = (result) => {
      var content = result.data;
      switch (result.op_code) {
        case 101:
          console.log("A custom opcode.");
          break;
        case 1:
          console.log("Team " + content + " donated Energy");
          break;
        default:
          console.log("User %o sent %o", result.presences[0].user_id, content);
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

  update() {

  }
}



