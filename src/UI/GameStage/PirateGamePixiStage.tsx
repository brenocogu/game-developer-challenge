import { useTick, extend} from "@pixi/react";
import {Assets, Texture, Ticker, TilingSprite} from "pixi.js";
import { PlayerPawnView } from "../../Views/PlayerPawnView.tsx";
import {BulletLayerView} from "../../Views/BulletLayerView.tsx";
import {useState} from "react";
import {EnemyLayerView} from "../../Views/EnemyLayerView.tsx";

extend({TilingSprite});
function PirateGamePixiStage({ world }) {
    
    const [texture, setTexture] = useState(Texture.EMPTY)
    if (texture === Texture.EMPTY) {
        Assets
            .load('src/assets/tilesheet/water.png')
            .then((result) => {
                setTexture(result)
            });
    }
    
    const tick = (ticker: Ticker) => world.update(ticker.deltaMS / 1000);
    useTick(tick);
    return (
        <>
            <pixiTilingSprite texture={texture} width={800} height={600} />
            <PlayerPawnView world={world} />
            <BulletLayerView world={world} />
            <EnemyLayerView world={world} />
        </>
    );
}

export default PirateGamePixiStage;