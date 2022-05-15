import { h } from 'start-dom-jsx';

const LeaderboardRow = (title, teamIconPath) => {
  return (
    <tr class="leaderboard-row-alt">
      <th><img src={teamIconPath}></img></th>
      <th id="leaderboard-row-title">{title}</th>
      <th id="leaderboard-row-energy">1/10</th>
    </tr> 
  )
}

export default LeaderboardRow