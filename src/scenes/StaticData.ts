export default class StaticData
{
    teams!: TeamData[];
    notifications!: NotificationData[];
    voteScenarios!: VoteScenarioData[];
    appLabels!: AppLabelData[];

    Init(teams_data, barks_data, items_data, story_data, notifications_data, voteScenarios_data, appLabels_data)
    {
        console.log("INIT STATIC");
        this.teams = [];
        this.notifications = [];
        this.voteScenarios = [];
        this.appLabels = [];
        //console.log(story_data[0].teamId + " " + teams_data[0].id);
         
        for(var k in teams_data)
        {
            var teamData = teams_data[k];
            var barks = barks_data.filter(a=> a.teamId == teamData.id);
            var items = items_data.filter(a=> a.teamId == teamData.id);
            var story = story_data.filter(a=> a.teamId == teamData.id);
            this.teams.push(new TeamData(teams_data[k], barks, items, story));
        }
        for(var k in notifications_data)
        {
            this.notifications.push(new NotificationData(notifications_data[k]));
        }
        for(var k in voteScenarios_data)
        {
            this.voteScenarios.push(new VoteScenarioData(voteScenarios_data[k]));
        }
        for(var k in appLabels_data)
        {
            this.appLabels.push(new AppLabelData(appLabels_data[k]));
        }
    }
}

export class BarkData
{
    id!: string;
    teamId!: string;
    character_name!: string;
    title!: string;
    content!: string;
    colour!: number;
    encryption!: number;
    
    constructor(barkData) {
        this.id = barkData.id;
        this.title = barkData.title;
        this.teamId = barkData.teamId;
        this.character_name = barkData.character_name;
        this.content = barkData.content;
        this.colour = barkData.colour;
        this.encryption = barkData.encryption;
      }
}

export class TeamData
{
    id!: string;
    title!: string;
    characterOne_name!: string;
    characterTwo_name!: string;
    biography!: string;
    favouriteDanceMove!: string;
    iconId!: string;
    barks!: BarkData[];
    items!: ItemData[];
    story!: StoryData[];
    
    constructor(teamData, barks, items, story) {
        this.id = teamData.id;
        this.title = teamData.title;
        this.characterOne_name = teamData.characterOne_name;
        this.characterTwo_name = teamData.characterTwo_name;
        this.biography = teamData.biography;
        this.favouriteDanceMove = teamData.favouriteDanceMove;
        this.iconId = teamData.iconId;
        this.barks = this.BarkDataToArray(barks);
        this.items = this.ItemsDataToArray(items);
        this.story = this.StoryDataToArray(story);
      }

      BarkDataToArray(data)
      {
          var array = [] as BarkData[];
          data.forEach((bark) => {
              array.push(new BarkData(bark));
          });
          return array;
      }

      ItemsDataToArray(data)
      {
          var array = [] as ItemData[];
          data.forEach((item) => {
              array.push(new ItemData(item));
          });
          return array;
      }

      StoryDataToArray(data)
      {
          var array = [] as StoryData[];
          data.forEach((story) => {
              array.push(new StoryData(story));
          });
          return array;
      }
}

export class ItemData
{
    id!: string;
    teamId!: string;
    round!: number;
    title!: string;
    description!: string;
    iconId!: string;

    constructor(itemData) {
        this.id = itemData.id;
        this.teamId = itemData.teamId;
        this.round = itemData.round;
        this.title = itemData.title;
        this.description = itemData.description;
        this.iconId = itemData.iconId;
      }
}

export class StoryData
{
    id!: string;
    teamId!: string;
    round!: number;
    title!: string;
    content!: string;
    encryption!: number;
    iconId!: string;

    constructor(storyData) {
        this.id = storyData.id;
        this.teamId = storyData.teamId;
        this.round = storyData.round;
        this.title = storyData.title;
        this.content = storyData.content;
        this.encryption = storyData.encryption;
        this.iconId = storyData.iconId;
      }
}

export class NotificationData
{
    id!: string;
    title!: string;
    content!: string;
    encryption!: number;
    delay!: number;

    constructor(notification) {
        this.id = notification.id;
        this.title = notification.title;
        this.content = notification.content;
        this.encryption = notification.encryption;
        this.delay = notification.delay;
      }
}

export class VoteScenarioData
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

    constructor(votingScenarioData) {
        this.id = votingScenarioData.id;
        this.title = votingScenarioData.title
        this.description = votingScenarioData.description;
        this.choiceOne_title = votingScenarioData.choiceOne_title;
        this.choiceOne_description = votingScenarioData.choiceOne_description;
        this.choiceOne_consequence = votingScenarioData.choiceOne_consequence;
        this.choiceTwo_title = votingScenarioData.choiceTwo_title;
        this.choiceTwo_description = votingScenarioData.choiceTwo_description;
        this.choiceTwo_consequence = votingScenarioData.choiceTwo_consequence;
      }
}

export class AppLabelData
{
    id!: string;
    content!: string;

    constructor(appLabelData) {
        this.id = appLabelData.id;
        this.content = appLabelData.content;
      }
}