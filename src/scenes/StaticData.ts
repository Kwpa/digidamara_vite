export default class StaticData
{
    teams!: TeamData[];
    items!: ItemData[];
    storyUnlocks!: StoryUnlockData[];
    notifications!: NotificationData[];
    voteScenarios!: VoteScenario[];
    appLabels!: AppLabel[];

    Init(teams_data, items_data, storyUnlocks_data, notifications_data, voteScenarios_data, appLabels_data)
    {
        console.log("INIT STATIC");
        this.teams = [];
        this.voteScenarios = [];
        for(var k in teams_data.teams)
        {
            var id = teams_data.teams[k].id;
            var title = teams_data.teams[k].title;
            console.log(teams_data.teams[k].id);

            this.teams.push(new TeamData(id, title));
        }
        for(var k in voteScenarios_data.scenarios)
        {
            var id = voteScenarios_data.scenarios[k].id;
            var title = voteScenarios_data.scenarios[k].title;
            console.log(voteScenarios_data.scenarios[k].id);

            this.voteScenarios.push(new VoteScenario(
                voteScenarios_data.scenarios[k].id,
                voteScenarios_data.scenarios[k].title,
                voteScenarios_data.scenarios[k].description,
                voteScenarios_data.scenarios[k].choiceOne_title,
                voteScenarios_data.scenarios[k].choiceOne_description,
                voteScenarios_data.scenarios[k].choiceOne_consequence,
                voteScenarios_data.scenarios[k].choiceTwo_title,
                voteScenarios_data.scenarios[k].choiceTwo_description,
                voteScenarios_data.scenarios[k].choiceTwo_consequence
                )
            );
        }
    }
}

export class TeamData
{
    id!: string;
    title!: string;
    biography!: string;
    danceFloorIconPath!: string;
    danceFloorFlippedIconPath!: string;
    storyUnlocks!: StoryUnlockData[];
    briefcaseItems!: ItemData[];

    constructor(id, title) {
        this.id = id;
        this.title = title
      }
}

export class ItemData
{
    round!: number;
    id!: string;
    title!: string;
    description!: string;
    iconPath!: string;
}

export class StoryUnlockData
{
    round!: number;
    id!: string;
    title!: string;
    content!: string;
    encryptionLanguage!: number;
}

export class NotificationData
{
    id!: string;
    title!: string;
    content!: string;
}

export class BallotOption
{
    round!: number;
    id!: string;
    title!: string;
    description!: string;
    consequence!: string;
}

export class VoteScenario
{
    id!: string;
    title!: string;
    description!: string;
    choiceOne_title!: string;
    choiceOne_description!: string;
    choiceOne_consequence!: string;
    choiceTwo_title!: string;
    choiceTwo_description!: string;
    choiceTwo_consequence!: string;

    constructor(id, title, description, choiceOne_title, choiceOne_description, choiceOne_consequence, choiceTwo_title, choiceTwo_description, choiceTwo_consequence) {
        this.id = id;
        this.title = title
        this.description = description;
        this.choiceOne_title = choiceOne_title;
        this.choiceOne_description = choiceOne_description;
        this.choiceOne_consequence = choiceOne_consequence;
        this.choiceTwo_title = choiceTwo_title;
        this.choiceTwo_description = choiceTwo_description;
        this.choiceTwo_consequence = choiceTwo_consequence;
      }
}

export class AppLabel
{
    
}