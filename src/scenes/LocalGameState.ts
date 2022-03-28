import DynamicData from "./DynamicData";

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
    outOfCompetition: boolean = false;
    upgradeLevel: number = 0;
    energyRequirement: number = 1;
    currentEnergy: number = 0;
    userInFanClub: boolean = false;

    constructor(id, outOfComp, upgradeLevel, energyReq, currentEnergy, inFanClub){
        this.id = id;
        this.outOfCompetition = outOfComp;
        this.upgradeLevel = upgradeLevel;
        this.energyRequirement = energyReq;
        this.currentEnergy = currentEnergy;
        this.userInFanClub = inFanClub;
    }

    UpdateFromDynamicData(teamDynamic: TeamState, energyRequirement:number, upgradeLevel:number, inFanClub:boolean)
    {
        this.currentEnergy=teamDynamic.currentEnergy;
        this.outOfCompetition=teamDynamic.outOfCompetition;
        this.upgradeLevel=upgradeLevel;
        this.userInFanClub=inFanClub;
        this.energyRequirement = energyRequirement;
    }

    Upgrade()
    {
        this.upgradeLevel++;
    }
    UpgradeBy(value:number)
    {
        this.upgradeLevel += value;
    }
    OutOfCompetition()
    {
        this.outOfCompetition=true;
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