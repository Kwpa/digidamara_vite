import { h } from 'start-dom-jsx';
//<p>{storyData.title} Locked until round {storyData.round}</p>
const StoryAccordian = (storyData) => {
  return (
    <article class="message">
      <button id="open-close-button" class="message-header accordian">
        <p>{storyData.title}</p>
        <button class="delete" aria-label="delete"></button>
      </button>
      <div id="collapsible-message" class="message-body accordian-content">
        <div class="message-body-content">
          {storyData.content}
        </div>
      </div>
    </article>
  )
}

export default StoryAccordian