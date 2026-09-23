import {Application, extend} from "@pixi/react";
import {
    Container,
    Graphics,
    Sprite,
} from 'pixi.js';
import {WorldModel} from "../../Models/World/WorldModel.ts";
import {useEffect, useMemo, useState} from "react";
import PirateGamePixiStage from "./PirateGamePixiStage.tsx";
import PausePopUp from "../PausePopUp/PausePopUp.tsx";

extend({
    Container,
    Graphics,
    Sprite,
});
interface Props{
    sceneChangeHandler: Function
}
function GameStage({ sceneChangeHandler } : Props) {
    const [paused, setPaused] = useState(false);
    //TODO:: Change to UseRef
    const worldModel = useMemo(() => new WorldModel(800,600, setPaused), []);
    
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if(e.code == "KeyA")
                worldModel.input.turnDirection = -1;
            else if(e.code == "KeyD")
                worldModel.input.turnDirection = 1;
            if(e.code == "KeyW")
                worldModel.input.thrust = true;
            if(e.code == "Space")
                worldModel.input.firing = true;
            
            e.preventDefault();
        };
        
        const up = (e: KeyboardEvent) => {
            if(e.code == "KeyA")
                worldModel.input.turnDirection = 0;
            else if(e.code == "KeyD")
                worldModel.input.turnDirection = 0;
            if(e.code == "KeyW")
                worldModel.input.thrust = false;
            if(e.code == "Space")
                worldModel.input.firing = false;
        };

        window.addEventListener('keydown', down);
        window.addEventListener('keyup', up);

        const blur = () => {
            resetInput(worldModel);
            worldModel.performPause();
        };
        window.addEventListener('blur', blur);

        return () => {
            window.removeEventListener('keydown', down);
            window.removeEventListener('keyup', up);
            window.removeEventListener('blur', blur);
        };
    }, [worldModel]);
    
    return (
        <>
            {(paused) && (<PausePopUp sceneChangeHandler={sceneChangeHandler} unpauseHandler={() => worldModel.revertPause()}/>)}
            <Application>
                <PirateGamePixiStage world={worldModel} />
            </Application>
        </>
    )
}


function resetInput(world: WorldModel) {
    world.input.turnDirection = 0;
    world.input.thrust = false;
}


export default GameStage
