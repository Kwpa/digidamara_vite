import { h } from 'start-dom-jsx';

const TeamProfile = (teamData) => {
  return (
    
      <div class="popup-page">
        <div class="box popup-box-wrapper">
          <nav class="level is-mobile">
            <div class="level-left">
              <div class="level-item has-text-centered">
                <h1 class="title has-text-black">{teamData.name}</h1>
              </div>
            </div>
          </nav>
          <div style="position: absolute; right:7px; top: 37px;">
            <img id="close-team-page-button" class="hdrftr-icon" src="/assets/black_icons/icon_cross_black.png" style=""></img>

          </div>
          <div class="popup-page-scroll-with-footer">
            <div class="level team-top-row">
              <div class="level-item">
                <div class="box has-background-dark" style="position:relative;">
                  <figure id="image-container" class="image is-128x128">
                    <div id="team-icon">
                    </div>
                  </figure>
                  <div id="fan-club-icon" style="position: absolute; top:0; left:0;">
                    <img src="/assets/ui_icons/icon_UI_fan_outline_transparent_36px.png" width="54" height="54"></img>
                  </div>
                  <div id="upgrade-background-container" style="position: absolute; top:0; right:0;">
                    <img src="/assets/ui_icons/icon_UI_upgrade_outline_transparent_36px.png" width="54" height="54"></img>
                  </div>
                  <div style="position: absolute; 
                    top:0; 
                    right:0; 
                    width: 54px; 
                    height: 54px; 
                    position: absolute;">
                    <div id="upgrade-value-container" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
                      <h1 id="upgrade-value">0</h1>
                    </div>
                  </div>
                </div>
              </div>
              <div class="level-item" style="margin: 20px;">
                <div style="display: block;">
                  <div class="divider">Energy Status</div>
                  <div id="team-energy-bar-container" class="box has-background-light">
                    <progress id="teamEnergyBar" class="progress is-warning" value="30" max="100" style="background: #696969;">30%</progress>
                    <div class="message is-warning" style="margin-right: 20px;">
                      <div class="message-body">
                        <h1 id="teamEnergy">
                          Need 3 More Energy!
                        </h1>
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
                    <div style="display: block">
                      <button id="donate-button" class="button is-primary is-responsive" style="display: block; margin: 0 auto;">Donate</button>
                      <div style="height: 20px;"></div>
                      <div class="tags has-addons tagsActive">
                        <span class="tag is-primary">-1 AP</span>
                        <span class="tag is-warning">Give Energy, Gain Sparks</span>
                      </div>
                      <div style="display: none;" class="tags tagsNotEnoughAP">
                        <span class="tag is-danger">Not enough AP</span>
                      </div>
                      <div style="display: none;" class="tags tagsEliminated">
                        <span class="tag is-danger">Team eliminated</span>
                      </div>
                    </div>
                  </div>
                  <div id="fan-club-container" class="level-item">
                    <div style="display: block">
                      <button id="fan-club-button" class="button is-primary is-responsive" style="display: block; margin: 0 auto;"><img src="/assets/ui_icons/icon_UI_fan_outline_transparent_36px.png" width="30" height="30"></img> Join Fan Club</button>
                      <div style="height: 20px;"></div>
                      <div class="tags has-addons tagsActive">
                        <span class="tag is-primary">-1 AP</span>
                        <span class="tag is-warning">Unlocks Upgrades and Chat</span>
                      </div>
                      <div style="display: none;" class="tags tagsNotEnoughAP">
                        <span class="tag is-danger">Not enough AP</span>
                      </div>
                      <div style="display: none;" class="tags tagsEliminated">
                        <span class="tag is-danger">Team eliminated</span>
                      </div>
                    </div>
                  </div>
                  <div id="upgrade-container" class="level-item is-centered">
                    <div style="display: block">
                      <button id="upgrade-button" class="button is-primary is-responsive" style="display: block; margin: 0 auto;"><img src="/assets/ui_icons/icon_UI_upgrade_outline_transparent_36px.png" width="30" height="30"></img> Upgrade</button>
                      <div style="height: 20px;"></div>
                      <div style="margin: 0 auto;" class="tags has-addons tagsActive">
                        <span class="tag is-primary">-1 AP</span>
                        <span class="tag is-warning">Gain +1 Spark Per Donation</span>
                      </div>
                      <div style="display: none;" class="tags tagsNotEnoughAP">
                        <span class="tag is-danger">Not enough AP</span>
                      </div>
                      <div style="display: none;" class="tags tagsEliminated">
                        <span class="tag is-danger">Team eliminated</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style="display: flex; padding-bottom: 30px;">
                <div style="flex: 1; margin-right: 20px;">
                  <div class="divider">Biography</div>
                  <div class="box">
                    <div id="team-profile-content" class="content">
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