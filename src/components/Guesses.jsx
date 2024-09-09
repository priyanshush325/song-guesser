import {useState, useEffect} from 'react';
import ReactHover, { Trigger, Hover } from 'react-hover';
import { FaRegCheckCircle } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";

const HoverInfo = ({guessInfo}) => {
    const [showHoverInfo, setShowHoverInfo] = useState(true);

    return (
        <div className="stats stats-vertical shadow translate-x-[-6.5rem] translate-y-[-18rem] bg-neutral-200 border border-neutral-300 hidden md:flex md:flex-col">
            <div className={"stat"}>
                <div className={`stat-value text-sm flex flex-row items-center gap-1 ${guessInfo.correctGenre ? "text-success" : "text-error"}`}>
                    {guessInfo.correctGenre ? <FaRegCheckCircle className="text-success" size={16} /> : <IoCloseCircleOutline className="text-error" size={20} />}
                    {guessInfo.correctGenre ? "Correct Genre" : "Incorrect Genre"}
                </div>
            </div>

            <div className="stat">
                <div className={`stat-value text-sm flex flex-row items-center gap-1 ${guessInfo.correctArtist ? "text-success" : "text-error"}`}>
                    {guessInfo.correctArtist ? <FaRegCheckCircle className="text-success" size={16} /> : <IoCloseCircleOutline className="text-error" size={20} />}
                    {guessInfo.correctArtist ? "Correct Artist" : "Incorrect Artist"}
                </div>
            </div>

            <div className="stat">
                <div className={`stat-value text-sm flex flex-row items-center gap-1 ${guessInfo.correctAlbum ? "text-success" : "text-error"}`}>
                    {guessInfo.correctAlbum ? <FaRegCheckCircle className="text-success" size={16} /> : <IoCloseCircleOutline className="text-error" size={20} />}
                    {guessInfo.correctAlbum ? "Correct Album" : "Incorrect Album"}
                </div>
            </div>

            <div className="stat">
                <div className={`stat-value text-sm flex flex-row items-center gap-1 ${guessInfo.correctTitle ? "text-success" : "text-error"}`}>
                    {guessInfo.correctTitle ? <FaRegCheckCircle className="text-success" size={16} /> : <IoCloseCircleOutline className="text-error" size={20} />}
                    {guessInfo.correctTitle ? "Correct Track" : "Incorrect Track"}
                </div>
            </div>
        </div>
    )
}

const Guess = ({ guess }) => {
    const [score, setScore] = useState(0);

    const hoverOptions = {
        followCursor: false,
    };

    // Animate the progress bar filling up
    useEffect(() => {
        const intervalId = setInterval(() => {
            setScore(prevScore => Math.min(prevScore + 1, guess?.score || 0));
        }, 1);

        return () => clearInterval(intervalId);
    }, [guess?.score]);

    let strokeColor = 'lightgreen';

    if (score <= 75) {
        strokeColor = 'yellow';
    }
    if (score <= 50) {
        strokeColor = 'orange';
    }
    if (score <= 25) {
        strokeColor = 'red';
    }

    // Custom circular progress indicator
    const CircleProgress = ({ value, color }) => {
        const radius = 18;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (value / 100) * circumference;

        return (
            <svg width="40" height="40">
                <circle
                    cx="20"
                    cy="20"
                    r={radius}
                    stroke="rgba(128,128,128,0.3)"
                    strokeWidth="4"
                    fill="transparent"
                />
                <circle
                    cx="20"
                    cy="20"
                    r={radius}
                    stroke={color}
                    strokeWidth="4"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    transform="rotate(-90 20 20)"
                />
            </svg>
        );
    };

    if (guess) {
        return (
            <div className="w-full rounded-3xl h-16 bg-black bg-opacity-50 flex flex-row items-center justify-between px-5 sm:h-20">
                <div className="flex flex-col items-start justify-center">
                    <div className="text-white font-bold text-sm sm:text-lg">{guess.title}</div>
                    <div className="text-xs text-white sm:text-md">{guess.artist}</div>
                </div>
                <div className="h-full flex flex-col items-center justify-center w-12 md:w-16">
                    <CircleProgress value={score} color={strokeColor} />
                </div>
            </div>
        );
    } else {
        return (
            <div className="w-full rounded-3xl h-16 bg-black bg-opacity-5 sm:h-20"></div>
        );
    }
};

const Guesses = ({guesses}) => {
    return (
        <div className="flex flex-col items-center gap-4 w-full py-2 box-border md:px-20 md:w-4/5">
            {guesses.map((guess, index) => (
                <Guess key = {index} guess = {guess}/>
            ))}
        </div>
    )
}

export default Guesses;
export {HoverInfo};