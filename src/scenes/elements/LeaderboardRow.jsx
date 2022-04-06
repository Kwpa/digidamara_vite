import { h } from 'start-dom-jsx';

const LeaderboardRow = (title, teamIconPath) => {
  return (
    <tr>
      <th><img src={teamIconPath}></img></th>
      <th id="leaderboard-row-title">{title}</th>
      <th id="leaderboard-row-energy">1/10</th>
      <th id="leaderboard-row-fans">100</th>
      <th id="leaderboard-row-upgrades">10</th>
    </tr> 
  )
}

export default LeaderboardRow