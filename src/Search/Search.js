import './Search.css';

function Search (props) {
    const { handleSearch, handleReset } = props;
    return (
        <div>
            <h3>Search for an album:</h3>
            <input id="search-input" type="text" onChange={handleSearch}></input>
            <button id="search-button" onClick={handleReset}>Reset</button>
        </div>
    )
}

export default Search;