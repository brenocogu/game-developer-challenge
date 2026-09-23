import GenericButton from "../GenericUI/GenericButton.tsx";
import './options-popup.css';
import {GameEndReason, type GameResultsData} from "../../Models/GameRules.ts";

interface Props{
    sceneChangeHandler: Function,
    restartGameHandler: Function,
    results: GameResultsData
}
function ResultsPopUp({ sceneChangeHandler, restartGameHandler, results }: Props) {
    const title: string = (results.gameEndReason == GameEndReason.GAME_WON) ? "BATTLE COMPLETE" : "Better luck next time";
    const endReason: string = (results.gameEndReason == GameEndReason.GAME_WON) ? "TIMES UP" : "GAME OVER";
    return (
        <>
            <section id="center-popup">
                <div>
                    <h2>{title}</h2>
                    <br />
                    <p>Points • {results.totalPoints} • {endReason}</p>
                </div>
                <div>
                    <GenericButton clickCallback={() => restartGameHandler()} buttonText={"Play Again"}  />
                    <br />
                    <GenericButton clickCallback={() => sceneChangeHandler("menu")}  buttonText={"Main Menu"} />
                </div>
            </section>

            <div className="ticks"></div>
        </>
    )
}

export default ResultsPopUp
