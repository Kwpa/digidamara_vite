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
      <div class="notification-icon" id="notification-icon-container">
        <img id="notification-icon" src={imageURL}></img>
      </div>
      <div class="box notification-box has-background-warning is-size-6">
        <h3 id="notification-title" class="is-size-4">
          {notification.title}
        </h3>
        <h3 id="notification-content">
          {notification.content}
        </h3>
      </div>
    </div>
  )
}

export default NotificationHome