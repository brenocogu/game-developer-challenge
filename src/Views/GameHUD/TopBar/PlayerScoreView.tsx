import { Assets, Texture, Text} from 'pixi.js';
import { useRef, useState } from 'react';
import { useTick, extend } from '@pixi/react';
import type {WorldModel} from "../../../Models/World/WorldModel.ts";

extend({Text})
interface Props {
    world: WorldModel
}

export function PlayerScoreView({ world }: Props) {
    const [score, setScore] = useState(0);
    const spriteRef = useRef<any>(null);

    const [frameTexture, setTexture] = useState(Texture.EMPTY);
    if (frameTexture === Texture.EMPTY) {
        Assets.load('/assets/png/retina/ui/hud/counter_panel.png')
            .then(setTexture);
    }

    const [iconScoreTexture, setIcon] = useState(Texture.EMPTY);
    if (iconScoreTexture === Texture.EMPTY) {
        Assets.load('/assets/png/retina/ui/hud/icon_score.png')
            .then(setIcon);
    }

    useTick(() => {
        if (world.state.score != score)
            setScore(world.state.score)
    });

    return (
        <pixiContainer>
            <pixiSprite
                x={600}
                y={32}
                ref={spriteRef}
                anchor={0.5}
                eventMode="static"
                width={96}
                height={32}
                texture={frameTexture}
            />
            <pixiSprite
                anchor={0.5}
                x={570}
                y={31}
                width={17}
                height={17}
                texture={iconScoreTexture}/>
            <pixiText
                x={580}
                y={22}
                style={{ fontSize: 16, fill: "white", align: "center" }}
                text={score}/>
            
        </pixiContainer>
    );
}
