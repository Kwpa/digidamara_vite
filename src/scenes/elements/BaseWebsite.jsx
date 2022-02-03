import { h } from 'start-dom-jsx';

const BaseWebsite = () => {
  return (
    <div class="base">
      <div class="fixed-header">
        <div class='notification has-background-dark'>
          <nav class="level is-mobile">
            <div class="level-item has-text-centered">
              <button class="button">
                <span title="Badge top right" class="badge">8</span>
                Button
              </button>
              <span>
                <h1 class="heading has-text-centered has-text-white">Round</h1>
                <img class="team" src="/assets/icon_day.png"></img>
              </span>
              <span>
                <h1 class="title is-size-2 has-text-white">1</h1>
              </span>
            </div>
            <div class="level-item has-text-centered">
              <span>
                <h1 class="heading has-text-centered has-text-white">Action Points</h1>
                <img class="team" src="/assets/icon_actionpoints.png"></img>
              </span>
              <span>
                <h1 class="title is-size-2 has-text-white">5</h1>
              </span>
            </div>
            <div class="level-item has-text-centered">
              <span>
                <h1 class="heading has-text-centered has-text-white">Sparks</h1>
                <img class="team" src="/assets/icon_sparks.png"></img>
              </span>
              <span>
                <h1 class="title is-size-2 has-text-white">101</h1>
              </span>
            </div>
          </nav>
        </div>
      </div>
      <div class="fixed-footer">
        <div class="container">
          <div class="notification has-background-dark">
            <nav class="level is-mobile">
              <div class="level-item has-text-centered">
                <span>
                  <h1 class="heading has-text-centered has-text-white">Round</h1>
                  <img class="team" src="/assets/icon_day.png"></img>
                </span>
                <span>
                  <h1 class="title is-size-2 has-text-white">1</h1>
                </span>
              </div>
              <div class="level-item has-text-centered">
                <span>
                  <h1 class="heading has-text-centered has-text-white">Action Points</h1>
                  <img class="team" src="/assets/icon_actionpoints.png"></img>
                </span>
                <span>
                  <h1 class="title is-size-2 has-text-white">5</h1>
                </span>
              </div>
              <div class="level-item has-text-centered">
                <span>
                  <h1 class="heading has-text-centered has-text-white">Sparks</h1>
                  <img class="team" src="/assets/icon_sparks.png"></img>
                </span>
                <span>
                  <h1 class="title is-size-2 has-text-white">101</h1>
                </span>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BaseWebsite