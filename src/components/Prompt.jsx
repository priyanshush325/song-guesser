const Prompt = ({promptText}) => {

    return (
        <div className = "flex flex-col items-center bg-black bg-opacity-20 justify-center rounded-3xl p-2 w-full gap:2 sm:gap-4 sm:p-5">
            <div className = "text-black opacity-50 font-bold text-xs px-5 sm:text-md sm:px-0 w-full">Song Prompt:</div>
            <div className = "text-white text-3xl md:text-7xl px-5">{promptText}</div>
        </div>
    )
};

export default Prompt;