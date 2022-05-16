import { h } from 'start-dom-jsx';

const SettingsPage = (time) => {
  return (
    <div class="popup-page">
      <div class="box popup-box-wrapper">
        <nav class="level is-mobile">
          <div class="level-left">
            <div class="level-item has-text-centered">
              <h1 class="title has-text-black">Settings</h1>
            </div>
          </div>
        </nav>
        <div style="position: absolute; right:7px; top: 37px;">
          <img id="close-settings-page-button" class="hdrftr-icon" src="/assets/black_icons/icon_cross_black.png" style=""></img>
        </div>
        <div class="popup-page-scroll-without-footer">
          <h1>Pilot build v0.3</h1>
          <button id="settings-mute"class="button">Toggle Music Mute</button>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage