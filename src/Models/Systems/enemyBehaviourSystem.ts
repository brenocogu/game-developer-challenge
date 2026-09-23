import {EnemyState, EnemyType, type GameState, type Enemy} from "../GameObjects.ts";

import {Normalize, type Vector2, VectorMagnitude} from "../Vector2.ts";
import {checkForChargerCollision} from "./Subsystems/enemyCollisionSubsystem.ts";
import {shootNewBullet} from "./bulletSystem.ts";

const NINETY_DEGREES: number = Math.PI / 2;

//TODO:: isso tem que passar pra evento ao inves de per-frame
export function updateDefeatedEnemies(state: GameState){
    let defeated: Enemy[] = [];
    for (const enemy of state.enemies) {
        if (enemy.currentHp > 0)
            continue;
        
        //TODO:: Score deve viver em outra layer
        state.score++;
        defeated.push(enemy);
    }
    state.enemies = state.enemies.filter((enemy) => !defeated.includes(enemy));
}


export function updateEnemiesPursuing(state: GameState, deltaTime: number){
    let playerPos: Vector2 = state.player.position;
    
    for (const enemy of state.enemies) {
        if (enemy.state != EnemyState.PURSUIT)
            continue;
        
        let direction: Vector2 = {x: playerPos.x - enemy.position.x, y: playerPos.y - enemy.position.y};
        let distance: number = VectorMagnitude(direction);
        
        if (distance <= enemy.range)
        {
            enemy.state = EnemyState.ATTACK;
            continue;
        }

        direction = Normalize(direction);
        enemy.rotation = Math.atan2(direction.y, direction.x) - Math.PI / 2;
        enemy.position.x += direction.x * enemy.speed * deltaTime;
        enemy.position.y += direction.y * enemy.speed * deltaTime;
    }
}

export function updateEnemiesAttacking(state: GameState, deltaTime: number){
    let playerPos: Vector2 = state.player.position;

    for (const enemy of state.enemies) {
        if (enemy.state != EnemyState.ATTACK)
            continue;
        let direction: Vector2 = {x: playerPos.x - enemy.position.x, y: playerPos.y - enemy.position.y};
        let distance: number = VectorMagnitude(direction);

        if (distance > enemy.range)
        {
            enemy.state = EnemyState.PURSUIT;
            continue;
        }
        
        if (enemy.enemyType != EnemyType.RANGER) {
            checkForChargerCollision(state, enemy);
            return;
        }
        
        enemy.rotation = Math.atan2(direction.y, direction.x) - NINETY_DEGREES;
        enemy.fireCooldown += deltaTime;
        shootNewBullet(state, enemy);
    }
}