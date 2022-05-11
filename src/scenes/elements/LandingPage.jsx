import { h } from 'start-dom-jsx';

const LandingPage = (text) => {
  return (
    <div class="landing-page">
      <img src="/assets/images/hero_image_ddm.png" class="landing-page-image"></img>
      <div id="text" class="content has-text-white landing-page-text">
        text here
      </div>
      <img class="landing-page-footer"></img>
    </div>
  )
}

export default LandingPage