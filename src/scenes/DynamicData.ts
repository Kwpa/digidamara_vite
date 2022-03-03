import { TeamState } from "./LocalGameState";

export default class DynamicData
{
    dynamicTeamsState!: TeamState[];
    dynamicUserState;
    dynamicRoundState;

    constructor(teams,user,round){
        this.dynamicTeamsState = teams;
        this.dynamicUserState = user;
        this.dynamicRoundState = round;
    }
}