import { Assets, Texture} from 'pixi.js';
import { useRef, useState } from 'react';

interface Props {
    iconOverlay: string,
    onButtonInteraction: (pressed: boolean) => void,
}

export function PlayerInputHUDButton (
    { 
        iconOverlay, 
        onButtonInteraction,
    }: Props) {
    
    const spriteRef = useRef<any>(null);

    const [frameTexture, setTexture] = useState(Texture.EMPTY);
    if (frameTexture === Texture.EMPTY) {
        Assets.load('/assets/png/retina/ui/controls/button_round_normal.png')
            .then(setTexture);
    }

    const [icon, setIcon] = useState(Texture.EMPTY);
    if (icon === Texture.EMPTY) {
        Assets.load('/assets/png/retina/ui/controls/' + iconOverlay)
            .then(setIcon);
    }

    return (
        <pixiContainer
            zIndex={10}
            anchor={0.5}
            eventMode={"static"}
            onMouseUp={() => onButtonInteraction(false)}
            onMouseDown={() => onButtonInteraction(true)}>
            <pixiSprite
                anchor={0.5}
                ref={spriteRef}
                eventMode="static"
                width={64}
                height={64}
                texture={frameTexture}
            />
            <pixiSprite
                anchor={0.5}
                width={45}
                height={45}
                texture={icon}/>

        </pixiContainer>
    );
}