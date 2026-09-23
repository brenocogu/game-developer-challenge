import type {GameState, InputState} from "../GameObjects.ts";
import type {Vector2} from "../Vector2.ts";

import {applyInput} from "../Systems/inputHandlerSystem.ts";
import {playerInputShootNewBullet, updateBullets, updateReloadTime} from "../Systems/bulletSystem.ts";
import {updateDefeatedEnemies, updateEnemiesAttacking, updateEnemiesPursuing} from "../Systems/enemyBehaviourSystem.ts";
import {spawnEnemyRandomOutside} from "../Systems/enemySpawnSystem.ts";
import {GameEndReason} from "../GameRules.ts";

export const TIME_MAX: number = 180;
export type OnGameFinished = (e: GameEndReason) => void;
export class WorldModel {
    state: GameState;
    input: InputState = { turnDirection: 0, thrust: false, firing: false };
    
    stateReload: boolean;
    screenWidth: number;
    screenHeight: number;
    onGameFinishedHandler: OnGameFinished;
    onPauseHandler: (paused: boolean) => void;
    constructor(
        screenWidth: number, 
        screenHeight: number,
        onPauseHandler: (paused: boolean) => void,
        onGameFinishedHandler: OnGameFinished,){
        this.screenHeight = screenHeight;
        this.screenWidth = screenWidth;
        this.onPauseHandler = onPauseHandler;
        this.state = this.createInitialState();
        this.onGameFinishedHandler = onGameFinishedHandler;
        this.stateReload = false;
        
    }
    
    
    update(deltaTime: number) {
        if(this.stateReload)
            return;
        if(this.state.paused)
            return;

        this.state.timeRemaining -= deltaTime;
        if(this.state.timeRemaining <= 0){
            this.state.paused = true;
            this.onGameFinishedHandler(GameEndReason.GAME_WON);
        }
        
        if (this.state.player.currentHp <= 0){
            this.state.paused = true;
            this.onGameFinishedHandler(GameEndReason.GAME_OVER);
        }
        
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
                timeToSpawn: 5,
                nextUID: 0,
            },
            score: 0,
            timeRemaining: TIME_MAX
        }
    }
    
    performPause(){
        if (this.state.paused)
            return;
        
        this.state.paused = true;
        this.onPauseHandler(this.state.paused);
    }

    revertPause(){
        this.state.paused = false;
        this.onPauseHandler(this.state.paused);
    }
    
    performReload(){
        this.stateReload = true;
        this.state = this.createInitialState();
        this.stateReload = false;
    }
}