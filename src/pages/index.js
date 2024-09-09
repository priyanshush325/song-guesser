import { useState, useEffect } from 'react';

import Image from "next/image";
import localFont from "next/font/local";

import { IoPersonSharp } from "react-icons/io5";

import SongInfo from "../components/SongInfo";
import Prompt from "../components/Prompt";
import Search from "../components/Search";
import Guesses from "../components/Guesses";
import GameWin from "../components/GameWin";
import GameLose from "../components/GameLose";
import {HoverInfo} from "../components/Guesses";

export default function Home() {
  const [guesses, setGuesses] = useState([null, null, null, null, null]);
  const [currentGuess, setCurrentGuess] = useState(0);
  const [artist, setArtist] = useState(null);
  const [genre, setGenre] = useState(null);
  const [album, setAlbum] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  const [prompt, setPrompt] = useState("-");
  const [currentDate, setCurrentDate] = useState('');

  useEffect(
    () => {
      const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

      if (isDarkMode) {
        document.documentElement.classList.remove("dark");
      }

    }, [])

    useEffect(() => {
      if (showIntro) {
        document.getElementById("intro-modal").showModal();
      }
    }, [showIntro]);


  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString());
  }, []);

  const handleGameStart = () => {
    setShowIntro(false);
    setCurrentGuess(0);
    setArtist(null);
    setGenre(null);
    setAlbum(null);

    const date = new Date().toLocaleDateString(); // Use current date
    console.log('Current Date:', date);
    
    try {
      fetch(`/api/prompt?date=${date}`)
        .then((response) => response.json())
        .then((data) => {
          setPrompt(data.prompt);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const addGuess = (guess) => {
    // If the user has already made 5 guesses, do not allow more guesses
    if (currentGuess >= 5) return;

    // Update the guesses array with the new guess
    const updatedGuesses = guesses.map((g, index) => 
        index === currentGuess ? guess : g
    );
    setGuesses(updatedGuesses);

    // Check if the guess is correct
    if (guess.correctArtist) {
        setArtist(guess.artist);
    }
    if (guess.correctGenre) {
        setGenre(guess.genre);
    }
    if (guess.correctAlbum) {
        setAlbum(guess.album);
    }

    // If the guess is perfect (score is 100), handle a win
    if (guess.score === 100) {
        handleGameWin();
        return; // No need to check further if the user wins
    }

    // If this is the last guess (5th guess) and it's not correct, handle a loss
    if (currentGuess === 4 && guess.score < 100) {
        handleGameLose();
        return; // No need to increment `currentGuess` if the game is over
    }
    // Increment the guess counter
    setCurrentGuess(currentGuess + 1);
};


  const handleGameWin = () => {
    document.getElementById("win-modal").showModal();
  }

  const handleGameLose = () => {
    document.getElementById("lose-modal").showModal();
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen text-white p-4 gap-6" data-theme="light">
      <dialog id="intro-modal" className="modal text-black">
        <div className="modal-box flex flex-col justify-center items-center gap-3 overflow-hidden">
          <h1 className="font-bold text-3xl">Song Guesser </h1>
          <p className="text-lg text-center">Guess a song based on an emoji prompt in 5 guesses</p>
          <h3 className="font-bold text-lg hidden sm:block">Scoring System:</h3>
          <div className="translate-x-[6.5rem] translate-y-[18rem]">
            <HoverInfo guessInfo={{ correctArtist: true, correctGenre: true }} />
          </div>
          <form method="dialog" className="w-full sm:mt-6 flex justify-center">
            <button className="btn btn-success text-white w-3/5" onClick={handleGameStart}>Start <span className="text-sm italic font-normal"> - {currentDate}</span></button>
          </form>
        </div>
      </dialog>
      <SongInfo artist={artist} genre={genre} album={album} />
      <div className="w-full md:w-4/5 flex flex-col items-center md:px-20">
        <Prompt promptText={prompt} />
      </div>
      <div className="w-full md:w-4/5 flex flex-col items-center md:px-20">
        <Search addGuess={addGuess} />
      </div>
      <Guesses guesses={guesses} />
      <GameWin guesses = {guesses} currentGuess = {currentGuess}/>
      <GameLose guesses = {guesses}/>
    </div>
  );
}
