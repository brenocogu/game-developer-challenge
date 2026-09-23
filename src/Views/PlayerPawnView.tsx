import {
    Assets, type Sprite,
    Texture,
} from 'pixi.js';
import {
    useRef,
    useState,
} from 'react';

import {useTick} from "@pixi/react";
import type {WorldModel} from "../Models/World/WorldModel.ts";

interface Props {
    world: WorldModel;
}

export function PlayerPawnView({ world }: Props) {
    const spriteRef = useRef<Sprite>(null)

    const [texture, setTexture] = useState(Texture.EMPTY)
    if (texture === Texture.EMPTY) {
        Assets
            .load('src/assets/png/default/ships/ship_1.png')
            .then((result) => {
                setTexture(result)
            });
    }
    
    const tick = () => {
        if (!spriteRef.current) return;
        spriteRef.current.rotation = world.state.player.rotation
        spriteRef.current.x = world.state.player.position.x;
        spriteRef.current.y = world.state.player.position.y;
    };
    useTick(tick);

    return (
        <pixiSprite
            zIndex={4}
            ref={spriteRef}
            anchor={0.5}
            eventMode={'static'}
            width={world.state.player.width}
            height={world.state.player.height}
            texture={texture}/>
    );
}
