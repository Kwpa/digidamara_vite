import { TeamState, VoteScenarioState, DynamicVoteScenarioState} from "./LocalGameState";

export default class DynamicData
{
    dynamicTeamsState!: TeamState[];
    voteScenariosState!: VoteScenarioState[];
    d_dynamicVoteOptionsState!: DynamicVoteScenarioState;
    dynamicUserState;
    dynamicRoundState;

    constructor(teams,user,round, votes, dynamicVotes){
        this.dynamicTeamsState = teams;
        this.dynamicUserState = user;
        
        this.dynamicRoundState = round;
        this.voteScenariosState = votes;
        this.d_dynamicVoteOptionsState = dynamicVotes;
    }
}