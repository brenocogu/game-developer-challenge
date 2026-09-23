import {
    type Bullet,
    BulletOwnership,
    type DefaultShip,
    type GameState,
} from "../../GameObjects.ts";
import {circleOverlap} from "./circullarCollisionSubsystem.ts";


export function checkForBulletCollision(state: GameState, gameBullet: Bullet): boolean{
    const playerHit: boolean = checkForPlayerCollision(gameBullet, state.player);
    const anyEnemyHit: boolean = checkForEnemyCollision(gameBullet, state);
    
    return playerHit || anyEnemyHit;
}

function checkForPlayerCollision(bullet: Bullet, playerCollision: DefaultShip): boolean{
    if (bullet.owner == BulletOwnership.PlayerOwned)
        return false;
    
    const overlaps = circleOverlap(bullet, playerCollision);
    if(!overlaps)
        return false;
    
    //TODO:: Visual feedbacks
    playerCollision.currentHp--;
    console.log("PLAYER HEALTH:: " + playerCollision.currentHp);
    return true;
}

function checkForEnemyCollision(bullet: Bullet, gameState: GameState): boolean{
    if (bullet.owner == BulletOwnership.EnemyOwned)
        return false;
    
    let anyHit: boolean = false;
    for (const enemy of gameState.enemies){
        const overlaps: boolean = circleOverlap(bullet, enemy)
        if (!overlaps)
            continue;
        anyHit = true;
        //TODO: VISUAL FEEDBACKS
        enemy.currentHp--;
        console.log(enemy.currentHp)
        break;
    }
    
    return anyHit;
}

// function checkForSolidCollisions(bullet: Bullet, gameState: GameState){
//    
// }
