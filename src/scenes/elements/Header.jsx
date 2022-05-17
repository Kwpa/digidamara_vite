import { h } from 'start-dom-jsx';

const Header = (headerFontClasses="title is-size-3 has-text-white", headerCountPadding="title is-size-3 has-text-white") => {
  return (

    <div class="fixed-header">
      <div class='notification has-background-dark'>
        <nav class="level is-mobile icon-area">
          <div class="level-item has-text-centered header-level-item">
            <div id="round-value">
              <h1 class="heading has-text-centered has-text-white">Time Left</h1>
              <div>
                <h1 id="round-header-value" class={headerCountPadding}>-</h1>
              </div>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div id="ap-value">
              <h1 class="heading has-text-centered has-text-white">Energy</h1>
              <div class="hdr-icon-container">
                <img class="hdrftr-icon hdr-icon" src="/assets/ui_icons/icon_UI_energy_outline_transparent_32px.png"></img>
                <span id="ap-header-value" class={headerFontClasses}>
                  -
                </span>
              </div>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div id="sparks-value">
              <h1 class="heading has-text-centered has-text-white">Bonds</h1>
              <div class="hdr-icon-container">
                <img class="hdrftr-icon hdr-icon" src="/assets/ui_icons/icon_UI_ticket_outline_transparent_36px.png"></img>
                <span id="sparks-header-value" class={headerFontClasses}>
                  -
                </span>
              </div>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div id="help-header-button" class="has-background-dark" style="padding: 0px;">
              <h1 class="heading has-text-centered has-text-white">Help</h1>
              <img class="hdrftr-icon hdr-icon" src="/assets/ui_icons/icon_UI_help_outline_transparent_36px.png"></img>
            </div>
          </div>
        </nav>
      </div>
    </div>

  )
}

export default Header