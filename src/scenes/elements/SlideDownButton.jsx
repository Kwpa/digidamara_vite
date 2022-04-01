import { h } from 'start-dom-jsx';

const SlideDownButton = () => {
  return (
    
      <div class="slide-down-button-container">
        <div id="slideDownContainer" class="slide-down-container">
          <div id="leaderboard-header-button" class="slide-down-button has-background-warning">
            <div>
              <span><img class="trophy-img" src="./assets/black_icons/icon_trophy_black.png"></img></span>
              <span class="slide-down-text title is-5">
                Today's Ranking
              </span>
              <span><img class="trophy-img" src="./assets/black_icons/icon_trophy_black.png"></img></span>
            </div>
          </div>
        </div>
      </div>
    
  )
}

export default SlideDownButton