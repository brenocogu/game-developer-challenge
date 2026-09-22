import { useTick } from "@pixi/react";
import { Ticker } from "pixi.js";
import { PlayerPawnView } from "../../Views/PlayerPawnView.tsx";

function PirateGamePixiStage({ world }) {

    const tick = (ticker: Ticker) => world.update(ticker.deltaMS / 1000);
    useTick(tick);
    return (
        <>
            <PlayerPawnView world={world} />
        </>
    );
}

export default PirateGamePixiStage;