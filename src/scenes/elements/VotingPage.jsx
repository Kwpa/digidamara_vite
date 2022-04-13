import { h } from 'start-dom-jsx';

const VotingPage = (voteData) => {
  return (

    <div class="popup-page">
      <div id="two-votes" class="box popup-box-wrapper">
        <nav class="level is-mobile">
          <div class="level-left">
            <div class="level-item has-text-centered">
              <h1 class="title has-text-black">Today's Votes</h1>
            </div>
          </div>
        </nav>
        <div style="position: absolute; right:7px; top: 37px;">
          <img id="close-voting-page-button" class="hdrftr-icon" src="/assets/black_icons/icon_cross_black.png" style=""></img>
        </div>
        <div id="vote-container" class="popup-page-scroll-without-footer">
        </div>
        
      </div>
    </div>


  )
}

export default VotingPage