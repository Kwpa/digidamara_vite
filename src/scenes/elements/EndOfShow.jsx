import { h } from 'start-dom-jsx';

const EndOfShow = (titleClasses="title is-size-3 has-text-white") => {
  return (
    <div class="end-of-show">
      <div id="end-of-show-video-player" class="iframe-container">
      </div>
    </div>
  )
}

export default EndOfShow