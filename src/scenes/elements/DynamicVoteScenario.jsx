import { h } from 'start-dom-jsx';

const DynamicVoteScenario = (titleClasses="title is-size-3 has-text-white") => {
  return (
    <div id="dynamic-vote-scenario" class="box">
      <div class='box has-background-dark has-text-white'>
        <h1 id="dynamic-vote-scenario-title" class={titleClasses}></h1>
        <div id="dynamic-vote-scenario-content" class='content'>
          
        </div>
      </div>
      <div id="dynamic-vote-scenario-options" class='columns'>
        
      </div>
    </div>
  )
}

export default DynamicVoteScenario