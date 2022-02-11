import { h } from 'start-dom-jsx';

const VideoPage = () => {
  return (
    <div class="base">
      <div class="container">
        <div class="chat-page notification">
          <nav class="level">
            <div class="level-left">
              <div class="level-item has-text-centered">
                <h1 class="title has-text-black">Video </h1>
                <img class="hdrftr-icon" src="/assets/black_icons/icon_camera_black.png" style=""></img>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item has-text-centered">
                <img id="close-video-page-button" class="hdrftr-icon" src="/assets/black_icons/icon_cross_black.png" style=""></img>
              </div>
            </div>
          </nav>
          <div id="video-container" class="video-container scroller">
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoPage