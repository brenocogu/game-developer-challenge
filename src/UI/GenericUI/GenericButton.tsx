function GenericButton({clickCallback}) {
    return (
        <button onClick={clickCallback} className="genericButton">
            Click me
        </button>
    );
}

export default GenericButton;