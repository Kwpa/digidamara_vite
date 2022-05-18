import { h } from 'start-dom-jsx';

const VoteScenario = (scenarioData, titleClasses="title is-size-3 has-text-white") => {
  return (
    <div id="voteScenario" class="box">
      <div class='box has-background-dark has-text-white'>
        <h1 id="scenario-data-title" class={titleClasses}>{scenarioData.title}</h1>
        <div id="vote-content" class='content'>
          {scenarioData.description}
        </div>
      </div>
      <div id="voting-scenario-hide" class="box has-background-danger-light voting-scenario-hide">
        Voting is disabled until teams are back on the dance floor - return at 3pm ADT to discover the results!
      </div>
      <div id="voting-scenario-col" class='columns'>
        <div class="column">
          <div class="box has-background-dark has-text-white">
            <h1><strong id="scenario-data-choice-1-title" class="has-text-white">{scenarioData.choiceOne_title}</strong></h1>
            <div id="scenario-data-choice-1-description" class="content">
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
            <h1><strong id="scenario-data-choice-2-title" class="has-text-white">{scenarioData.choiceTwo_title}</strong></h1>
            <div id="scenario-data-choice-2-description" class="content">
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