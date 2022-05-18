import { h } from 'start-dom-jsx';

const VideoPlayerOverlay = (titleClasses="title is-size-3 has-text-black", avatarName, id) => {
  return (
    <div class="modal video-player-overlay">
      <div class="modal-background"></div>
      <div class="modal-content video-player-overlay-modal">
        <div class="box" style="position: relative;">
          <nav class="level is-mobile">
            <div class="level-left">
              <div class="level-item has-text-centered">
                <span>
                  <h1 id="video-player-overlay-title" class={titleClasses}>Video Content</h1>
                </span>

              </div>
            </div>
          </nav>
          <div style="position: absolute; right:7px; top: 17px;">
            <img id="video-overlay-button-close" class="hdrftr-icon" src="/assets/black_icons/icon_cross_black.png" style=""></img>
          </div>
          <div id="video-player" class="iframe-container">
          </div>
          <div>
            <h1 class="subtitle is-5">Please use Youtube's Fullscreen Mode + Headphones</h1>
          </div>
          <div class="level is-mobile video-player-buttons">
            <div class="level-item">
              <button id="video-player-button-previous" class="button is-warning">
                Prev
              </button>
            </div>
            <div class="level-item">
              <button id="video-player-button-play" class="button is-warning">
                Play
              </button>
            </div>
            <div class="level-item">
              <button id="video-player-button-pause" class="button is-warning">
                Pause
              </button>
            </div>
            <div class="level-item">
              <button id="video-player-button-next" class="button is-warning">
                Next
              </button>
            </div>
          </div>
          <div class="level is-mobile end-of-show-video-player-buttons">
            
            <div class="level-item">
              <button id="video-player-button-play-end" class="button is-warning">
                Play
              </button>
            </div>
            <div class="level-item">
              <button id="video-player-button-pause-end" class="button is-warning">
                Pause
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoPlayerOverlay