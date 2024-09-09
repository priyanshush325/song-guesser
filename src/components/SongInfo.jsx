import {useState} from 'react';

import { BsFillQuestionCircleFill } from "react-icons/bs";


const SongInfo = ({artist, genre, album}) => {

    return (
        <div className="flex flex-row items-center gap-2 sm:gap-4 w-screen px-5 py-2 box-border md:px-20">
            <button className = {"text-xs sm:text-base btn " + (artist ? "btn-success" : "btn-disabled")}>
                {artist ? artist : <><BsFillQuestionCircleFill className = "text-md sm:text-xl"/>{`Artist`}</>}
            </button>
            <button className = {"text-xs sm:text-base btn " + (genre ? "btn-success" : "btn-disabled")}>
                {genre ? genre : <><BsFillQuestionCircleFill className = "text-md sm:text-xl"/>{`Genre`}</>}
            </button>
            <button className = {"text-xs sm:text-base btn " + (album ? "btn-success" : "btn-disabled")}>
                {album ? album : <><BsFillQuestionCircleFill className = "text-md sm:text-xl"/>{`Album`}</>}
            </button>
        </div>
    )
}

export default SongInfo;