import '../options-popup.css';

interface Props{
    label: string,
    value: number,
    onValueChange: (delta: number) => void;
}
function OptionChangeDualButton({ label, value, onValueChange }: Props) {
    
    return (
        <>
            <div>
                <p>{label}</p>
                <div className={"flex-display"}>
                    <button className={"delta-button"} onClick={() => onValueChange(-1)}><b>-</b></button>
                    <p>{value + "s"}</p>
                    <button className={"delta-button"} onClick={() => onValueChange(1)}><b>+</b></button>
                </div>
            </div>
        </>
    )
}

export default OptionChangeDualButton;