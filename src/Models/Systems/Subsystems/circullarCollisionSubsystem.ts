import type {CollisionObject} from "../../GameObjects.ts";

export function circleOverlap(a: CollisionObject, b: CollisionObject): boolean {
    const dx = a.position.x - b.position.x;
    const dy = a.position.y - b.position.y;
    const distanceSquared = dx * dx + dy * dy;
    const radiiSum = a.collisionRadius + b.collisionRadius;

    return distanceSquared <= radiiSum * radiiSum;
}