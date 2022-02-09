import { h } from 'start-dom-jsx';

const ChatMessageOtherUser = (username, content, imageURL) => {
  return (
    <div id="chat-message" class="chat-message-other-user notification has-background-dark has-text-white is-size-6">
      <img src={imageURL}></img>
      <h3>
        {username}
      </h3>
      <h3>
        {content}
      </h3>
    </div>
  )
}

export default ChatMessageOtherUser