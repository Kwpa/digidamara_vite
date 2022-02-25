export default class LocalGameState
{
    username!: string;
    actionPoints: number = 0;
    sparksAwarded: number = 0;
    maxActionPoints!: number;
    carouselPosition!: number;
    currentTeamID!: string;
    teamIDs!: string[];
    round: number = 0;
    voteStates!: VoteScenarioState[];
    teamStates!: TeamState[];

    Init(username: string, round: number, maxActionPoints: number, teamIDs : string[], voteStates, teamStates)
    {
        this.GainActionPoints(5);
        this.round = round;
        this.username = username;
        this.maxActionPoints = maxActionPoints;
        this.SetActionPointsToMax();
        this.carouselPosition = 0;
        this.teamIDs = teamIDs;
        this.SetCurrentTeamID()
        this.voteStates = voteStates;
        this.teamStates = teamStates;      
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
            return this.voteStates[this.round-1].choiceOneVotes > 0; 
        }
        else if (choice==1)
        {
            return this.voteStates[this.round-1].choiceTwoVotes > 0;
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

    constructor(id: string){
        this.id = id;
    }
}

export class VoteScenarioState
{
    choiceOneVotes: number = 0;
    choiceTwoVotes: number = 0;
    winnerIndex: number = -1;

    IncreaseVote(choiceIndex: number)
    {
        switch(choiceIndex)
        {
            case 0:
                this.choiceOneVotes++;
                break;
            case 1:
                this.choiceTwoVotes++;
                break;
        }
    }
    DecreaseVote(choiceIndex: number)
    {
        switch(choiceIndex)
        {
            case 0:
                this.choiceOneVotes = Math.max(this.choiceOneVotes-1,0);
                break;
            case 1:
                this.choiceTwoVotes = Math.max(this.choiceTwoVotes-1,0);
                break;
        }
    }
    EvaluateWinner()
    {
        if(this.choiceOneVotes > this.choiceTwoVotes)
        {
            this.winnerIndex = 0;
        }
        else if (this.choiceOneVotes > this.choiceTwoVotes)
        {
            this.winnerIndex = 1;
        }
        else
        {
            this.winnerIndex = 2;
        }
    }
}