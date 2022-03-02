import { h } from 'start-dom-jsx';

const VotingPage = (voteData) => {
  return (
    <div class="base">
      <div class="base-container">
        <div class="chat-page box">
          <nav class="level is-mobile">
            <div class="level-left">
              <div class="level-item has-text-centered">
                <h1 class="title has-text-black">Today's Vote</h1>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item has-text-centered">
                <img id="close-voting-page-button" class="hdrftr-icon" src="/assets/black_icons/icon_cross_black.png" style=""></img>
              </div>
            </div>
          </nav>
          <div id="vote-container" class="vote-container scroller"></div>
        </div>

      </div>
    </div>
  )
}

export default VotingPage