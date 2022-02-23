import { h } from 'start-dom-jsx';

const ChatMessageCurrentUser = (username, content, imageURL) => {
  return (
    <div id="chat-message" class="justify-right chat-message-current-user box has-background-info has-text-white is-size-6">
      
      <h3 >
        {username} <span><img src={imageURL}></img></span>
      </h3>
      <h3>
        {content}
      </h3>
    </div>
  )
}

export default ChatMessageCurrentUser