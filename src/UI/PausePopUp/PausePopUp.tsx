
import GenericButton from "../GenericUI/GenericButton.tsx";
import './options-popup.css';

interface Props{
    sceneChangeHandler: Function,
    unpauseHandler: Function
}
function PausePopUp({ sceneChangeHandler, unpauseHandler }: Props) {

    return (
        <>
            <section id="center-popup">
                <div>
                    <h1>PAUSED</h1>
                    <p>Ready when you are</p>
                </div>
                <div>
                    <GenericButton clickCallback={() => unpauseHandler()} buttonText={"Resume"}  />
                    <br />
                    {/*<GenericButton clickCallback={() => unpauseHandler()}  buttonText={"Options"} />*/}
                    {/*<br />*/}
                    <GenericButton clickCallback={() => sceneChangeHandler("menu")}  buttonText={"Main Menu"} />
                </div>
            </section>

            <div className="ticks"></div>
        </>
    )
}

export default PausePopUp
