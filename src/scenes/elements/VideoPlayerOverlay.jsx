import { h } from 'start-dom-jsx';

const VideoPlayerOverlay = (avatarName, id) => {
  return (
    <div class="modal video-player-overlay">
      <div class="modal-background"></div>
      <div class="modal-content video-player-overlay-modal">
        <div class="box">
          <div id="video-player" class="iframe-container">
          </div>
          <div class="level is-mobile">
            <div class="level-item">
              <button id="video-player-button-previous" class="button is-warning">
                Previous
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
        </div>
      </div>
      <button id="video-overlay-button-close" class="modal-close is-large" aria-label="close"></button>
    </div>
  )
}

export default VideoPlayerOverlay