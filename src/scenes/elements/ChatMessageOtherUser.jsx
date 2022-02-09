import { h } from 'start-dom-jsx';

const ChatMessageOtherUser = (content) => {
  return (
    <div id="chat-message" class="chat-message notification has-background-dark has-text-white is-size-6">
      <h3>
      {content}
      </h3>
    </div>
  )
}

export default ChatMessageOtherUser