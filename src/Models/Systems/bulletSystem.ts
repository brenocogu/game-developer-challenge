import type {Bullet, DefaultShip, GameState, InputState} from "../GameObjects.ts";

export const FIRE_COOLDOWN: number = 2;


export function shootNewBullet(state: GameState, input: InputState, shotter: DefaultShip) {
    if(!input.firing)
        return;
    if(shotter.fireCooldown < FIRE_COOLDOWN)
        return;
    
    let shot: Bullet ={
        speed: 250,
        collisionRadius: 15,
        position: {...shotter.position},
        rotation: shotter.rotation,
        owner: shotter
    }
    
    shotter.fireCooldown = 0;
    state.bullets.push(shot);
}

export function updateBullets(state: GameState, deltaTime: number) {
    for (const b of state.bullets) {
        b.position.x += Math.cos(b.rotation + Math.PI / 2) * b.speed * deltaTime;
        b.position.y += Math.sin(b.rotation + Math.PI / 2) * b.speed * deltaTime;
    }
    
    //TODO:: COLLISION SUBSYSTEM
    
    state.bullets = state.bullets.filter(filterBullets);
}

export function updateReloadTime(state: GameState, deltaTime: number) {
    state.player.fireCooldown += deltaTime;
}

function filterBullets(bullet: Bullet){
    let validX = bullet.position.x >= 0 && bullet.position.x < 1080;
    let validY = bullet.position.y >= 0 && bullet.position.y < 1080;
    
    return validX && validY;
}