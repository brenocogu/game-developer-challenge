import GenericButton from "../GenericUI/GenericButton.tsx";
import './options-popup.css';

interface Props{
    sceneChangeHandler: Function
}
function OptionsPopUp({ sceneChangeHandler }: Props) {

    return (
        <>
            <section id="center-popup">
                <div>
                    <h1>Options</h1>
                </div>
                <div>
                    <p>Game Session Time</p>
                    <br />
                    <GenericButton clickCallback={() => sceneChangeHandler("options")} buttonText={"Play"} />
                    <p> 120</p>
                    <GenericButton clickCallback={() => sceneChangeHandler("options")} buttonText={"Play"} />
                    <br />
                    <br />
                    <br />
                    <br />
                    <GenericButton clickCallback={() => sceneChangeHandler("history")}buttonText={"Play"} />
                </div>
            </section>

            <div className="ticks"></div>
        </>
    )
}

export default OptionsPopUp
