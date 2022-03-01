import { h } from 'start-dom-jsx';

const AvatarOverlay = (avatarName) => {
  return (
    <div>
      <div class="base-container container avatar-overlay">
      <button id="openProfile" class="button is-primary">{avatarName}</button>
      </div>
    </div>
  )
}

export default AvatarOverlay