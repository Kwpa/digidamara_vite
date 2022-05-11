import { h } from 'start-dom-jsx';

const NotificationHome = (notification, imageURL) => {
  return (
    <div class="notification-home">
      <div class="notification-top has-background-dark">
        <div id="notification-character" class="notification-left has-text-white">
          {notification.character}
        </div>
        <div class="notification-right">
          <div id="notification-button-next" class="notification-next"> Next </div>
          <div id="notification-button-close" class="notification-close"> Close </div>
        </div>
      </div>
      <div class="notification-icon-container" id="notification-icon-container">
        <img id="notification-icon" class="notification-icon-image" src={imageURL}></img>
      </div>
      <div id="notification-box" class="box notification-box has-background-warning is-size-6">
        <h3 id="notification-title" class="is-size-4">
          {notification.title}
        </h3>
        <h3 id="notification-content">
          {notification.content}
        </h3>
        <button id="notification-button-watch-latest-video" class="button notification-button-watch-latest-video is-primary">WATCH LATEST VIDEO</button>
        <button id="notification-button-todays-vote" class="button notification-button-todays-vote is-primary">VIEW TODAY'S VOTE</button>
        <button id="notification-button-fan-club-chat" class="button notification-button-fan-club-chat is-primary">VIEW FAN CLUB CHAT</button>
        <button id="notification-button-start-tutorial" class="button notification-button-start-tutorial is-primary">START TUTORIAL</button>
      </div>
    </div>
  )
}

export default NotificationHome