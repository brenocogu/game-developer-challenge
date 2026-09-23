import type {GameState, InputState} from "../GameObjects.ts";
import type {Vector2} from "../Vector2.ts";

const NINETY_DEGREES = Math.PI / 2;
export function applyInput(state: GameState, input: InputState, deltaTime: number) {
    const thrust = 50
    
    state.player.rotation += input.turnDirection * Math.PI * deltaTime;
    if (!input.thrust)
        return;

    let playerPosition: Vector2 = state.player.position;
    let predictableX = Math.cos(state.player.rotation + NINETY_DEGREES) * thrust * deltaTime;
    let predictableY = Math.sin(state.player.rotation + NINETY_DEGREES) * thrust * deltaTime;

    if(!validateMovement({...playerPosition}, {x: predictableX, y: predictableY}))
        return;

    state.player.position.x += predictableX;
    state.player.position.y += predictableY;
}

function validateMovement(position: Vector2, desiredPosition: Vector2) : boolean{
    position.x += desiredPosition.x;
    position.y += desiredPosition.y;
    
    //TODO:: dynamic with screen size as dependency
    //TODO:: account collisions
    return position.x >= 0 && position.x <= 800 && position.y <= 600 && position.y >= 0;
}