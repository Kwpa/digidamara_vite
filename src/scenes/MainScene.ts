import Phaser from 'phaser';
import BaseWebsite from './elements/BaseWebsite';
import ChatPage from './elements/ChatPage';
import Bulma from '../node_modules/bulma/css/bulma.css';
import { Client, Session, Socket, StorageObject, Users } from "@heroiclabs/nakama-js";
import collect from 'collect.js';


export default class MainScene extends Phaser.Scene {

  session!: Session;
  client!: Client;
  textElement!: HTMLElement;
  anotherTextElement!: HTMLElement;
  chatSubmitButton!: HTMLElement;
  messageInput!: HTMLInputElement;


  constructor() {
    super('MainScene');
/*     this.session
    this.client
    this.textElement
    this.anotherTextElement
    this.messageInput */
  }

  preload() {

  }

  create() //to tackle - server code and setup for typescript!
  {


    let { width, height } = this.sys.game.canvas;
    console.log(width);
    console.log('load Main Scene');

    const game = document.getElementsByTagName('canvas')[0];
    game.style.setProperty('position', 'absolute');
    game.style.setProperty('z-index', '-1');

    const baseWebsite = this.add.dom(width / 2, height / 2, BaseWebsite() as HTMLElement);
    const chatPage = this.add.dom(width / 2, height / 2, ChatPage() as HTMLElement);

    this.textElement = document.getElementById('rnd-update') as HTMLElement;
    this.anotherTextElement = document.getElementById('chat-update') as HTMLElement;
    this.chatSubmitButton = document.getElementById('chat-submit-button') as HTMLElement;
    this.messageInput = chatPage.getChildByID('chat-input') as HTMLInputElement;


    //-----------------------------

    this.StartClientConnection();

  }
  async StartClientConnection() {
    var email = "kaiuser_001@gmail.com";
    var password = "password";
    this.client = new Client("defaultkey", "127.0.0.1", "7350", false);
    this.session = await this.client.authenticateEmail(email, password, true);
    this.session.username = "Kai";
    //this.socket = this.client.createSocket(true, false);
    console.info("Successfully authenticated:", this.session);
    let id = this.session.user_id;
    console.info("Sesh id:", id);

    const socket = this.client.createSocket();
    await socket.connect(this.session, true); //ssl?

    //-----------------------------

    var roomname = "PublicChat";
    this.initializeChat(socket, roomname);

    this.getRandomNumberDelay();

    this.chatSubmitButton.onclick = () => {
      var message = this.messageInput.value;
      console.log("text " + message);
      this.SendChatMessage(socket, "2..." + roomname, message);
      this.messageInput.value = ""; 
    }
  }

  async initializeChat(socket: Socket, roomname: string) {
    //receive code is here

    socket.onchannelmessage = (message) => {
      console.log("Received a message on channel: %o", message.channel_id);
      console.log("Message content: %o", message.content);
      this.anotherTextElement.innerHTML = message.content.message;
    };

    const persistence = true;
    const hidden = false;

    // 1 = Room, 2 = Direct Message, 3 = Group
    console.log("About to join chat");
    const response = await socket.joinChat(roomname, 1, persistence, hidden);

    console.log("Now connected to channel id:", response.id);
    this.SendChatMessage(socket, response.id, this.session.username + " says: I think Red is the imposter!");
  }

  async SendChatMessage(socket: Socket, channelId: string, message: string) {
    var data = { "message": message };
    const messageAck = await socket.writeChatMessage(channelId, data);
    /* 
    var emoteData = {
        "emote": "point",
        "emoteTarget": "<redPlayerUserId>"
    }
    const emoteMessageAck = await socket.writeChatMessage(channelId, emoteData);
    */
  }

  async getRandomNumberDelay() {
    const users = await this.client.getUsers(this.session, ["17739cb2-6fc6-4143-b9e1-4a82bfe62eb5"]);
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

    this.time.delayedCall(1000, this.getRandomNumberDelay, [], this);
  }

  update() {

  }
}



