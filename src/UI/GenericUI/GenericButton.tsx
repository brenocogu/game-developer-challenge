
interface Props{
    clickCallback: Function,
    buttonText: string,
}
function GenericButton({clickCallback, buttonText="Click Me"} : Props) {
    return (
        <button onClick={()=> clickCallback()} className="genericButton">
            { buttonText }
        </button>
    );
}

export default GenericButton;