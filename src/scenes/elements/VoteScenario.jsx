import { h } from 'start-dom-jsx';

const VoteScenario = (scenarioData) => {
  return (
    <div id="voteScenario" class="box">
      <div class='box has-background-dark has-text-white'>
        <h1 class="title has-text-white">{scenarioData.title}</h1>
        <div class='content'>
          {scenarioData.description}
        </div>
      </div>
      <div class='columns'>
        <div class="column">
          <div class="box has-background-dark has-text-white">
            <h1>{scenarioData.choiceOne_title}</h1>
            <div class="content">
              {scenarioData.choiceOne_description}
            </div>
            <div class="buttons has-addons is-centered">
              <button id="choiceOneSubtract" class="button is-danger">-</button>
              <button id="choiceOne" class="button is-static">0</button>
              <button id="choiceOneSubtract" class="button is-primary">+</button>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="box has-background-dark has-text-white">
            <h1>{scenarioData.choiceOne_title}</h1>
            <div class="content">
              {scenarioData.choiceOne_description}
            </div>
            <div class="buttons has-addons is-centered">
              <button id="choiceOneSubtract" class="button is-danger">-</button>
              <button id="choiceOne" class="button is-static">0</button>
              <button id="choiceOneSubtract" class="button is-primary">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VoteScenario