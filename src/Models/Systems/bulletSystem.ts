import {type Bullet, BulletOwnership, type DefaultShip, type GameState, type InputState} from "../GameObjects.ts";
import {checkForBulletCollision} from "./Subsystems/bulletsCollisionSubSystem.ts";

export const FIRE_COOLDOWN: number = 2;

export function playerInputShootNewBullet(state: GameState, input: InputState, shotter: DefaultShip) {
    if(!input.firing)
        return;
    
    shootNewBullet(state, shotter);
}

export function shootNewBullet(state: GameState, shotter: DefaultShip) {
    const ownership: BulletOwnership = (shotter === state.player) ? BulletOwnership.PlayerOwned : BulletOwnership.EnemyOwned;
    
    if(shotter.fireCooldown < FIRE_COOLDOWN)
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
}

function filterBullets(bullet: Bullet){
    let validX = bullet.position.x >= -15 && bullet.position.x < 850;
    let validY = bullet.position.y >= -15 && bullet.position.y < 850;
    
    return validX && validY;
}