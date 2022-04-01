import { h } from 'start-dom-jsx';

const LeaderboardRow = (teamData) => {
  return (
    <div>
      <div class="box leaderboard-row">
        <div class="leaderboard-winning-icon-container">
          <img src=""></img>
        </div>
        <div class="leaderboard-eliminated-icon-container">
          <img src=""></img>
        </div>
        <div>
          <div class="leaderboard-team-icon" id="leaderboard-icon-container">
            <img id="chat-icon" src={imageURL}></img>
          </div>
          <div class="leaderboard-team-name">
          </div>
          <div class="leaderboard-energy-remaining">
          </div>
          <div class="leaderboard-total-fan-count">
          </div>
          <div class="leaderboard-user-upgrade-count">
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeaderboardRow