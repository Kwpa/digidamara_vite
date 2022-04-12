import DynamicData from "./DynamicData";

export class AppState {
    // Create new instances of the same class as static attributes
    static LoadingScreen = new AppState("LoadingScreen");
    static AppOpen = new AppState("AppOpen");
    static CurtainsClosed = new AppState("CurtainsClosed");
    static CurtainsOpen = new AppState("CurtainsOpen");
    static ShowEliminations = new AppState("CurtainsOpen");
    static FirstVisitTodayNotifications = new AppState("FirstVisitTodayNotifications");
    static NormalPlay = new AppState("NormalPlay");
    static ViewVideo = new AppState("ViewVideo");
    static RestMode = new AppState("RestMode");
    static WebsiteDown = new AppState("WebsiteDown");
  
    name = "";
    constructor(name) {
      this.name = name
    }
  }

export default class LocalGameState
{
    username!: string;
    actionPoints: number = 0;
    sparksAwarded: number = 0;
    maxActionPoints!: number;
    carouselPosition!: number;
    videoContentPosition!: number;
    chatChannels!: object;
    currentChatChannel!: string;
    currentTeamID!: string;
    teamIDs!: string[];
    round: number = 0;
    roundEnergyRequirement!: number;
    voteStates!: VoteScenarioState[];
    teamStates!: TeamState[];
    notificationHomeOnScreen: boolean = false;
    notificationHomeStringArray!: string[];
    notificationHomeContentLength!: number;
    notificationHomePosition!: number;
    lastChatMessageUserId!: string;
    danceFloorAudioTwoPlaying!: boolean;
    leaderboardStatus!: number[];

    appHasLoaded: boolean = false;
    firstVisitTodayWithCurtainsClosed: boolean = false;
    curtainsOpen: boolean = false;
    firstVisitTodayWithCurtainsOpen: boolean = false;

    appState!: AppState;

    StartAppState()
    {
        this.appState = AppState.LoadingScreen;
    }

    UpdateAppState(state: AppState)
    {
        this.appState = state;
        console.log(state.name.toUpperCase());
    }

    Init(username: string, round: number, actionPoints: number, maxActionPoints: number, sparksAwarded: number, energyRequirement: number, teamIDs : string[], voteStates, teamStates)
    {
        this.actionPoints = actionPoints;
        this.sparksAwarded = sparksAwarded;
        this.round = round;
        this.username = username;
        this.maxActionPoints = maxActionPoints;
        this.roundEnergyRequirement = energyRequirement;
        this.carouselPosition = 0;
        this.videoContentPosition = 0;
        this.teamIDs = teamIDs;
        this.SetCurrentTeamID()
        this.voteStates = voteStates;
        this.teamStates = teamStates;    
        this.notificationHomeStringArray = [];  
        this.chatChannels = [];
        this.currentChatChannel = "c_001";
        this.danceFloorAudioTwoPlaying = false;
        this.leaderboardStatus = [];
    }

    DanceFloorTwoAudio(value: boolean)
    {
        this.danceFloorAudioTwoPlaying = value;
    }

    UpdateFromDynamicData(dynamicData)
    {
        this.roundEnergyRequirement = dynamicData.energyRequirement;
        var round = dynamicData.round;
        if(this.round != round)
        {
            this.round = round;
            return true;
        }
        else{
            return false;
        }
    }

    SetNotificationHomeOnScreen(set: boolean)
    {
        this.notificationHomeOnScreen = set;
    }

    SetLastChatChannelMessageUserId(userId: string)
    {
        this.lastChatMessageUserId = userId;
    }

    AddChatChannels(channels: object)
    {
        this.chatChannels = channels;
    }

    GetCurrentChatChannelGroupId()
    {
        return this.chatChannels[this.currentChatChannel];
    }

    SetCurrentChatChannel(id: string)
    {
        this.currentChatChannel = id;
    }

    DivideUpNotificationHomeContent(content: string)
    {
        var re = "/<p>.*?<\/p>/g";
        var stringArray = content.split('\n');
        this.notificationHomeStringArray = stringArray as string [];
        this.notificationHomeContentLength = this.notificationHomeStringArray.length; 
        this.notificationHomePosition = -1;
    }

    GetCurrentNotificationHomeContent()
    {
        return this.notificationHomeStringArray[this.notificationHomePosition];
    }

    NextNotificationHomeContent()
    {
        if(this.notificationHomePosition + 1 < this.notificationHomeContentLength-1)
        {
            this.notificationHomePosition++;
            return true;
        }
        else if (this.notificationHomePosition + 1 == this.notificationHomeContentLength-1)
        {
            this.notificationHomePosition++;
            return false;
        }
    }

    GetCurrentTeamState()
    {
        return this.teamStates[this.carouselPosition];
    }

    GetRound()
    {
        this.round = 2;
        return this.round;
    }

    HaveSparks()
    {
        if(this.sparksAwarded > 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    HaveSpentSparksOnTodaysVote(choice: number)
    {
        if(choice==0){
            return this.voteStates[this.round-1].choiceOneVotesUser > 0; 
        }
        else if (choice==1)
        {
            return this.voteStates[this.round-1].choiceTwoVotesUser > 0;
        }
        else
        {
            return false;
        }
    }

    SetCurrentTeamID()
    {
        this.currentTeamID = this.teamIDs[this.carouselPosition];
    }

    RollCarousel(leftRight: number)
    {
        this.carouselPosition += leftRight;
        var n = this.carouselPosition;
        var m = this.teamIDs.length;
        var mod = ((n % m) + m) % m;
        this.carouselPosition = mod;
        this.SetCurrentTeamID();
    }

    RollVideoContent(leftRight: number, activeVideoCount: number)
    {
        this.videoContentPosition += leftRight;
        var n = this.videoContentPosition;
        var m = activeVideoCount;
        var mod = ((n % m) + m) % m;
        this.videoContentPosition = mod;
        return this.videoContentPosition;
    }

    LatestVideoContent(activeVideoCount: number)
    {
        this.videoContentPosition = activeVideoCount-1;
        return this.videoContentPosition;
    }

    GainActionPoints(amount: number)
    {
        var newAmount = this.actionPoints + amount;  
        if(this.actionPoints + amount >= this.maxActionPoints)
        {
            this.SetActionPointsToMax();
        }
        else{
            this.SetActionPoints(newAmount);
        }
    }

    SetActionPoints(amount: number)
    {
        this.actionPoints = amount;
    }

    SetActionPointsToMax()
    {
        this.actionPoints = this.maxActionPoints;
    }
    
    SpendActionPointOnDonation()
    {
        var newAmount = this.actionPoints - 1;
        if(newAmount >= 0 && this.GetCurrentTeamState().currentEnergy < this.roundEnergyRequirement)
        {
            this.SetActionPoints(newAmount);
            return true;
        }
        else return false;
    }

    SpendActionPointOnFanClub()
    {
        var newAmount = this.actionPoints - 1;
        if(newAmount >= 0 && !this.GetCurrentTeamState().userInFanClub)
        {
            this.SetActionPoints(newAmount);
            return true;
        }
        else return false;
    }

    SpendActionPointOnUpgrade()
    {
        var newAmount = this.actionPoints - 1;
        if(newAmount >= 0 && this.GetCurrentTeamState().userInFanClub)
        {
            this.SetActionPoints(newAmount);
            return true;
        }
        else return false;
    }

    SpendActionPoints(amount: number)
    {
        var newAmount = this.actionPoints - amount;
        if(newAmount >= 0)
        {
            this.SetActionPoints(newAmount);
            return true;
        }
        else return false;
    }

    UpgradeTeam(teamId:string)
    {
        this.teamStates.filter(p=>p.id==this.currentTeamID)[0].upgradeLevel++;
    }

    GetUpgradeLevel()
    {
        return this.teamStates.filter(p=>p.id==this.currentTeamID)[0].upgradeLevel;
    }
    JoinFanClub(teamId)
    {
        this.teamStates.filter(p=>p.id==teamId)[0].userInFanClub = true;
    }

    GainSparks(amount: number)
    {
        var newAmount = this.sparksAwarded + amount;  
        
        this.sparksAwarded = newAmount;
    }
    
    SpendSparks(amount: number)
    {
        var newAmount = this.sparksAwarded - amount;
        if(newAmount >= 0)
        {
            this.sparksAwarded = newAmount;
            return true;
        }
        else return false;
    }

    GetRandomTeamStillInCompetition()
    {        
        var indices = [] as number[];
        this.teamStates.forEach((team, index)=>{
            if(!team.eliminated)
            {
                indices.push(index);
            }
        });
        return indices[indices.length * Math.random() | 0];
    }

    SetLeaderboardStatus()
    {
        this.leaderboardStatus = [];
        const orderedLeaderboard = this.teamStates.sort(
            (teamA,teamB) =>
            {
                return teamB.currentEnergy - teamA.currentEnergy ||
                teamA.title.localeCompare(teamB.title);
            }
        );

        var k = 0;
        orderedLeaderboard.forEach((team) => {
            team.leaderboardPosition = k;
            k++;
        })

        this.teamStates = orderedLeaderboard.sort(
            (teamA, teamB) => {
                return teamA.index - teamB.index;
            }
        )
        
        /* 
        for(var i = 0; i< this.teamStates.length; i++)
        {
            var teamState = this.teamStates[i];
            var newIndex = orderedLeaderboard[i].leaderboardPosition;
            console.log("i : " + i + " and newIndex : " + newIndex);
            teamState.leaderboardPosition = newIndex;
        } */
        
    }
}

export class TeamRenderTextures
{
    id!: string;
    rendTex_front;
    rendTex_back;
    
    constructor(id, front, back) {
        this.id = id;
        this.rendTex_front = front;
        this.rendTex_back = back;
      }
}

export class TeamImages
{
    id!: string;
    img_A;
    img_A_flipped;
    img_B;
    img_B_flipped;
    
    constructor(id, A, A_flipped, B, B_flipped) {
        this.id = id;
        this.img_A = A;
        this.img_A_flipped = A_flipped;
        this.img_B = B;
        this.img_B_flipped = B_flipped;
      }
}

export class TeamState
{
    id!: string;
    index!: number;
    title!: string;
    eliminated: boolean = false;
    upgradeLevel: number = 0;
    energyRequirement: number = 1;
    currentEnergy: number = 0;
    userInFanClub: boolean = false;
    storyUnlocked!: object;
    totalNumberOfFans: number = 0;
    leaderboardPosition: number = 0;
   
    constructor(id, index, title, outOfComp, upgradeLevel, energyReq, currentEnergy, inFanClub, storyUnlocked: object){
        this.id = id;
        this.index = index,
        this.title = title;
        this.currentEnergy = currentEnergy;
        this.eliminated = outOfComp;
        this.upgradeLevel = upgradeLevel;
        this.userInFanClub = inFanClub;
        this.energyRequirement = energyReq;
        this.storyUnlocked = storyUnlocked;
    }

    UpdateFromDynamicData(teamDynamic: TeamState, energyRequirement:number, upgradeLevel:number, inFanClub:boolean)
    {
        this.currentEnergy=teamDynamic.currentEnergy;
        this.eliminated=teamDynamic.eliminated;
        this.upgradeLevel=upgradeLevel;
        this.userInFanClub=inFanClub;
        this.energyRequirement = energyRequirement;
        this.storyUnlocked = teamDynamic.storyUnlocked;
    }

    UnlockStory(storyId: string)
    {
        this.storyUnlocked[storyId] = true;
    }

    Upgrade()
    {
        this.upgradeLevel++;
    }
    UpgradeBy(value:number)
    {
        this.upgradeLevel += value;
    }
    EliminateTeam()
    {
        this.eliminated=true;
    }
    SetEnergyRequirement(value: number)
    {
        this.energyRequirement = value;
    }
    DonateEnergy()
    {
        this.currentEnergy++;
    }
    DonateEnergyBy(value:number)
    {
        this.currentEnergy+=value;
    }
    JoinFanClub()
    {
        console.log(this.id + ": User joined fanclub ");
        this.userInFanClub=true;
    }
}

export class VoteScenarioState
{
    id: string = "";
    choiceOneVotesUser: number = 0;
    choiceTwoVotesUser: number = 0;

    choiceOneVotesGlobal: number = 0;
    choiceTwoVotesGlobal: number = 0;

    winnerIndex: number = -1;

    constructor(id: string, oneUser, twoUser, oneGlobal, twoGlobal, winner){
        this.id = id;
        this.choiceOneVotesUser = oneUser;
        this.choiceTwoVotesUser = twoUser;
        this.choiceOneVotesGlobal = oneGlobal;
        this.choiceTwoVotesGlobal = twoGlobal;
        this.winnerIndex = winner;
    }

    UpdateFromDynamicData(oneUser: number, twoUser: number, oneGlobal: number, twoGlobal:number)
    {
        this.choiceOneVotesUser = oneUser;
        this.choiceTwoVotesUser = twoUser;
        this.choiceOneVotesGlobal = oneGlobal;
        this.choiceTwoVotesGlobal = twoGlobal;
    }

    IncreaseVote(choiceIndex: number)
    {
        switch(choiceIndex)
        {
            case 0:
                this.choiceOneVotesUser++;
                this.choiceOneVotesGlobal++;
                break;
            case 1:
                this.choiceTwoVotesUser++;
                this.choiceTwoVotesGlobal++;
                break;
        }
    }
    DecreaseVote(choiceIndex: number)
    {
        switch(choiceIndex)
        {
            case 0:
                this.choiceOneVotesUser = Math.max(this.choiceOneVotesUser-1,0);
                this.choiceOneVotesGlobal = Math.max(this.choiceOneVotesGlobal-1,0);
                break;
            case 1:
                this.choiceTwoVotesUser = Math.max(this.choiceTwoVotesUser-1,0);
                this.choiceTwoVotesGlobal = Math.max(this.choiceTwoVotesGlobal-1,0);
                break;
        }
    }
    EvaluateWinner()
    {
        if(this.choiceOneVotesGlobal > this.choiceTwoVotesGlobal)
        {
            this.winnerIndex = 0;
        }
        else if (this.choiceOneVotesGlobal > this.choiceTwoVotesGlobal)
        {
            this.winnerIndex = 1;
        }
        else
        {
            this.winnerIndex = 2;
        }
    }
}