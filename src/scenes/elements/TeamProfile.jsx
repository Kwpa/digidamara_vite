import { h } from 'start-dom-jsx';

const TeamProfile = (teamData) => {
  return (
    <div class="base">
      <div class="container">
        <div class="chat-page box">
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
          <div class="fixed-button-footer">
            <button id="donateButton" class="button is-primary is-responsive">Donate</button>
            <button id="joinFanClubButton" class="button is-primary is-responsive">Join Fan Club</button>
            <button id="upgradeButton" class="button is-primary is-responsive">Upgrade</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamProfile