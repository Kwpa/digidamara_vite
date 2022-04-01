import { h } from 'start-dom-jsx';

const Header = () => {
  return (

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

  )
}

export default Header