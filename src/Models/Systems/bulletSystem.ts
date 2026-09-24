import {
    type Bullet,
    BulletOwnership,
    type DefaultShip,
    type GameState,
    type InputState,
    type Player
} from "../GameObjects.ts";
import {checkForBulletCollision} from "./Subsystems/bulletsCollisionSubSystem.ts";

export const PLAYER_FIRE_COOLDOWN: number = 1.5;
export const PLAYER_BURST_COOLDOWN: number = 4;
export const ENEMY_FIRE_COOLDOWN: number = 1.5;
export const FOURTY_DEGREE: number = Math.PI/4;

export function playerInputShootNewBullet(state: GameState, input: InputState, shotter: DefaultShip) {
    if(!input.firing)
        return;
    
    shootNewBullet(state, shotter);
}

export function playerInputShootBurstAttack(state: GameState, input: InputState, playerObject: Player) {
    if(input.fireRightBurst && playerObject.rightBurstColldown >= PLAYER_BURST_COOLDOWN) {
        doShootBurstAttack(state, playerObject, true);
        playerObject.rightBurstColldown = 0;
    }
    
    if(input.fireLeftBurst && playerObject.leftBurstColldown >= PLAYER_BURST_COOLDOWN) {
        doShootBurstAttack(state, playerObject, false);
        playerObject.leftBurstColldown = 0;
    }
}

function doShootBurstAttack(state: GameState, playerObject: Player, rightSide: boolean){
    for (let i: number = 1; i < 4; i++){
        const sideFactor: number = (rightSide) ? 1 : -1;
        const degreeAdjust: number = playerObject.rotation + (FOURTY_DEGREE * i * sideFactor);
        let shot: Bullet ={
            speed: 250,
            collisionRadius: 5,
            position: {...playerObject.position},
            rotation: degreeAdjust,
            owner: BulletOwnership.PlayerOwned,
            width: 10,
            height: 10,
        }

        state.bullets.push(shot);
    }
}

export function shootNewBullet(state: GameState, shotter: DefaultShip) {
    const ownership: BulletOwnership = (shotter === state.player) ? BulletOwnership.PlayerOwned : BulletOwnership.EnemyOwned;
    const cooldown: number = (shotter === state.player) ? PLAYER_FIRE_COOLDOWN : ENEMY_FIRE_COOLDOWN;
    
    if(shotter.fireCooldown < cooldown)
        return;
    
    let shot: Bullet ={
        speed: 250,
        collisionRadius: 5,
        position: {...shotter.position},
        rotation: shotter.rotation,
        owner: ownership,
        width: 10,
        height: 10,
    }
    
    shotter.fireCooldown = 0;
    state.bullets.push(shot);
}

export function updateBullets(state: GameState, deltaTime: number) {
    let markedBullets: Bullet[] = [];
    for (const b of state.bullets) {
        b.position.x += Math.cos(b.rotation + Math.PI / 2) * b.speed * deltaTime;
        b.position.y += Math.sin(b.rotation + Math.PI / 2) * b.speed * deltaTime;

        if (checkForBulletCollision(state, b))
            markedBullets.push(b);
    }
    
    state.bullets = state.bullets.filter(filterBullets);
    state.bullets = state.bullets.filter((bullet => !markedBullets.includes(bullet)));
}

export function updateReloadTime(state: GameState, deltaTime: number) {
    state.player.fireCooldown += deltaTime;
    state.player.leftBurstColldown += deltaTime;
    state.player.rightBurstColldown += deltaTime
}

function filterBullets(bullet: Bullet){
    let validX = bullet.position.x >= -15 && bullet.position.x < 850;
    let validY = bullet.position.y >= -15 && bullet.position.y < 850;
    
    return validX && validY;
}