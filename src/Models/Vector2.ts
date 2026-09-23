export type Vector2 = {x: number, y: number}

export function VectorMagnitude(vector: Vector2): number{
    return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
}

export function Normalize(vector: Vector2): Vector2{
    const length = VectorMagnitude(vector);

    if (length === 0) {
        return { x: 0, y: 0 };
    }

    return {
        x: vector.x / length,
        y: vector.y / length
    };
}

export function Distance(origin: Vector2, target: Vector2){
    const dx = origin.x - target.x;
    const dy = origin.y - target.y;
    
    return Math.sqrt(dx * dx + dy * dy);
}