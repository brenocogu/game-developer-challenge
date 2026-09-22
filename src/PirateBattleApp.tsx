import './App.css'
import MainMenuStage from "./UI/MainMenu/MainMenuStage.tsx";
import GameStage from "./UI/GameStage/GameStage.tsx";
import { useState } from 'react';

function PirateBattleApp() {
  const [gameStage, setGameStage] = useState("menu")
  
  return (
    <>
        {gameStage === "menu" && (<MainMenuStage sceneChangeHandler={(handler) => setGameStage(handler)} />)}
        {gameStage === "game" && (<GameStage sceneChangeHandler={(handler) => setGameStage(handler)} />)}
    </>
  )
}

export default PirateBattleApp
