import {Assets, Sprite, Texture} from 'pixi.js';
import { useRef, useState } from 'react';
import { useTick } from '@pixi/react';
import type { DefaultShip } from '../../Models/GameObjects.ts';
import type { Vector2 } from '../../Models/Vector2.ts';
import {HealthBarView} from "./HealthBarView.tsx";

interface Props {
    attachedShip: DefaultShip;
    targetSize: Vector2;
}

export function EnemyHealthBarView({ attachedShip, targetSize }: Props) {
    const spriteRef = useRef<any>(null);

    useTick(() => {
        if (!spriteRef.current) return;
        spriteRef.current.x = attachedShip.position.x;
        spriteRef.current.y = attachedShip.position.y - 25;
    });

    return (
        <pixiContainer 
            ref={spriteRef}
            zIndex={5}>
            <HealthBarView  attachedShip={attachedShip} targetSize={targetSize} />
        </pixiContainer>
    );
}