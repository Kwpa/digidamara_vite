import { h } from 'start-dom-jsx';

const BaseWebsite = () => {
  return (
    <div class="base">
      <div class="fixed-header">
        <div class='notification has-background-dark'>
          <nav class="level is-mobile icon-area">
            <div class="level-item has-text-centered">
              <span>
                <h1 class="heading has-text-centered has-text-white">Round</h1>
                <img class="hdrftr-icon" src="/assets/white_icons/icon_day_white.png"></img>
              </span>
              <span>
                <h1 id="round-header-value" class="title is-size-2 has-text-white">-</h1>
              </span>
            </div>
            <div class="level-item has-text-centered">
              <span>
                <h1 class="heading has-text-centered has-text-white">Action Points</h1>
                <img class="hdrftr-icon" src="/assets/white_icons/icon_actionpoints_white.png"></img>
              </span>
              <span>
                <h1 id="ap-header-value" class="title is-size-2 has-text-white">-</h1>
              </span>
            </div>
            <div class="level-item has-text-centered">
              <span>
                <h1 class="heading has-text-centered has-text-white">Sparks</h1>
                <img class="hdrftr-icon" src="/assets/white_icons/icon_sparks_white.png"></img>
              </span>
              <span>
                <h1 id="sparks-header-value" class="title is-size-2 has-text-white">-</h1>
              </span>
            </div>
            <div class="level-item has-text-centered">
              <span>
                <h1 class="heading has-text-centered has-text-warning">Settings</h1>
                <img class="hdrftr-icon" src="/assets/white_icons/icon_cog_white.png"></img>
              </span>
            </div>
          </nav>
        </div>
      </div>
      <div id="gameArea"class="container">
        <h1 id="rnd-update" class="has-text-primary">
          HI
        </h1>
        <h1 id="chat-update" class="has-text-primary">
          HI
        </h1>
      </div>

      <div class="fixed-footer">
        <div class="notification has-background-dark">
          <nav class="level is-mobile icon-area">
            <div class="level-item has-text-centered">
              <div id="chat-footer-button" class="badger has-background-dark" style="padding: 0px;">
                <img class="hdrftr-icon" src="/assets/white_icons/icon_chat_white.png"></img>
                <h1 title="Badge top right" class="badge is-top-left">8</h1>
                <h1 class="heading has-text-centered has-text-white">Chat</h1>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div id="vote-footer-button" class="badger has-background-dark" style="padding: 0px;">
                <img class="hdrftr-icon" src="/assets/white_icons/icon_vote_white.png"></img>
                <h1 title="Badge top right" class="badge is-top-left">8</h1>
                <h1 class="heading has-text-centered has-text-white">Vote</h1>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div id="video-footer-button" class="badger has-background-dark" style="padding: 0px;">
                <img class="hdrftr-icon" src="/assets/white_icons/icon_camera_white.png"></img>
                <h1 title="Badge top right" class="badge is-top-left">8</h1>
                <h1 class="heading has-text-centered has-text-white">News</h1>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div class="badger has-background-dark" style="padding: 0px;">
                <img class="hdrftr-icon" src="/assets/white_icons/icon_help_white.png"></img>
                <h1 title="Badge top right" class="badge is-top-left">8</h1>
                <h1 class="heading has-text-centered has-text-white">Help</h1>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default BaseWebsite