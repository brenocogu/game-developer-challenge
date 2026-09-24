import GenericButton from "../GenericUI/GenericButton.tsx";
import './options-popup.css';
import {type GameSettings, loadSettings, saveSettings} from "../../Models/GameSettings.ts";
import {useState} from "react";
import OptionChangeDualButton from "./Generic/OptionChangeDualButton.tsx";

interface Props{
    sceneChangeHandler: Function
}
function OptionsPopUp({ sceneChangeHandler }: Props) {
    const [settings, setSettings] = useState<GameSettings>(loadSettings);
    const [matchDuration, setMatchDuration] = useState(settings.matchDuration);
    const [enemySpawn, setEnemySpawn] = useState(settings.enemySpawnRate);

    function updateMatchTime(delta: number){
        let duration = settings.matchDuration;
        duration += delta * 5;
        duration = (duration > 180) ? 180 : (duration < 60) ? 60 : duration;
        settings.matchDuration = duration;
        
        setMatchDuration(duration);
        setSettings(settings);
        saveSettings(settings);
    }

    function updateEnemySpawnRate(delta: number){
        let spawnRate = settings.enemySpawnRate;
        spawnRate += delta;
        spawnRate = (spawnRate < 0.2) ? 0.2 : spawnRate;
        settings.enemySpawnRate = spawnRate;
        
        setEnemySpawn(spawnRate);
        setSettings(settings);
        saveSettings(settings);
    }
    
    return (
        <>
            <section id="center-popup">
                <div>
                    <h1>Options</h1>
                </div>
                <div>
                    <p>Game Session Time</p>
                    <br />
                    <OptionChangeDualButton onValueChange={updateMatchTime} label={"Match Time"} value={matchDuration} />
                    <br />
                    <OptionChangeDualButton onValueChange={updateEnemySpawnRate} label={"Enemy Spawn Rate"} value={enemySpawn} />
                    <br />
                    <br />
                    <br />
                    <GenericButton clickCallback={() => sceneChangeHandler("menu")} buttonText={"Main menu"} />
                </div>
            </section>

            <div className="ticks"></div>
        </>
    )
}

export default OptionsPopUp
