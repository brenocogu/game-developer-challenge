import heroImg from '../../assets/png/retina/ui/menu/title_pirate_battle.png'
import boatImage from '../../assets/png/default/ships/ship_8.png'
import GenericButton from "../GenericUI/GenericButton.tsx";
interface Props{
    sceneChangeHandler: Function
}
function MainMenuStage({ sceneChangeHandler }: Props) {

    return (
        <>
            <section id="center">
                <div className="hero">
                    <img src={heroImg} className="base" alt="" />
                    <p>SET SAIL. TAKE COMMAND</p>
                </div>
                <div>
                    <GenericButton clickCallback={() => sceneChangeHandler("game")} buttonText={"Play"} />
                    <br />
                    <GenericButton clickCallback={() => sceneChangeHandler("options")} buttonText={"Options"} />
                    <br />
                    <img src={boatImage} />
                    <br />
                    <p>Navigate the islands. Survive the battle</p>
                    <br />
                    <GenericButton clickCallback={() => sceneChangeHandler("ranking")} buttonText={"Ranking"} />
                    <GenericButton clickCallback={() => sceneChangeHandler("history")} buttonText={"History"} />
                </div>
            </section>

            <div className="ticks"></div>
        </>
    )
}

export default MainMenuStage
