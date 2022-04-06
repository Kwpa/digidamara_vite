import { h } from 'start-dom-jsx';

const LeaderboardRow = (title, teamIconPath) => {
  return (
    <div>
      <div class="box leaderboard-row">
        <div class="leaderboard-winning-icon-container">
          <img src="./assets/black_icons/winning.png"></img>
        </div>
        <div class="leaderboard-eliminated-icon-container">
          <img src="./assets/black_icons/eliminated.png"></img>
        </div>
        <div class="leaderboard-row-fixed-elements">
          <div class="leaderboard-team-icon" id="leaderboard-icon-container">
            <img id="chat-icon" src={teamIconPath}></img>
          </div>
          <div class="leaderboard-team-title">
            {title}
          </div>
          <div class="leaderboard-energy-remaining">
            1
          </div>
          <div class="leaderboard-total-fan-count">
            20
          </div>
          <div class="leaderboard-user-upgrade-count">
            5
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeaderboardRow