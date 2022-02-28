import { h } from 'start-dom-jsx';
//<p>{storyData.title} Locked until round {storyData.round}</p>
const StoryAccordian = (storyData) => {
  return (
    <article class="message">
      <button class="message-header accordian">
        <p>{storyData.title} Click to Expand / Collapse</p>
        <button class="delete" aria-label="delete"></button>
      </button>
      <div id="collapsible-message" class="message-body is-collapsible">
        <div class="message-body-content">
          {storyData.content}
        </div>
      </div>
    </article>
  )
}

export default StoryAccordian