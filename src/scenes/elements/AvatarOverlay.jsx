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
      </div>
    </div>
  )
}

export default AvatarOverlay