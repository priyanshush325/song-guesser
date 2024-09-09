import {useState, useEffect} from 'react';
import { IoReload } from "react-icons/io5";
import {TwitterShareButton, TwitterIcon} from 'react-share';
import { BiSolidMessageRounded } from "react-icons/bi";

const GameLose = ({guesses}) =>  {

    const [currentDate, setCurrentDate] = useState('');

    useEffect (() => {
        setCurrentDate (new Date().toLocaleDateString());
    }, []);

    const generateShareMessage = () => {
        let res = "Song Guesser " + currentDate + "\r\n\r\n";

        const icons = {
                 0: "⬜️",
                25: "🟥", 
                50: "🟧", 
                75: "🟨", 
                100: "🟩"
                };

        for (let i = 0; i < guesses.length; i++) {
            if (guesses[i] === null) break;
            res += "Guess " + (i + 1) + ": " + icons[guesses[i].score] + "\r\n";
        }

        res += "\r\n Play along at https://emoji-song-game.vercel.app‼️";

        return res;
    }


    return (
        <div className="flex flex-col items-center gap-4 w-screen px-5 py-2 box-border md:px-20">
            <dialog id="lose-modal" className="modal">
            <div className="modal-box flex flex-col justify-center items-center gap-2">
                <h1 className="font-bold text-3xl text-black">Incorrect!</h1>
                <h3 className = "font-bold text-lg text-red-600">Guesses: 5</h3>
                <button className = "btn btn-error btn-sm flex items-center gap-1 text-white my-5" onClick = {() => {window.location.reload()}}><IoReload className = "text-lg"/> Play Again</button>
                <div className = "flex flex-row justify-center items-center gap-5">
                    <div className = "flex justify-center items-center rounded-full bg-green-400 w-[32px] h-[32px] cursor-pointer" onClick = {() => {window.open("sms://?&body=" + encodeURIComponent(generateShareMessage()), "_blank")}}><BiSolidMessageRounded className = "text-lg text-white"/></div>
                    <TwitterShareButton url = "" title = {generateShareMessage()}> <TwitterIcon size = {32} round /></TwitterShareButton>
                </div>
            </div>
            </dialog>
        </div>
    )
}

export default GameLose;