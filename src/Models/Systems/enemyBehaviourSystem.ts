import {
    EnemyState,
    type GameState, 
} from "../GameObjects.ts";

import {Normalize, type Vector2, VectorMagnitude} from "../Vector2.ts";

export function updateEnemiesPursuing(state: GameState, deltaTime: number){
    let playerPos: Vector2 = state.player.position;
    
    for (const enemy of state.enemies) {
        if (enemy.state != EnemyState.PURSUIT)
            continue;
        
        let direction: Vector2 = {x: playerPos.x - enemy.position.x, y: playerPos.y - enemy.position.y};
        let distance: number = VectorMagnitude(direction);
        
        console.log(distance);
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

export function updateEnemiesAttacking(state: GameState){
    let playerPos: Vector2 = state.player.position;

    for (const enemy of state.enemies) {
        if (enemy.state != EnemyState.ATTACK)
            continue;
        let direction: Vector2 = {x: playerPos.x - enemy.position.x, y: playerPos.y - enemy.position.y};
        let distance: number = VectorMagnitude(direction);

        console.log(distance);

        if (distance > enemy.range)
        {
            enemy.state = EnemyState.PURSUIT;
            continue;
        }
        
        //TODO:: enemy bullet spawn
    }
}