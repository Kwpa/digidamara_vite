import { h } from 'start-dom-jsx';

const ChatChannel = (channelName, imageURL) => {
    return (
        <div id="chat-channel" style="position: relative;">
            <div class="box has-text-black is-size-6 chat-channel-box">
                <div>
                    <h3>{channelName} <span>
                        <button>Open</button>
                    </span></h3>
                    
                </div>
            </div>
            <div class="chat-channel-icon" id="notification-icon-container">
                <img id="notification-icon" src={imageURL}></img>
            </div>
        </div>
    )
}

export default ChatChannel