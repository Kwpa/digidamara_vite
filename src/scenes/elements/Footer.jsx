import { h } from 'start-dom-jsx';

const Footer = () => {
  return (

    <div class="fixed-footer">
      <div class="notification has-background-dark">
        <nav class="level is-mobile icon-area">
          <div class="level-item has-text-centered">
            <div id="chat-footer-button" class="badger has-background-dark" style="padding: 0px;">
              <img class="hdrftr-icon" src="/assets/white_icons/icon_chat_white.png"></img>
              <h1 id="chat-badge" title="Badge top right" class="badge is-top-left chat-badge">8</h1>
              <h1 class="heading has-text-centered has-text-white">Chat</h1>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div id="vote-footer-button" class="badger has-background-dark" style="padding: 0px;">
              <img class="hdrftr-icon" src="/assets/white_icons/icon_vote_white.png"></img>
              <h1 id="vote-badge" title="Badge top right" class="badge is-top-left vote-badge">8</h1>
              <h1 class="heading has-text-centered has-text-white">Vote</h1>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div id="video-footer-button" class="badger has-background-dark" style="padding: 0px;">
              <img class="hdrftr-icon" src="/assets/white_icons/icon_camera_white.png"></img>
              <h1 title="Badge top right" class="badge is-top-left video-badge">8</h1>
              <h1 class="heading has-text-centered has-text-white">Video</h1>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div id="settings-footer-button" class="has-background-dark" style="padding: 0px;">
              <img class="hdrftr-icon" src="/assets/white_icons/icon_cog_white.png"></img>
              <h1 class="heading has-text-centered has-text-white">Settings</h1>
            </div>
          </div>
        </nav>
      </div>
    </div>

  )
}

export default Footer