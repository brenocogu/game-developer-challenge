import {
    Assets,
    Texture, Ticker,
} from 'pixi.js';
import {
    useRef,
    useState,
} from 'react';

import {useTick} from "@pixi/react";

export function PlayerPawnView({ world }) {
    const spriteRef = useRef(null)

    const [texture, setTexture] = useState(Texture.EMPTY)
    if (texture === Texture.EMPTY) {
        Assets
            .load('src/assets/png/default/ships/ship_1.png')
            .then((result) => {
                setTexture(result)
            });
    }
    
    const tick = () => {
        spriteRef.current.rotation = world.state.player.rotation
        spriteRef.current.x = world.state.player.position.x;
        spriteRef.current.y = world.state.player.position.y;
    };
    useTick(tick);

    return (
        <pixiSprite
            ref={spriteRef}
            anchor={0.5}
            eventMode={'static'}
            width={33}
            height={57}
            texture={texture}
            x={world.state.player.position.x}
            y={world.state.player.position.y}/>
    );
}
