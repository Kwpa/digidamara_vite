import { h } from 'start-dom-jsx';

const ChatPage = () => {
  return (
    <div>
      <div class="popup-page">
        <div class="box popup-box-wrapper">
          <div id="chat-channel-open" style="display: none;">

            <nav class="level is-mobile">
              <div class="level-left">
                <div class="level-item has-text-centered">
                  <h1 class="title has-text-black">Chat</h1>
                </div>
              </div>
            </nav>
            <div style="position: absolute; right:7px; top: 7px;">
              <img id="close-chat-page-button" class="hdrftr-icon" src="/assets/black_icons/icon_cross_black.png" style=""></img>
            </div>
            <div id="chat-container" class="popup-page-scroll-with-footer">
            </div>
            <input id="chat-input"></input>
            <button id="chat-submit-button" class="button">Submit</button>
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
    </div>
  )
}

export default ChatPage