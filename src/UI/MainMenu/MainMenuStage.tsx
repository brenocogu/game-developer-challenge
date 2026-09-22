import heroImg from '../../assets/png/retina/ui/menu/title_pirate_battle.png'
import boatImage from '../../assets/png/default/ships/ship_8.png'
import GenericButton from "../GenericUI/GenericButton.tsx";

function MainMenuStage({ sceneChangeHandler }) {

    return (
        <>
            <section id="center">
                <div className="hero">
                    <img src={heroImg} className="base" alt="" />
                    <p>SET SAIL. TAKE COMMAND</p>
                </div>
                <div>
                    <GenericButton clickCallback={() => sceneChangeHandler("game")} />
                    <br />
                    <GenericButton clickCallback={() => sceneChangeHandler("options")}  />
                    <br />
                    <img src={boatImage} />
                    <br />
                    <p>Navigate the islands. Survive the battle</p>
                    <br />
                    <GenericButton clickCallback={() => sceneChangeHandler("ranking")} />
                    <GenericButton clickCallback={() => sceneChangeHandler("history")} />
                </div>
            </section>

            <div className="ticks"></div>
        </>
    )
}

export default MainMenuStage
