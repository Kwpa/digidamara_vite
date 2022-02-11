import { h } from 'start-dom-jsx';

const VideoTile = (videoTitle, imageURL, videoURLValue) => {
  return (
    <div class="notification has-background-info has-text-white">
      <img id="clickVideo" src={imageURL} value={videoURLValue}></img>
      <h3>
        {videoTitle}
      </h3>
    </div>
  )
}

export default VideoTile