import {type Enemy, EnemyState, EnemyType, type GameState} from "../GameObjects.ts";
import type {Vector2} from "../Vector2.ts";

export function spawnEnemyRandomOutside(state: GameState, deltaTime: number){
    
    if(state.enemySpawner.timeToSpawn < state.enemySpawner.maxSpawnTime)
    {
        state.enemySpawner.timeToSpawn += deltaTime;
        return;
    }
    
    let viewportMaxX: number = state.arena.arenaSize.x + 10;
    let viewportMaxY: number = state.arena.arenaSize.y + 10;
    let useMaxX: boolean = coinFlip();
    let useMaxY: boolean = coinFlip();
    let spawnAttacker: boolean = coinFlip();
    
    let spawnPos: Vector2 = { x: useMaxX ? viewportMaxX : -10, y: useMaxY ? viewportMaxY : -10 };
    let spawned: Enemy = {
        enemyUID: state.enemySpawner.nextUID,
        state: EnemyState.PURSUIT,
        enemyType: spawnAttacker ? EnemyType.RANGER : EnemyType.CHARGER,
        range: spawnAttacker ? 150 : 20,
        maxHp: 2,
        currentHp: 2,
        fireCooldown: 0,
        speed: spawnAttacker ? 30 : 66.6,
        direction: {x: 0, y:0},
        turnSpeed: spawnAttacker ? 15 : 45,
        position: {x: spawnPos.x, y: spawnPos.y},
        rotation: 0,
        collisionRadius: 25,
        width: 33,
        height: 57
    }
    
    state.enemySpawner.timeToSpawn = 0;
    state.enemySpawner.nextUID++;
    state.enemies.push(spawned);
}

export function updateEnemiesDespawn(state: GameState) {
    let markedForDeletion: Enemy[] = [];
    for (const enemy of state.enemies)
    {
        if (enemy.currentHp >= 0 )
            continue;
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