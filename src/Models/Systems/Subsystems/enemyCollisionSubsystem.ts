import {type Enemy, EnemyType, type GameState,} from "../../GameObjects.ts";
import {circleOverlap} from "./circullarCollisionSubsystem.ts";

export function checkForChargerCollision(state: GameState, enemy: Enemy): boolean{
    if (enemy.enemyType != EnemyType.CHARGER)
        return false;
    let playerCollision = state.player;
    const overlaps = circleOverlap(enemy, playerCollision);
    if(!overlaps)
        return false;

    enemy.currentHp = -100;
    //TODO:: Visual feedbacks
    playerCollision.currentHp--;
    return true;
}
