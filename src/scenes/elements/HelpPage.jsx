import { h } from 'start-dom-jsx';

const HelpPage = () => {
  return (
    <div>
      <div class="popup-page">
        <div class="box popup-box-wrapper">
          <div>
            <nav class="level is-mobile">
              <div class="level-left">
                <div class="level-item has-text-centered">
                  <h1 class="title has-text-black">Help</h1>
                </div>
              </div>
            </nav>
            <div style="position: absolute; right:7px; top: 7px;">
              <img id="close-help-page-button" class="hdrftr-icon" src="/assets/black_icons/icon_cross_black.png" style=""></img>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpPage