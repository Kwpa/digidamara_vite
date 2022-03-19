import { h } from 'start-dom-jsx';

const NotificationHome = (notification, imageURL) => {
  return (
    <div class="notification-home">
      <div>
        <div id="notification-character" class="notification-left">
          {notification.character}
        </div>
        <div class="notification-right">
          <button id="notification-button-next" class="notification-next"> &gt; </button>
          <button id="notification-button-close" class="notification-close"> X </button>
        </div>
      </div>
      <div class="notification-icon">
        <img id="notification-icon" src={imageURL}></img>
      </div>
      <div id="notification-home" class="box has-background-info has-text-white is-size-6">
        <h3 id="notification-title">
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