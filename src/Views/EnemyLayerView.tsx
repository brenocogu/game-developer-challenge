import {useRef, useState} from 'react';
import {useTick} from '@pixi/react';
import {Assets, type Container, Sprite, Texture} from "pixi.js";
import type {WorldModel} from "../Models/World/WorldModel.ts";
import type {Enemy} from "../Models/GameObjects.ts";
import { EnemyHealthBarView } from "./GameHUD/EnemyHealthBarView.tsx";

interface Props {
    world: WorldModel;
}

export function EnemyLayerView({ world }: Props) {
    const enemyContainerRef = useRef<Container<any>>(null);
    const [enemyIds, setEnemyIds] = useState<number[]>(() =>
        world.state.enemies.map(e => e.enemyUID)
    );
    
    const [texture, setTexture] = useState(Texture.EMPTY)
    if (texture === Texture.EMPTY) {
        Assets
            .load('src/assets/png/default/ships/ship_14.png')
            .then((result) => {
                setTexture(result)
            });
    }

    useTick(() => {
        const container = enemyContainerRef.current;
        if (!container) return;

        const enemies = world.state.enemies;

        while (container.children.length < enemies.length) {
            const sprite = new Sprite(texture);
            sprite.anchor.set(0.5);
            sprite.setSize(33,57);
            container.addChild(sprite);
        }

        while (container.children.length > enemies.length) {
            const child = container.children[container.children.length - 1];
            container.removeChild(child);
            child.destroy();
        }

        for (let i = 0; i < enemies.length; i++) {
            const sprite: Sprite = container.children[i];
            const enemy: Enemy = enemies[i];
            sprite.width = enemy.width;
            sprite.height = enemy.height;
            sprite.x = enemy.position.x;
            sprite.y = enemy.position.y;
            sprite.rotation = enemy.rotation;
        }

        const ids = enemies.map(e => e.enemyUID);
        if (ids.length !== enemyIds.length || ids.some((id, i) => id !== enemyIds[i])) {
            setEnemyIds(ids);
        }

    });

    return <>
        <pixiContainer ref={enemyContainerRef} zIndex={3} />
        <pixiContainer>
            {enemyIds.map(id => {
                const enemy = world.state.enemies.find(e => e.enemyUID === id);
                if (!enemy) return null;
                return (
                    <EnemyHealthBarView
                        key={`hp-${id}`}
                        attachedShip={enemy}
                        targetSize={{ x: 70, y: 10 }}
                    />
                );
            })}
        </pixiContainer>
    </>;
}