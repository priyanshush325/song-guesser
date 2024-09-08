const Prompt = ({promptText}) => {

    return (
        <div className = "flex flex-col items-center bg-black bg-opacity-20 justify-center px-5 py-5 rounded-3xl w-full gap-4 md:w-full">
            <div className = "text-black opacity-50 font-bold text-sm md:text-md w-full">Song Prompt:</div>
            <div className = "text-white text-6xl md:text-7xl px-5">{promptText}</div>
        </div>
    )
};

export default Prompt;