import {Application, extend} from "@pixi/react";
import {
    Container,
    Graphics,
    Sprite,
} from 'pixi.js';
import {WorldModel} from "../../Models/World/WorldModel.ts";
import {useMemo} from "react";
import PirateGamePixiStage from "./PirateGamePixiStage.tsx";

extend({
    Container,
    Graphics,
    Sprite,
});

function GameStage({ sceneChangeHandler }) {
    let worldModel = useMemo(() => new WorldModel(800,600), []);
    return (
        <Application>
            <PirateGamePixiStage world={worldModel} />
        </Application>
    )
}

export default GameStage
