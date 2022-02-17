import { h } from 'start-dom-jsx';

const TeamProfile = (teamData) => {
  return (
    <div class="base">
      <div class="container">
        <div class="chat-page notification">
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
        <button id="donateButton" class="button fixed-button-footer is-primary is-responsive">Donate</button>
        </div>
      </div>
    </div>
  )
}

export default TeamProfile