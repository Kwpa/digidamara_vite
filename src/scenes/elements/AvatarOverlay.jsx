import { h } from 'start-dom-jsx';

const AvatarOverlay = (avatarName, id) => {
  return (

    <div class="ov-container">
      <div id="avatar-overlay-ui">
        <div class="panel is-primary team-panel">
          <button id="openProfile" class="button is-fullwidth has-text-centered panel-heading">
            {avatarName}
          </button>
          <div class="panel-block has-background-dark team-panel-block" style="margin-bottom: 0px">
            <div id="teamEliminated" class="has-text-centered has-background-danger team-eliminated" >
              <p>
                Eliminated!
              </p>
            </div>
            <div id="teamProgressContainer" class="team-progress-container">
              <div class="energy-img-container">
                <img class="energy-img" src="/assets/ui_icons/icon_UI_energy_outline_transparent_32px.png"></img>
              </div>
              <progress id="teamEnergyBar" class="progress is-warning team-progress-bar" value="30" max="100">30%</progress>
              <span class="energy-donated-number">
                10/100
              </span>
            </div>
          </div>
        </div>
        <div class="backing-circ-container-left">
          <div class="backing-circ"></div>
        </div>
        <div class="backing-circ-container-right">
          <div class="backing-circ"></div>
        </div>
        <div class="backing-circ-container-middle">
          <div class="backing-circ"></div>
        </div>
        <div id="fan-club-icon" class="fan-club-icon-left">
          <img src="/assets/ui_icons/icon_UI_fan_outline_transparent_36px.png" width="36" height="36"></img>
        </div>
        <div id="upgrade-background-container" class="fan-club-icon-right">
          <img src="/assets/ui_icons/icon_UI_upgrade_outline_transparent_36px.png" width="36" height="36"></img>
        </div>
        <div id="galaxy-background-container" class="fan-club-icon-middle">
          <img id="galaxy-icon" src="/assets/white_icons/icon_galaxy_apex_transparent_36px.png" width="36" height="36"></img>
        </div>
        
        <div style="position: absolute; 
                    top:-40px; 
                    right:0; 
                    width: 36px; 
                    height: 36px;">
          <div id="upgrade-value-container" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
            <h1 id="upgrade-value">0</h1>
          </div>
        </div>


      </div>
    </div>
  )
}

export default AvatarOverlay