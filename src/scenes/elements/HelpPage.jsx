import { h } from 'start-dom-jsx';

const HelpPage = () => {
  return (

    <div class="popup-page">
      <div class="box popup-box-wrapper">
        <nav class="level is-mobile">
          <div class="level-left">
            <div class="level-item has-text-centered">
              <h1 class="title has-text-black">Help</h1>
            </div>
          </div>
        </nav>
        <div style="position: absolute; right:7px; top: 37px;">
          <img id="close-help-page-button" class="hdrftr-icon" src="/assets/black_icons/icon_cross_black.png" style=""></img>
        </div>
        <div class="popup-page-scroll-without-footer">
          <div class="content">
          <p><strong>GOAL:</strong></p>
            <p>- Keep your favorite team in the game by Energizing them!</p>
            <p>- At the end of the day, the team with the lowest Energy is eliminated!</p>
            
            <p><strong>ACTIONS:</strong></p>
            <p><strong>DONATE (costs 1 AP) </strong>
            - Energize a Team!
            - Gain Sparks!</p>

            <p><strong>JOIN FAN CLUB (costs 1 AP)</strong> 
            - Unlock a Secret Chat!
            - Unlock Team Upgrades!</p>

            <p><strong>UPGRADE (costs 1 AP)</strong>
            - Every Donation produces +1 extra Spark!</p>

            <p><strong>VOTE (costs Sparks)</strong>
            - Vote in today's ballot!</p>
            <p>

            </p>
            <p>
              <strong>CHAT:</strong> Universal Signal allows you to speak to all Spectators, a Fanclub Signal is a private chat  for only Spectators who joined that Fanclub using an Action point
            </p>
            <p>
              <strong>VIDEOS:</strong> Catch up on the daily Round Ups and any other direct signals from the Space Station and the Promoter!
            </p>
            <p>
              <strong>TEAM PROFILES:</strong> Click the teal name button! See a team's bio, their home Galaxy and some of their traits and beliefs.The more you donate and support, the more you learn about the teams!
            </p>
            <p>
              <strong>SETTINGS (NOT ACTIVE)</strong>
            </p>
            <p>
              <strong>TODAY'S RANKINGS:</strong> Tap the yellow bar at the top with the trophies to see an uptodate leaderboard!
            </p>
          </div>
        </div>
      </div>
    </div>

  )
}

export default HelpPage