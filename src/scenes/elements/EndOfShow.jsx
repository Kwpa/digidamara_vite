import { h } from 'start-dom-jsx';

const EndOfShow = () => {
  return (
    <div class="end-of-show-container">
      <div class="end-of-show"></div>
      <div class="final-screen">
        <div class="final-screen-content">
          <div class="title has-text-white is-size-2">THE BEGINNING</div>
          <div class="subtitle has-text-white is-size-4" style="padding-top: 15px;">
            <p>STARCOM connection... non-existent.</p>
            <p>Please await final status report.</p>
          </div>
          <button id="watch-outro-button" class="button">Replay Final Video?</button>
        </div>
      </div>
    </div>
  )
}

export default EndOfShow