import { h } from 'start-dom-jsx';

const ChatChannel = (channelName, imageURL) => {
    return (
        <div id="chat-channel" class="box has-text-black is-size-6" style="position: relative;">
            <div>
                <h3>{channelName}</h3>
            </div>
            <div class="chat-channel-icon" id="notification-icon-container">
                <img id="notification-icon" src={imageURL}></img>
            </div>
        </div>
    )
}

export default ChatChannel