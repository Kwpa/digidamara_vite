import { h } from 'start-dom-jsx';

const VideoPlayerOverlay = (avatarName, id) => {
  return (
    <div>
      <div class="vp-container">

        <div class="box">
          <div id="video-player" class="iframe-container">

          </div>
          <div>
          <button id="video-player-button-previous" class="button is-warning">
              Previous
            </button>
            <button id="video-player-button-play" class="button is-warning">
              Play
            </button>
            <button id="video-player-button-pause" class="button is-warning">
              Pause
            </button>
            <button id="video-player-button-next" class="button is-warning">
              Next
            </button>
          </div>

        </div>

      </div>
    </div>
  )
}

export default VideoPlayerOverlay