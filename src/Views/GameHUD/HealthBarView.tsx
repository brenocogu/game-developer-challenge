import { Assets, Texture } from 'pixi.js';
import { useRef, useState } from 'react';
import { useTick } from '@pixi/react';
import type { DefaultShip } from '../../Models/GameObjects.ts';
import type { Vector2 } from '../../Models/Vector2.ts';

interface Props {
    attachedShip: DefaultShip;
    targetSize: Vector2;
}

export function HealthBarView({ attachedShip, targetSize }: Props) {
    const spriteRef = useRef<any>(null);

    const [texture, setTexture] = useState(Texture.EMPTY);
    if (texture === Texture.EMPTY) {
        Assets.load('/assets/png/retina/ui/hud/health_frame.png')
            .then(setTexture);
    }

    useTick(() => {
        if (!spriteRef.current) return;
        console.log(attachedShip.currentHp);
        //TODO:: add hit reaction and fill
    });

    return (
        <pixiSprite
            ref={spriteRef}
            anchor={0.5}
            eventMode="static"
            width={targetSize.x}
            height={targetSize.y}
            texture={texture}
        />
    );
}
