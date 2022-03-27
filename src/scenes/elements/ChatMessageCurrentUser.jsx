import { h } from 'start-dom-jsx';

const ChatMessageCurrentUser = (username, content, imageURL, timeago) => {
  return (
    <div id="chat-message" class="chat-user-home">
    <div id="chat-top" class="chat-user-top">
      <div id="chat-username" class="chat-user-left">
        <strong>
        {username}
          </strong>
      </div>
    </div>
    <div class="chat-user-icon" id="chat-icon-container">
      <img id="chat-icon" src={imageURL}></img>
    </div>
    <div class="box has-background-primary chat-user-box is-size-6 mb-0 has-text-white">
      <span id="chat-content">
        {content}
      </span>
    </div>
    <div id="chat-bottom" class="chat-user-bottom">
      <div id="chat-time" class="chat-user-right mb-1 is-small">
      {timeago}
      </div>
    </div>
  </div>
  )
}

export default ChatMessageCurrentUser