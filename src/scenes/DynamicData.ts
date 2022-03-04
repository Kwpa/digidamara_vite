import { TeamState, VoteScenarioState } from "./LocalGameState";

export default class DynamicData
{
    dynamicTeamsState!: TeamState[];
    dynamicVoteScenariosState!: VoteScenarioState[];
    dynamicUserState;
    dynamicRoundState;

    constructor(teams,user,round, votes){
        this.dynamicTeamsState = teams;
        this.dynamicUserState = user;
        this.dynamicRoundState = round;
        this.dynamicVoteScenariosState = votes;
    }
}