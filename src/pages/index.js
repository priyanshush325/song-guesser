import { useState, useEffect } from 'react';

import Image from "next/image";
import localFont from "next/font/local";

import { IoPersonSharp } from "react-icons/io5";

import SongInfo from "../components/SongInfo";
import Prompt from "../components/Prompt";
import Search from "../components/Search";
import Guesses from "../components/Guesses";
import {HoverInfo} from "../components/Guesses";


export default function Home() {

  const [guesses, setGuesses]  = useState([null, null, null, null, null]);
  const [currentGuess, setCurrentGuess] = useState(0);
  const [artist, setArtist] = useState(null);
  const [genre, setGenre] = useState(null);
  const [album, setAlbum] = useState(null);
  const [showIntro, setShowIntro] = useState(true);

  const addGuess = (guess) => {
    if (currentGuess > 4) {
        return;
    }
    const updatedGuesses = guesses.map((g, index) => 
        index === currentGuess ? guess : g
    );
    setGuesses(updatedGuesses);
    setCurrentGuess(currentGuess + 1);

    if (guess.correctArtist) {
        setArtist(guess.artist);
    }

    if (guess.correctGenre) {
        setGenre(guess.genre);
    }

    if (guess.correctAlbum) {
        setAlbum(guess.album);
    }
  };

  useEffect(() => {
    if (showIntro) {
      document.getElementById("intro-modal").showModal();
    }
  }, [showIntro]);

  const currentDate = new Date();


  return (
    <div className = "flex flex-col items-center justify-center w-screen min-h-screen text-white p-4 gap-6">
      <dialog id="intro-modal" className="modal text-black">
          <div className="modal-box flex flex-col justify-center items-center gap-3 overflow-hidden">
              <h1 className = "font-bold text-3xl">Song Guesser </h1>
              <p className = "text-lg text-center">Guess a song based on an emoji prompt in 5 guesses</p>
              <h3 className = "font-bold text-lg hidden sm:block">Scoring System:</h3>
              <div className = "translate-x-[6.5rem] translate-y-[18rem]">
                <HoverInfo guessInfo = {{correctArtist: true, correctGenre: true}}/>
              </div>
              <form method = "dialog" className = "w-full sm:mt-6 flex justify-center">
                <button className="btn btn-success text-white w-3/5" onClick = {() => setShowIntro(false)}>Start <span className = "text-sm italic font-normal"> - {currentDate.toLocaleDateString()}</span></button>
              </form>
          </div>
      </dialog>
      <SongInfo artist = {artist} genre = {genre} album = {album}/>
      <div className = "w-full md:w-4/5 flex flex-col items-center md:px-20">
        <Prompt promptText = "🥭 ❤️ 🙂‍↕️"/>
      </div>
      <div className = "w-full md:w-4/5 flex flex-col items-center md:px-20">
        <Search addGuess = {addGuess}/>
      </div>
      <Guesses guesses = {guesses}/>
    </div>
  );
}

