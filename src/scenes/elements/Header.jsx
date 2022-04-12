import { h } from 'start-dom-jsx';

const Header = () => {
  return (

    <div class="fixed-header">
      <div class='notification has-background-dark'>
        <nav class="level is-mobile icon-area">
          <div class="level-item has-text-centered">
            <span>
              <h1 class="heading has-text-centered has-text-white">Round</h1>
              <h1 id="round-header-value" class="title is-size-2 has-text-white">-</h1>
            </span>
            <span>
            </span>
          </div>
          <div class="level-item has-text-centered">
            <span>
              <h1 class="heading has-text-centered has-text-white">AP</h1>
              <img class="hdrftr-icon" src="/assets/white_icons/icon_actionpoints_white.png" style="display:none"></img>
              <h1 id="ap-header-value" class="title is-size-2 has-text-white">-</h1>
            </span>
          </div>
          <div class="level-item has-text-centered">
            <span>
              <h1 class="heading has-text-centered has-text-white">Sparks</h1>
              <img class="hdrftr-icon" src="/assets/white_icons/icon_sparks_white.png" style="display:none"></img>
              <h1 id="sparks-header-value" class="title is-size-2 has-text-white">-</h1>
            </span>
          </div>
          <div class="level-item has-text-centered">
            <div id="help-header-button" class="has-background-dark" style="padding: 0px;">
              <h1 class="heading has-text-centered has-text-white">Help</h1>
              <img class="hdrftr-icon" src="/assets/white_icons/icon_help_white.png"></img>
            </div>
          </div>
        </nav>
      </div>
    </div>

  )
}

export default Header