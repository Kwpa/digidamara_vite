import { h } from 'start-dom-jsx';

const LeaderboardPage = () => {
  return (
    <div>
      <div class="popup-page-leaderboard">
        <div class="box popup-box-wrapper">
          <nav class="level is-mobile">
            <div class="level-left">
              <div class="level-item has-text-centered">
                <h1 class="title has-text-black">Today's Ranking</h1>
              </div>
            </div>
          </nav>
          <div class="leaderboard-row-fixed-elements">
            <div class="leaderboard-team-icon" id="leaderboard-icon-container">
              <img id="chat-icon" src=""></img>
            </div>
            <div class="leaderboard-team-title">
              Name
            </div>
            <div class="leaderboard-energy-remaining">
              Energy
            </div>
            <div class="leaderboard-total-fan-count">
              Fan
            </div>
            <div class="leaderboard-user-upgrade-count">
              Your Upgrades
            </div>
            </div>
            <div class="popup-page-scroll-with-tablerow">
              <div id="leaderboard-rows-container">

              </div>
            </div>
          </div>
        </div>
      </div>
      )
}

      export default LeaderboardPage