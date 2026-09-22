export type Vector2 = {x: number, y: number}
export const MakeVector2 = (x: number, y: number): Vector2 => ({ x, y });

export interface Arena {
    arenaSize: Vector2;
    arenaCenter: Vector2;
}

export interface GameObject{
    position: Vector2;
    rotation: number;
}

export interface Bullet extends GameObject{
    speed: number;
    size: Vector2;
}

export interface DefaultShip extends GameObject{
    currentHp: number;
    maxHp: number;
    fireCooldown: number;
    speed: number;
    direction: Vector2;
    turnSpeed: number;
}

export interface Player extends DefaultShip {
    rightBurstColldown: number;
    leftBurstColldown: number;
}

export interface Enemy extends DefaultShip {
    //TODO:: AI logic
}

export interface InputState{
    turnDirection: number;
    thrust: boolean;
}

export interface GameState {
    arena: Arena;
    player: Player;
    // bullets: Bullet[];
    // enemies: Enemy[];
    // score: number;
    paused: boolean;
}
