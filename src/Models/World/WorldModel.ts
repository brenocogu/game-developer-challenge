import type {GameState, InputState} from "../GameObjects.ts";
import type {Vector2} from "../Vector2.ts";

import {applyInput} from "../Systems/inputHandlerSystem.ts";
import {playerInputShootNewBullet, updateBullets, updateReloadTime} from "../Systems/bulletSystem.ts";
import {updateDefeatedEnemies, updateEnemiesAttacking, updateEnemiesPursuing} from "../Systems/enemyBehaviourSystem.ts";
import {spawnEnemyRandomOutside} from "../Systems/enemySpawnSystem.ts";

export class WorldModel {
    state: GameState = this.createInitialState();
    input: InputState = { turnDirection: 0, thrust: false, firing: false };
    
    screenWidth: number;
    screenHeight: number;
    
    constructor(screenWidth: number, screenHeight: number){
        this.screenHeight = screenHeight;
        this.screenWidth = screenWidth;
    }
    
    
    update(deltaTime: number) {
        if(this.state.paused)
            return;
        
        applyInput(this.state, this.input, deltaTime);
        playerInputShootNewBullet(this.state, this.input, this.state.player);

        updateDefeatedEnemies(this.state);
        spawnEnemyRandomOutside(this.state, deltaTime);
        updateEnemiesPursuing(this.state, deltaTime);
        updateEnemiesAttacking(this.state, deltaTime);
        
        updateBullets(this.state, deltaTime);
        updateReloadTime(this.state, deltaTime);
    }

    createInitialState(): GameState {
        let arenaSize: Vector2 = {x: 800, y: 600};
        let arenaMiddle: Vector2 = {x: arenaSize.x/2, y: arenaSize.y/2};
        
        return {
            paused: false,
            arena: {
                arenaSize: arenaSize, 
                arenaCenter: arenaMiddle
            },
            player: {
                rightBurstColldown: 5,
                leftBurstColldown: 5,
                maxHp: 10,
                currentHp: 10,
                fireCooldown: 2,
                speed: 5,
                direction: {x: 0, y: 0},
                turnSpeed: 15,
                position: arenaMiddle,
                rotation: 0,
                collisionRadius: 10,
                width: 33,
                height: 57
            },
            bullets: [],
            enemies: [],
            enemySpawner: {
                timeToSpawn: 5
            },
            score: 0
        }
    }
    
    
}