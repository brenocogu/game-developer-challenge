// pixi/BulletLayer.tsx
import {useEffect, useRef, useState} from 'react';
import {useTick} from '@pixi/react';
import {Assets, Sprite, Texture} from "pixi.js";

interface Props {
    world: World;
}

export function EnemyLayerView({ world }: Props) {
    const containerRef = useRef(null);

    const [texture, setTexture] = useState(Texture.EMPTY)
    if (texture === Texture.EMPTY) {
        Assets
            .load('src/assets/png/default/ships/ship_14.png')
            .then((result) => {
                setTexture(result)
            });
    }

    useTick(() => {
        const container = containerRef.current;
        if (!container) return;

        const enemies = world.state.enemies;

        while (container.children.length < enemies.length) {
            const sprite = new Sprite(texture);
            sprite.anchor.set(0.5);
            container.addChild(sprite);
        }

        while (container.children.length > enemies.length) {
            const child = container.children[container.children.length - 1];
            container.removeChild(child);
            child.destroy();
        }

        for (let i = 0; i < enemies.length; i++) {
            const sprite = container.children[i];
            const enemy = enemies[i];
            sprite.x = enemy.position.x;
            sprite.y = enemy.position.y;
            sprite.rotation = enemy.rotation;
        }
    });

    return <pixiContainer ref={containerRef} />;
}