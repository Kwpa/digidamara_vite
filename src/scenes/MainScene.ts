import Phaser from 'phaser';
import BaseWebsite from './elements/BaseWebsite';
import Bulma from '../node_modules/bulma/css/bulma.css';
import {Client} from "@heroiclabs/nakama-js";

export default class MainScene extends Phaser.Scene
{

  constructor() {
    super('css-scene')
  }

  preload() {
    //this.load.image('button1', 'assets/button.jpg');
  }

  create() //to tackle - server code and setup for typescript!
  {

    let { width, height } = this.sys.game.canvas
    console.log(width)
    console.log('load Main Scene')

    const game = document.getElementsByTagName('canvas')[0]
    game.style.setProperty('position', 'absolute');
    game.style.setProperty('z-index', '-1');
    const thing = this.add.dom(width/2,height/2, BaseWebsite() as HTMLElement);

    /*
    var useSSL = false; // Enable if server is run with an SSL certificate.
    var client = new Client("defaultkey", "127.0.0.1", "7350", useSSL);

    async function connectToServer(session)
    {
      var socket = client.createSocket();
      session = await socket.connect(session);
      console.info("Socket connected.");
    }

    async function authenticatePlayer(email, password)
    {
      const session = await client.authenticateEmail(email, password, true);

      console.log('session Created ' + session.created);
      console.log('session AuthToken ' + session.auth_token);
      console.log('session UserId ' + session.user_id);
      console.log('session Username ' + session.username);

      if(session.created === false)
      {
          console.log('account already exists');
      }
      else
      {
        localStorage.nakamaAuthToken = session.token;
        console.info("Authenticated successfully. User id:", session.user_id);

        //set up first time elements (client side not ideal)

        const objects = [{
          "collection": "collection",
          "key": "key1",
          "value": {"jsonKey": "jsonValue"}
        }, {
          "collection": "collection",
          "key": "key2",
          "value": {"jsonKey": "jsonVal"}
        }];
        const storageWriteAck = await client.writeStorageObjects(session, objects);
        console.info("Storage write was successful:", storageWriteAck);
      }

      const account = await client.getAccount(session);
      const user = account.user;
      console.info("User id '%o' and username '%o' and password '%o'.", user.id, user.username, user.password);

      connectToServer(session);

      const response = await client.rpc(session, "healthcheck", {});
      console.log(response.payload);
    }

    */
  }

  update()
  {
    
  }
}
