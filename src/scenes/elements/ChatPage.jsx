import { h } from 'start-dom-jsx';

const ChatPage = () => {
  return (
    <div class="base">
      <div class="container">
        <div class="chat-page notification">
          <nav class="level">

            <div class="level-left">
              <div class="level-item has-text-centered">
                <h1 class="title has-text-black">Chat </h1>
                <img class="hdrftr-icon" src="/assets/black_icons/icon_chat_black.png" style=""></img>
              </div>
            </div>

          </nav>
          <div class="chat-container">

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