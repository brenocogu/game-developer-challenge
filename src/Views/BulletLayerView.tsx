// pixi/BulletLayer.tsx
import {useRef, useState} from 'react';
import {useTick} from '@pixi/react';
import {Assets, Sprite, Texture} from "pixi.js";
import type {WorldModel} from "../Models/World/WorldModel.ts";

interface Props {
    world: WorldModel;
}

export function BulletLayerView({ world }: Props) {
    const containerRef = useRef(null);

    const [texture, setTexture] = useState(Texture.EMPTY)
    if (texture === Texture.EMPTY) {
        Assets
            .load('src/assets/png/retina/ship_parts/cannon_ball.png')
            .then((result) => {
                setTexture(result)
            });
    }
    
    useTick(() => {
        const container = containerRef.current;
        if (!container) return;

        const bullets = world.state.bullets;

        while (container.children.length < bullets.length) {
            const sprite = new Sprite(texture);
            sprite.anchor.set(0.5);
            container.addChild(sprite);
        }

        while (container.children.length > bullets.length) {
            const child = container.children[container.children.length - 1];
            container.removeChild(child);
            child.destroy();
        }

        for (let i = 0; i < bullets.length; i++) {
            const sprite = container.children[i];
            const b = bullets[i];
            sprite.x = b.position.x;
            sprite.y = b.position.y;
            sprite.rotation = b.rotation;
        }
    });

    return <pixiContainer 
        ref={containerRef} 
        zIndex={3}/>;
}