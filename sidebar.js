
const InputText = () => {
    const inputRef = useRef(null);
    const onButtonClick = () => {

    inputEl.current.focus();
    };
    return (
    <>
    <input ref={inputEl} type="text" />
    <button onClick={onButtonClick}>Donner le focus au champ</button>
    </>
    );
    }
