import './Search.css';

function Search (props) {
    const { handleChange, handleReset } = props;
    return (
        <div>
            <h3>Search for an album:</h3>
            <input id="search-input" type="text" onChange={handleChange}></input>
            <button onClick={handleReset}>Reset</button>
        </div>
    )
}

export default Search;