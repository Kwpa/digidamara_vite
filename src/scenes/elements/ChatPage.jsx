import { h } from 'start-dom-jsx';

const ChatPage = () => {
  return (
    

      <div class="popup-page">
        <div class="box popup-box-wrapper">
          <div id="chat-channel-open" style="display: none;">

            <nav class="level is-mobile">
              <div class="level-left">
                <div class="level-item has-text-centered">
                  <div class="chat-channel-container" id="channel-icon-container">
                    <img id="channel-icon"></img>
                  </div>
                  <button id="chat-channel-button-return" class="button is-warning chat-channel-button-return">&lt;</button>
                  <h1 id="chat-channel-title" class="title has-text-black">Chat</h1>
                </div>
              </div>
            </nav>
            <div style="position: absolute; right:7px; top: 7px;">
              <img id="close-chat-page-button" class="hdrftr-icon" src="/assets/black_icons/icon_cross_black.png" style=""></img>
            </div>
              <div id="chat-container" class="popup-page-scroll-with-footer">
            </div>
            <div class="chat-input-container">
              <input id="chat-input" class="input chat-input-element"></input>
              <button id="chat-submit-button" class="button chat-input-submit-button is-primary">Submit</button>
            </div>
          </div>
          <div id="chat-channels">
            <nav class="level is-mobile">
              <div class="level-left">
                <div class="level-item has-text-centered">
                  <h1 class="title has-text-black">Your Signals</h1>
                </div>
              </div>
            </nav>
            <div style="position: absolute; right:7px; top: 7px;">
              <img id="close-chat-channels-page-button" class="hdrftr-icon" src="/assets/black_icons/icon_cross_black.png" style=""></img>
            </div>
            <div id="chat-channel-container" class="popup-page-scroll-with-footer">
            </div>
          </div>
        </div>
      </div>
  )
}
    

export default ChatPage