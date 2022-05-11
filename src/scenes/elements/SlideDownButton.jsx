import { h } from 'start-dom-jsx';

const SlideDownButton = () => {
  return (
    
      <div id="slide-down-button-container" class="slide-down-button-container">
        <div id="slideDownContainer" class="slide-down-container">
          <div id="leaderboard-header-button" class="slide-down-button has-background-warning">
            <div>
              <span><img class="trophy-img" src="/assets/ui_icons/icon_UI_trophy_outline_transparent_32px.png"></img></span>
              <span class="slide-down-text title is-5">
                Today's Ranking
              </span>
              <span><img class="trophy-img" src="/assets/ui_icons/icon_UI_trophy_outline_transparent_32px.png"></img></span>
            </div>
          </div>
        </div>
      </div>
    
  )
}

export default SlideDownButton