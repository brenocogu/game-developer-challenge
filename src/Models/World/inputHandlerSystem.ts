import type {GameState, InputState} from "../GameObjects.ts";

export function applyInput(state: GameState, input: InputState, deltaTime: number) {
    const turnSpeed = Math.PI;      // rad/sec
    const thrust = 200;             // px/sec

    state.player.rotation += input.turnDirection * turnSpeed * deltaTime;
    
    if (input.thrust) {
        state.player.position.x += Math.cos(state.player.rotation) * thrust * deltaTime;
        state.player.position.y += Math.sin(state.player.rotation) * thrust * deltaTime;
    }
}