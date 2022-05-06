import { h } from 'start-dom-jsx';

const ChatChannel = (channelName, imageURL) => {
    return (
        <div id="chat-channel" style="position: relative;">
            <div class="box has-text-black is-size-6 chat-channel-box">
                <div>
                    <h3>{channelName} <span>
                        <button id="chat-channel-button-open" class="button is-primary is-small">&gt;</button>
                    </span></h3>
                    
                </div>
            </div>
            <div class="chat-channel-icon" id="notification-icon-container">
                <img id="channel-icon" class="channel-icon-image" src={imageURL}></img>
            </div>
        </div>
    )
}

export default ChatChannel