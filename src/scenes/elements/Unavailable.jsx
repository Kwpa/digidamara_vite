import { h } from 'start-dom-jsx';

const Unavailable = () => {
  return (
    <div class="unavailable-container">
      <div class="unavailable-screen">
        <div class="unavailable-screen-content">
          <div class="title has-text-white is-size-2">DIGIDAMARA IS UNAVAILABLE</div>
          <div class="subtitle has-text-white is-size-4" style="padding-top: 15px;">
            <p>Wormhole messaging and galactic communcation is down for maintenance.</p>
            <p>Please return in a few hours.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Unavailable