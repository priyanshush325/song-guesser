import {useState, useEffect} from 'react';


const Search = ({addGuess}) => {
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("/api/search?query=" + search)
        .then(response => response.json())
        .then(data => {
            setSearchResults(data["results"]["trackmatches"]["track"]);
            document.getElementById("search-results-modal").showModal();
        })
    }

    const makeGuess = (title, artist) => {
        fetch("/api/guess?artist=" + artist + "&title=" + title + "&date=" + new Date().toLocaleDateString().split('T')[0])
        .then(response => response.json())
        .then(data => {
            addGuess(data);
        })

        document.getElementById("search-results-modal").close();
    }

    useEffect(() => {
        console.log(searchResults);
    }, [searchResults]);

    return (
        <>
            <label className="input input-bordered flex items-center gap-2 w-full rounded-xl bg-neutral-200" onChange = {handleChange} onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}>
                <input type="text" className="grow text-black" placeholder="Guess a Song... "/>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="black"
                    className="h-4 w-4 opacity-70">
                    <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd" />
                </svg>
            </label>

            <dialog id="search-results-modal" className="modal text-black">
                <div className="modal-box h-[70vh] flex flex-col justify-center items-center">
                    <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className = "flex flex-col h-4/5 overflow-y-auto gap-6 content-center items-center">
                        {searchResults.map((result, index) => (
                                <div className="card bg-base-100 image-full w-full">
                                <figure className = "bg-neutral-300">
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title text-white">{result.name}</h2>
                                    <p className = "text-white">{result.artist}</p>
                                    <div className="card-actions justify-end">
                                    <button className="btn btn-success text-white" onClick = {() => makeGuess(result.name, result.artist)}>Guess This Song</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </dialog>
        </>
    );
}

export default Search;