import { h } from 'start-dom-jsx';

const TeamProfile = (teamData) => {
  return (
    <div class="base">
      <div class="base-container">
        <div class="team-page box scroller">
          <nav class="level is-mobile">
            <div class="level-left">
              <div class="level-item has-text-centered">
                <h1 class="title has-text-black">{teamData.name}</h1>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item has-text-centered">
                <img id="close-team-page-button" class="hdrftr-icon" src="/assets/black_icons/icon_cross_black.png" style=""></img>
              </div>
            </div>
          </nav>

          <div class="level">
            <div class="level-item">
              <div class="box has-background-dark" style="position:relative;">
                <figure class="image is-128x128">
                  <img class="is-rounded" src="/assets/images/teamIcon_dummy.png">
                  </img>
                </figure>
                <div style="position: absolute; top:0; left:0;">
                  <img src="/assets/images/fan.png" width="50"height="50"></img>
                </div>
                <div style="position: absolute; top:0; right:0;">
                  <img src="/assets/images/upgrade.png" width="50"height="50"></img>
                </div>
                <div style="position: absolute; 
                  top:0; 
                  right:0; 
                  width: 50px; 
                  height:50px; 
                  position: absolute;">
                  <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
                    <h1>9</h1>
                  </div>
                </div>
              </div>
            </div>
            <div class="level-item" style="margin: 20px;">
              <div>
                <div class="divider">Energy Status</div>
                <div class="box has-background-light">
                  <progress class="progress is-warning" value="30" max="100" style="background: #696969;">30%</progress>
                  <div class="level">
                    <div class="level-item">
                      <div class="message is-warning" style="margin-right: 20px;">
                        <div class="message-body">
                          <h1 id="teamEnergy">
                            Need 3 More Energy!
                          </h1>
                        </div>
                      </div>
                    </div>
                    <div class="level-item">
                      <div class="message is-warning">
                        <div class="message-body">
                          <h1 id="teamUpgradeLevel">
                            Upgraded 3 times!
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>
          <div style="height: inherit;">
            <div class="divider">Actions</div>
            <div class="box has-background-light">
              <div class="level">
                <div class="level-item">
                  <button id="donateButton" class="button is-primary is-responsive" style="margin: 0 auto;">Donate</button>
                  <span class="tag">
                    Costs 1 Action Point
                  </span>
                </div>
                <div class="level-item">
                  <button id="upgradeButton" class="button is-primary is-responsive" style="margin: 0 auto;">Upgrade</button>
                  <span class="tag">
                    Costs 1 Action Point
                  </span>
                </div>
              </div>
            </div>
            <div style="display: flex; padding-bottom: 30px;">
              <div style="flex: 1; margin-right: 20px;">
                <div class="divider">Biography</div>
                <div class="box">
                  <div class="content">
                    {teamData.biography}
                  </div>
                </div>
              </div>
              
              <div style="flex: 1; margin-left: 20px;">
                <div class="divider">Data Files</div>
                <div id="story-container" class='story-container'></div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamProfile