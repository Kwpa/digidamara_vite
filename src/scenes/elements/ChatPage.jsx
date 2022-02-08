import { h } from 'start-dom-jsx';

const ChatPage = () => {
  return (
    <div class="base">
      <div class="chat-page notification">
        <div class="chat-container">

        </div>
        <div class="field is-grouped">
          <p class="control">
            <button class="button is-primary">Submit</button>
          </p>
          <p class="control">
            <button class="button is-link">Cancel</button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ChatPage