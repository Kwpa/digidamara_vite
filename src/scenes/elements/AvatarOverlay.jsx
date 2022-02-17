import { h } from 'start-dom-jsx';

const AvatarOverlay = (avatarName) => {
  return (
    <div class="base">
      <button id="openProfile" class="button">{avatarName}</button>
    </div>
  )
}

export default AvatarOverlay