import { h } from 'start-dom-jsx';

const ChatPage = () => {
  return (
    <div>
      <div class="ch-container">
        <div class="chat-page box">
          <nav class="level is-mobile">
            <div class="level-left">
              <div class="level-item has-text-centered">
                <h1 class="title has-text-black">Chat </h1>
                <img class="hdrftr-icon" src="/assets/black_icons/icon_chat_black.png" style=""></img>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item has-text-centered">
                <img id="close-chat-page-button" class="hdrftr-icon" src="/assets/black_icons/icon_cross_black.png" style=""></img>
              </div>
            </div>
          </nav>
          <div id="chat-container" class="chat-message-container scroller">
          </div>
          <div class="field is-grouped chat-input-footer">
            <p class="control chat-input">
              <input id="chat-input" class="input" type="text" placeholder="Text input"></input>
            </p>
            <p class="control">
              <button id="chat-submit-button" class="button is-primary is-responsive">Send</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPage