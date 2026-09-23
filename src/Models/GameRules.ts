export enum GameEndReason{
    GAME_OVER,
    GAME_WON
}

export interface GameResultsData{
    totalPoints: number,
    timeSetting: string,
    gameEndReason: GameEndReason
}

//TODO:: Enemy Spawn Time and time duration HERE