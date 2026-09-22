import type {GameState, InputState, Vector2} from "../GameObjects.ts";
import {MakeVector2} from "../GameObjects.ts";
import {applyInput} from "./inputHandlerSystem.ts";
// import {updateBullets} from "./bulletSystem.ts";

export class WorldModel {
    state: GameState = this.createInitialState();
    input: InputState = { turnDirection: 0, thrust: false };
    
    screenWidth: number;
    screenHeight: number;
    
    constructor(screenWidth: number, screenHeight: number){
        this.screenHeight = screenHeight;
        this.screenWidth = screenWidth;
    }
    
    
    update(deltaTime: number) {
        applyInput(this.state, this.input, deltaTime);
        // updateBullets(this.state, deltaTime);
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
                direction: MakeVector2(0,0),
                turnSpeed: 15,
                position: arenaMiddle,
                rotation: 0
            },
            
        }
    }
}