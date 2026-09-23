import {type Enemy, EnemyState, EnemyType, type GameState} from "../GameObjects.ts";
import type {Vector2} from "../Vector2.ts";

export const MAX_SPAWN_TIME: number = 4;

export function spawnEnemyRandomOutside(state: GameState, deltaTime: number){
    
    if(state.enemySpawner.timeToSpawn < MAX_SPAWN_TIME)
    {
        state.enemySpawner.timeToSpawn += deltaTime;
        return;
    }
    
    console.log("Spawning enemy");
    let viewportMaxX: number = state.arena.arenaSize.x + 10;
    let viewportMaxY: number = state.arena.arenaSize.y + 10;
    let useMaxX: boolean = coinFlip();
    let useMaxY: boolean = coinFlip();
    let spawnAttacker: boolean = coinFlip();
    
    let spawnPos: Vector2 = { x: useMaxX ? viewportMaxX : -10, y: useMaxY ? viewportMaxY : -10 };
    let spawned: Enemy = {
        state: EnemyState.PURSUIT,
        enemyType: spawnAttacker ? EnemyType.RANGER : EnemyType.CHASER,
        range: spawnAttacker ? 40 : 1,
        maxHp: 5,
        currentHp: 5,
        fireCooldown: 0,
        speed: 30,
        direction: {x: 0, y:0},
        turnSpeed: 15,
        position: {x: spawnPos.x, y: spawnPos.y},
        rotation: 0,
        collisionRadius: 25
    }
    
    state.enemySpawner.timeToSpawn = -9000;
    state.enemies.push(spawned);
}

export function updateEnemiesDespawn(state: GameState) {
    let markedForDeletion: Enemy[] = [];
    for (const enemy of state.enemies)
    {
        if (enemy.currentHp >= 0 )
            continue;
        //TODO:: ADD SCORE
        //TODO: ADD FEEDBACK

        markedForDeletion.push(enemy)
    }

    state.enemies.filter(
        (enemy) => !markedForDeletion.includes(enemy)
    );
}


function coinFlip(): boolean{
    return Math.random() > 0.5;
}