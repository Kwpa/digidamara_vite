import { h } from 'start-dom-jsx';

const ChatMessageOtherUser = (username, content, imageURL, timeago, iconStyle) => {
  return (
    <div id="chat-message" class="chat-other-home">
    <div id="chat-top" class="chat-user-top">
      <div id="chat-username" class="chat-user-left">
        <strong>
        {username}
          </strong>
      </div>
    </div>
    <div class="chat-other-icon" id="chat-icon-container" style={iconStyle}>
      <img id="chat-icon" src={imageURL}></img>
    </div>
    <div class="box has-background-dark chat-other-box is-size-6 mb-0 has-text-white">
      <span id="chat-content">
        {content}
      </span>
    </div>
    <div id="chat-bottom" class="chat-other-bottom">
      <div id="chat-time" class="chat-other-right mb-1 is-small">
      {timeago}
      </div>
    </div>
  </div>
  )
}

export default ChatMessageOtherUser