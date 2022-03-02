import { h } from 'start-dom-jsx';

const AvatarOverlay = (avatarName) => {
  return (
    <div>
      <div style="position: relative; width: 400px; height: 100vh; ">
        <div style="position: absolute; bottom: 160px; width: inherit;">
            <div class="level">
              <div class="level-item">
              <img src="/assets/images/heart.png" width="50px" height="50px"></img>
              <progress class="progress is-warning" value="30" max="100" style="background: #696969;">30%</progress>
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
  )
}

export default AvatarOverlay