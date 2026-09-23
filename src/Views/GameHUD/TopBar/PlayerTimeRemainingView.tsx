import { Assets, Texture, Text} from 'pixi.js';
import { useRef, useState } from 'react';
import { useTick, extend } from '@pixi/react';
import type {WorldModel} from "../../../Models/World/WorldModel.ts";

extend({Text})
interface Props {
    world: WorldModel
}

export function PlayerTimeRemaining({ world }: Props) {
    const [timeRemaining, setTimeRemaining] = useState(0);
    const spriteRef = useRef<any>(null);

    const [frameTexture, setTexture] = useState(Texture.EMPTY);
    if (frameTexture === Texture.EMPTY) {
        Assets.load('src/assets/png/retina/ui/hud/counter_panel.png')
            .then(setTexture);
    }

    const [iconTime, setIcon] = useState(Texture.EMPTY);
    if (iconTime === Texture.EMPTY) {
        Assets.load('src/assets/png/retina/ui/hud/icon_time.png')
            .then(setIcon);
    }

    useTick(() => {
        if (world.state.timeRemaining != timeRemaining)
            setTimeRemaining(world.state.timeRemaining)
    });

    return (
        <pixiContainer
            zIndex={10}
            anchor={0.5}
            x={700}
            y={32}>
            <pixiSprite
                anchor={0.5}
                position={{ x: 0, y: 0 }}
                ref={spriteRef}
                eventMode="static"
                width={96}
                height={32}
                texture={frameTexture}
            />
            <pixiSprite
                anchor={0.5}
                position={{ x: -30, y: 0 }}
                width={17}
                height={17}
                texture={iconTime}/>
            <pixiText
                position={{ x: -15, y: -10 }}
                style={{ fontSize: 16, fill: "white", align: "center" }}
                text={formatTime(timeRemaining)}/>

        </pixiContainer>
    );
}

function formatTime(totalSeconds: number): string {
    const m = Math.floor(totalSeconds / 60);
    const s = Math.floor(totalSeconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
}