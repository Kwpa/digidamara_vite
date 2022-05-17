import { h } from 'start-dom-jsx';

const HelpPage = (titleClasses="title is-size-3 has-text-black") => {
  return (

    <div class="popup-page">
      <div class="box popup-box-wrapper">
        <nav class="level is-mobile">
          <div class="level-left">
            <div class="level-item has-text-centered">
              <h1 class={titleClasses}>Help</h1>
            </div>
          </div>
        </nav>
        <div style="position: absolute; right:7px; top: 37px;">
          <img id="close-help-page-button" class="hdrftr-icon" src="/assets/black_icons/icon_cross_black.png" style=""></img>
        </div>
        <div class="popup-page-scroll-without-footer">
          <div class="content">
          <p><strong>GOAL:</strong></p>
            <p>- Keep your favorite team in the game by Sponsoring them with Energy!</p>
            <p>- At the end of the day, the team with the lowest Energy is eliminated!</p>
            
            <p><strong>ACTIONS:</strong></p>
            <p><strong>SPONSOR (costs 1 Energy)</strong>
            - Energize a Team!
            - Gain Bonds!</p>

            <p><strong>JOIN FAN CLUB (costs 1 Energy)</strong> 
            - Unlock a Secret Chat!
            - Unlock Gifting!</p>

            <p><strong>GIVE A GIFT (costs 1 Energy)</strong>
            - Every Sponsor action produces +1 extra Bond!</p>

            <p><strong>VOTE (costs Bonds)</strong>
            - Vote in today's ballot!</p>
            <p>

            </p>
            <p>
              <strong>CHAT:</strong> Universal Waveform allows you to speak to all other Spectators, a Fanclub is a private chat for Spectators who joined that Fanclub (costs 1 Energy))
            </p>
            <p>
              <strong>VIDEOS:</strong> Catch up on the daily Round Ups and any other STARCOM signals from the Space Station and the Promoter!
            </p>
            <p>
              <strong>TEAM PROFILES:</strong> Click the team name button! See a team's bio, their home Galaxy and some of their traits and beliefs. The more you support a team, the more you learn about them!
            </p>
            <p>
              <strong>SETTINGS:</strong> Turn SFX and Music on / off
            </p>
            <p>
              <strong>TODAY'S RANKINGS:</strong> Tap the yellow bar to see an up to date leaderboard!
            </p>
          </div>
        </div>
      </div>
    </div>

  )
}

export default HelpPage