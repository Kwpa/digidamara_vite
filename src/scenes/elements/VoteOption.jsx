import { h } from 'start-dom-jsx';
//<p>{storyData.title} Locked until round {storyData.round}</p>
const VoteOption = (optionData) => {
    return (
        <div class="column">
            <div class="box has-background-dark has-text-white">
                <h1><strong class="has-text-white">{optionData.title}</strong></h1>
                <div class="content">
                    {optionData.description}
                </div>
                <div class="level">
                    <div class="level-item">
                        <div class="message is-warning">
                            <div class="message-body">
                                <h1 id="total-count">
                                    Total Votes: 100
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="buttons has-addons is-centered">
                    <button id="choice-subtract" class="button is-danger">-</button>
                    <button id="choice-count" class="button is-static">0</button>
                    <button id="choice-add" class="button is-primary">+</button>
                </div>
            </div>
        </div>
    )
}

export default VoteOption