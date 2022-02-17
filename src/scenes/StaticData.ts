export default class StaticData
{
    teams!: TeamData[];
    items!: ItemData[];
    storyUnlocks!: StoryUnlockData[];
    notifications!: NotificationData[];
    ballotOptions!: BallotOption[];
    appLabels!: AppLabel[];

    Init(teams_data, items_data, storyUnlocks_data, notifications_data, ballotOptions_data, appLabels_data)
    {
        console.log("INIT STATIC");
        this.teams = [];
        for(var k in teams_data.teams)
        {
            var id = teams_data.teams[k].id;
            var title = teams_data.teams[k].title;
            console.log(teams_data.teams[k].id);

            this.teams.push(new TeamData(id, title));
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

export class AppLabel
{
    
}