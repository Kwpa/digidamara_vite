import { h } from 'start-dom-jsx';

const Header = () => {
  return (

    <div class="fixed-header">
      <div class='notification has-background-dark'>
        <nav class="level is-mobile icon-area">
          <div class="level-item has-text-centered header-level-item">
            <div>
              <h1 class="heading has-text-centered has-text-white">Days Left</h1>
              <h1 id="round-header-value" class="title is-size-3 has-text-white">-</h1>
            </div>
            <span>
            </span>
          </div>
          <div class="level-item has-text-centered">
            <span>
              <h1 class="heading has-text-centered has-text-white">Energy</h1>
              <img class="hdrftr-icon hdr-icon" src="/assets/ui_icons/icon_UI_energy_transparent_36px.png"></img>
              <h1 id="ap-header-value" class="title is-size-3 has-text-white">-</h1>
            </span>
          </div>
          <div class="level-item has-text-centered">
            <span>
              <h1 class="heading has-text-centered has-text-white">Tickets</h1>
              <img class="hdrftr-icon hdr-icon" src="/assets/ui_icons/icon_UI_voteticket_link_transparent_36px.png"></img>
              <h1 id="sparks-header-value" class="title is-size-3 has-text-white">-</h1>
            </span>
          </div>
          <div class="level-item has-text-centered">
            <div id="help-header-button" class="has-background-dark" style="padding: 0px;">
              <h1 class="heading has-text-centered has-text-white">Help</h1>
              <img class="hdrftr-icon hdr-icon" src="/assets/ui_icons/icon_UI_help_transparent_36px.png"></img>
            </div>
          </div>
        </nav>
      </div>
    </div>

  )
}

export default Header