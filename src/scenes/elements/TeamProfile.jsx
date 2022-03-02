import { h } from 'start-dom-jsx';

const TeamProfile = (teamData) => {
  return (
    <div class="base">
      <div class="base-container" style="height: 100%;">
        <div class="team-page box" style="height: 100%;">
          <nav class="level">
            <div class="level-left">
              <div class="level-item has-text-centered">
                <h1 class="title has-text-black">{teamData.name}</h1>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item has-text-centered">
                <img id="close-team-page-button" class="hdrftr-icon" src="/assets/black_icons/icon_cross_black.png" style=""></img>
              </div>
            </div>
          </nav>
          <div class='box'>
            <h1 class="content">Story</h1>
            <div class="level">
              <button id="donateButton" class="button is-primary is-responsive">Donate</button>
              <button id="joinFanClubButton" class="button is-primary is-responsive">Join Fan Club</button>
              <button id="upgradeButton" class="button is-primary is-responsive">Upgrade</button>
            </div>
          </div>
          <div class="scroller" style="height: 100%;">
            <div class='story-surround box' style="height: 100%;">
              <h1 class="content">Story</h1>
              <div id="story-container" class='story-container' style="height: 100%;">
              </div>
            </div>
          </div>
          <div class="fixed-button-footer">
          </div>
        </div>
      </div>
    </div>

  )
}

export default TeamProfile