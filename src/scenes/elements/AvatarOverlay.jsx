import { h } from 'start-dom-jsx';

const AvatarOverlay = (avatarName) => {
  return (
    <div>
      <div class="ov-container">
        <div style="width: inherit;">
          <div id="avatar-overlay-ui" style="position: absolute; bottom: 20px; width: inherit;">
            <div class="level box has-background-dark" style="padding: 0 0 0 0; border-style: solid; border-color: white;">
              <div class="level-item">
                <img src="/assets/images/heart.png" width="50px" height="50px"></img>
                <progress id="teamEnergyBar" class="progress is-warning" value="30" max="100" style="background: #696969;">30%</progress>
              </div>
            </div>
            <div class="level">
              <div class="level-item">
                <button id="openProfile" class="button is-primary">{avatarName}</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default AvatarOverlay