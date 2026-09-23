import type {WorldModel} from "../../Models/World/WorldModel.ts";
import {HealthBarView} from "./HealthBarView.tsx";
import {PlayerScoreView} from "./TopBar/PlayerScoreView.tsx";
import {PlayerTimeRemaining} from "./TopBar/PlayerTimeRemainingView.tsx";
import {PauseButton} from "./TopBar/PauseButton.tsx";

interface Props {
    world: WorldModel;
}

export function PlayerHUDView({ world }: Props) {
    return (
        <>
            <pixiContainer
                zIndex={10}
                x={140}
                y={32}>
                <HealthBarView attachedShip={world.state.player} targetSize={{x: 180, y: 32}} />
            </pixiContainer>
            
            <pixiContainer
                zIndex={10}>
                <PlayerScoreView world={world} />
                <PlayerTimeRemaining world={world} />
                <PauseButton world={world} />
            </pixiContainer>
        </>
    );
}
