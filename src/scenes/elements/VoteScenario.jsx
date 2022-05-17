import { h } from 'start-dom-jsx';

const VoteScenario = (scenarioData, titleClasses="title is-size-3 has-text-white") => {
  return (
    <div id="voteScenario" class="box">
      <div class='box has-background-dark has-text-white'>
        <h1 class={titleClasses}>{scenarioData.title}</h1>
        <div id="vote-content" class='content'>
          {scenarioData.description}
        </div>
      </div>
      <div class='columns'>
        <div class="column">
          <div class="box has-background-dark has-text-white">
            <h1><strong class="has-text-white">{scenarioData.choiceOne_title}</strong></h1>
            <div class="content">
              {scenarioData.choiceOne_description}
            </div>
            <div id="choice-one-total" class="level">
              <div class="level-item">
                <div class="message is-warning">
                  <div class="message-body">
                    <h1 id="choice-one-total-count">
                      Total Votes: 100
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div class="buttons has-addons is-centered">
              <button id="choiceOneSubtract" class="button is-danger">-</button>
              <button id="choiceOne" class="button is-static">0</button>
              <button id="choiceOneAdd" class="button is-primary">+</button>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="box has-background-dark has-text-white">
            <h1><strong class="has-text-white">{scenarioData.choiceTwo_title}</strong></h1>
            <div class="content">
              {scenarioData.choiceTwo_description}
            </div>
            <div id="choice-two-total" class="level">
              <div class="level-item">
                <div class="message is-warning">
                  <div class="message-body">
                    <h1 id="choice-two-total-count">
                      Total Votes: 100
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div class="buttons has-addons is-centered">
              <button id="choiceTwoSubtract" class="button is-danger">-</button>
              <button id="choiceTwo" class="button is-static">0</button>
              <button id="choiceTwoAdd" class="button is-primary">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VoteScenario