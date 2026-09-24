import { Assets, Texture, Text} from 'pixi.js';
import { useRef, useState } from 'react';
import { useTick, extend } from '@pixi/react';
import type {WorldModel} from "../../../Models/World/WorldModel.ts";

extend({Text})
interface Props {
    world: WorldModel
}

export function PauseButton({ world }: Props) {
    const [timeRemaining, setTimeRemaining] = useState(0);
    const spriteRef = useRef<any>(null);

    const [frameTexture, setTexture] = useState(Texture.EMPTY);
    if (frameTexture === Texture.EMPTY) {
        Assets.load('/assets/png/retina/ui/hud/counter_panel.png')
            .then(setTexture);
    }

    const [iconPause, setIcon] = useState(Texture.EMPTY);
    if (iconPause === Texture.EMPTY) {
        Assets.load('/assets/png/retina/ui/controls/icon_pause.png')
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
            x={775}
            y={32}
            eventMode={"static"}
            onClick={() => world.performPause()}>
            <pixiSprite
                anchor={0.5}
                position={{ x: 0, y: 0 }}
                ref={spriteRef}
                eventMode="static"
                width={32}
                height={32}
                texture={frameTexture}
            />
            <pixiSprite
                anchor={0.5}
                position={{ x: 0, y: 0 }}
                width={17}
                height={17}
                texture={iconPause}/>

        </pixiContainer>
    );
}