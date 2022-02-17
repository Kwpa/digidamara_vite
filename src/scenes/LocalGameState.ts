export default class LocalGameState
{
    username!: string;
    actionPoints!: number;
    sparks!: number;
    maxActionPoints!: number;
    carouselPosition!: number;
    currentTeamID!: string;
    teamIDs!: string[];

    Init(username: string, maxActionPoints: number, teamIDs : string[])
    {
        this.username = username;
        this.maxActionPoints = maxActionPoints;
        this.SetActionPointsToMax();
        this.carouselPosition = 0;
        this.teamIDs = teamIDs;
        this.SetCurrentTeamID()
        console.log("starting team " + this.currentTeamID);
    }

    SetCurrentTeamID()
    {
        this.currentTeamID = this.teamIDs[this.carouselPosition];
    }

    RollCarousel(leftRight: number)
    {
        this.carouselPosition += leftRight;
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

    GainSparks(amount: number)
    {
        var newAmount = this.sparks + amount;  
        this.SetSparks(newAmount);
    }

    SetSparks(amount: number)
    {
        this.sparks = amount;
    }
    
    SpendSparks(amount: number)
    {
        var newAmount = this.sparks - amount;
        if(newAmount >= 0)
        {
            this.SetSparks(newAmount);
            return true;
        }
        else return false;
    }


}