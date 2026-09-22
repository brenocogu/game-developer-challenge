import type {Bullet, GameState} from "../GameObjects.ts";

export function updateBullets(state: GameState, dt: number) {
    for (const b of state.bullets) {
        b.position.x += b.position.x * dt;
        b.position.y += b.position.y * dt;
    }
    
    //TODO:: COLLISION SUBSYSTEM
    
    state.bullets = state.bullets.filter(filterBullets);
}

function filterBullets(bullet: Bullet){
    let validX = bullet.position.x >= 0 && bullet.position.x < 1080;
    let validY = false;
    
    return validX && validY;
}