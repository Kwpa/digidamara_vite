import { h } from 'start-dom-jsx';

const LeaderboardPage = () => {
  return (
    <div>
      <div id="leaderboard-page" class="popup-page-leaderboard">
        <div class="box popup-box-wrapper has-background-warning">
          <nav class="level is-mobile">
            <div class="level-left">
              <div class="level-item has-text-centered">
                <h1 class="title has-text-black">Today's Ranking</h1>
              </div>
            </div>
          </nav>
          <div class="table-container popup-page-scroll-with-tablerow">
            <table class="table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Team</th>
                  <th>Energy</th>
                </tr>
              </thead>
              <tbody id = "leaderboard-rows-container">
               
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeaderboardPage