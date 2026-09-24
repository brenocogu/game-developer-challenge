import { Assets, Texture, Text} from 'pixi.js';
import { useRef, useState } from 'react';
import { useTick, extend } from '@pixi/react';
import type {WorldModel} from "../../../Models/World/WorldModel.ts";
import {PlayerInputHUDButton} from "./Generic/PlayerInputHUDButton.tsx";

extend({Text})
interface Props {
    world: WorldModel
}

export function PlayerInputHUD({ world }: Props) {
    function handleForwardStateButton(pressing: boolean){
        world.input.thrust = pressing;
    }

    function handleTurnLeftStateButton(pressing: boolean){
        world.input.turnDirection = (pressing) ? -1 : 0;
    }

    function handleTurnRightStateButton(pressing: boolean){
        world.input.turnDirection = (pressing) ? 1 : 0;
    }

    function handleFireFrontButton(pressing: boolean){
        world.input.firing = pressing;
    }

    function handleFireBurstLeftButton(pressing: boolean){
        world.input.fireLeftBurst = pressing;
    }

    function handleFireBurstRightButton(pressing: boolean){
        world.input.fireRightBurst = pressing;
    }
    
    return (
        <>
            <pixiContainer
                x={50}
                y={500}>
                <PlayerInputHUDButton iconOverlay={"icon_turn_left.png"} onButtonInteraction={handleTurnLeftStateButton} />
            </pixiContainer>
            <pixiContainer
                x={114}
                y={470}>
                <PlayerInputHUDButton iconOverlay={"icon_forward.png"}  onButtonInteraction={handleForwardStateButton} />
            </pixiContainer>
            <pixiContainer
                x={174}
                y={500}
                scale={{x: -1, y: 1}}>
                <PlayerInputHUDButton iconOverlay={"icon_turn_left.png"}  onButtonInteraction={handleTurnRightStateButton} />
            </pixiContainer>

            <pixiContainer
                x={602}
                y={500}>
                <PlayerInputHUDButton iconOverlay={"icon_fire_left.png"} onButtonInteraction={handleFireBurstLeftButton} />
            </pixiContainer>
            <pixiContainer
                x={668}
                y={470}>
                <PlayerInputHUDButton iconOverlay={"icon_fire_front.png"}  onButtonInteraction={handleFireFrontButton} />
            </pixiContainer>
            <pixiContainer
                x={732}
                y={500}
                scale={{x: -1, y: 1}}>
                <PlayerInputHUDButton iconOverlay={"icon_fire_left.png"}  onButtonInteraction={handleFireBurstRightButton} />
            </pixiContainer>
        </>
    );
}