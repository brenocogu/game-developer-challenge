import type {Vector2} from "./Vector2.ts";

export interface Arena {
    arenaSize: Vector2,
    arenaCenter: Vector2,
}

export interface GameObject{
    position: Vector2,
    rotation: number,
}

export interface CollisionObject extends GameObject{
    collisionRadius: number,
    width: number,
    height: number,
}

export enum BulletOwnership{
    PlayerOwned,
    EnemyOwned
}

export interface Bullet extends CollisionObject{
    speed: number,
    owner: BulletOwnership
}

//TODO:: health must be a component used by the Ships
// we MUST change it to reflect through events
export interface DefaultShip extends CollisionObject{
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

export enum EnemyState{
    PURSUIT,
    ATTACK
}

export enum EnemyType{
    CHARGER,
    RANGER
}

export interface Enemy extends DefaultShip {
    state: EnemyState,
    enemyType: EnemyType,
    range: number,
}

export interface EnemySpawner {
    timeToSpawn: number,
}

export interface InputState{
    turnDirection: number;
    thrust: boolean;
    firing: boolean;
}

export interface GameState {
    arena: Arena;
    player: Player;
    bullets: Bullet[];
    enemies: Enemy[];
    enemySpawner: EnemySpawner
    score: number;
    paused: boolean;
}
