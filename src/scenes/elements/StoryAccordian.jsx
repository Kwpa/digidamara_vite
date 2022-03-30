import { h } from 'start-dom-jsx';
//<p>{storyData.title} Locked until round {storyData.round}</p>
const StoryAccordian = (storyData) => {
  return (
    <article class="message">
      <button id="open-close-button" class="message-header accordian">
        <span id="textTag" class="tag">
          New!
        </span>
        <p>{storyData.title}</p>
        <button class="bulma-arrow-mixin"></button>
      </button>
      <div id="collapsible-message" class="message-body accordian-content">
        <div class="message-body-content">
          <div class="content">
            {storyData.content}
          </div>
        </div>
      </div>
    </article>
  )
}

export default StoryAccordian