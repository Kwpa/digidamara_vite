import { h } from 'start-dom-jsx';

const ChatPage = () => {
  return (
    <div>
      <div class="popup-page">
        <div class="box popup-box-wrapper">
          <nav style="padding-bottom: 20px;">
            <button id="close-chat-page-button" class="button">X</button>
          </nav>
          <div id="chat-container" class="popup-page-scroll">
          </div>
          <input id="chat-input"></input>
          <button id="chat-submit-button" class="button">Submit</button>
        </div>
      </div>
    </div>
  )
}

export default ChatPage