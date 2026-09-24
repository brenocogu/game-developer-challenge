import { Assets, Texture } from 'pixi.js';
import { useRef, useState } from 'react';
import { useTick } from '@pixi/react';
import type { DefaultShip } from '../../Models/GameObjects.ts';
import type { Vector2 } from '../../Models/Vector2.ts';

interface Props {
    attachedShip: DefaultShip;
    targetSize: Vector2;
    imageName: string;
}

export function HealthBarView({ attachedShip, targetSize, imageName }: Props) {
    const containerRef = useRef<any>(null);
    const fillRef = useRef<any>(null);

    const [texture, setTexture] = useState(Texture.EMPTY);
    if (texture === Texture.EMPTY) {
        Assets.load('/assets/png/retina/ui/hud/health_frame.png')
            .then(setTexture);
    }

    const [fill, setFill] = useState(Texture.EMPTY);
    if (fill === Texture.EMPTY) {
        Assets.load('/assets/png/retina/ui/hud/' + imageName).then(setFill);
    }

    useTick(() => {
        const container = containerRef.current;
        const fill = fillRef.current;
        if (!container || !fill) return;

        const fillPercent = Math.max(0, Math.min(1, attachedShip.currentHp / attachedShip.maxHp));
        fill.width = fillPercent * targetSize.x;
        fill.visible = fillPercent > 0;
    });

    return (
        <pixiContainer ref={containerRef}>
            <pixiSprite
                anchor={0.5}
                width={targetSize.x}
                height={targetSize.y}
                texture={texture}
            />
            <pixiSprite
                ref={fillRef}
                anchor={{ x: 0.5, y: 0.5 }}
                position={{x: 0, y:0}}
                height={targetSize.y}
                texture={fill}
            />
        </pixiContainer>
    );
}
