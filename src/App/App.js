import { useEffect, useState } from 'react';
import Search from './../Search/Search';
import Results from './../Results/Results';
import EditAlbum from './../EditAlbum/EditAlbum';
import { getAlbumData } from './../utils';
import { MAX_ALBUMS_PER_PAGE, ALBUM_FIELDS } from './../constants';
// lightweight fuzzy-search library
import Fuse from 'fuse.js'
import './App.css';


const options = {
  threshold: 0.0, // strict threshold
  isCaseSensitive: false,
  keys: [
    "album_title",
    "year",
    "condition",
    "artist.name",
    "artist.id"
  ]
};

function App() {
  // setup react state hooks
  const [albums, setAlbums] = useState([]);
  const [currentAlbums, setCurrentAlbums] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentlySelectedAlbum, setCurrentlySelectedAlbum] = useState(null);
  const [isInActiveSearch, setIsInActiveSearch] = useState(false);

  function handleChange(e) {
    setIsInActiveSearch(true);
    e.preventDefault();
    const fuse = new Fuse(albums, options);
    const pattern = e.target.value;
    const searchResults = fuse.search(pattern);
    const formattedResults = searchResults.map(searchResult => {
      return {
        ...searchResult.item
      }
    });

    setCurrentAlbums(formattedResults);
  }

  function handleReset() {
    const searchInput = document.getElementById('search-input');
    if(searchInput) searchInput.value = '';
    setCurrentAlbums(albums);
    setIsInActiveSearch(false);
  }

  function handlePageClick(e) {
    setCurrentPage(e);

    const indexOfLastAlbum = e * MAX_ALBUMS_PER_PAGE;
    const indexOfFirstAlbum = indexOfLastAlbum - MAX_ALBUMS_PER_PAGE;
    const currentAlbums = albums.slice(indexOfFirstAlbum, indexOfLastAlbum);
    setCurrentAlbums(currentAlbums);
  }

  function handleAlbumClick(album) {
    setCurrentlySelectedAlbum(album);
    const editAlbumPane = document.getElementsByClassName('edit-album-pane')[0];
    if (editAlbumPane) {
        editAlbumPane.className = 'edit-album-pane expanded';
    }
  }

  function updateAlbum(fieldType, e, album) {
    const inputText = e.target.value;
    const { album_title: albumTitle } = album;
    const albumsCopy = [...albums];
    const albumToUpdate = albumsCopy.find(album => album.album_title === albumTitle);

    switch(fieldType) {
      case ALBUM_FIELDS.NAME:
        const artistId = album.artist.id;
        const artistAlbums = albumsCopy.filter(album => album.artist.id === artistId);
        artistAlbums.forEach(album => {
          album.artist.name = inputText;
        });
        break;
      case ALBUM_FIELDS.TITLE:
        albumToUpdate.album_title = inputText;
        break;
      case ALBUM_FIELDS.YEAR:
        albumToUpdate.year = inputText;
        break;
      case ALBUM_FIELDS.CONDITION:
        albumToUpdate.condition = inputText;
        break;
      default:
        break;
    }

    setAlbums(albumsCopy);
  }


  useEffect(() => {
    getAlbumData().then(albums => {
      setAlbums(albums)

      const indexOfLastAlbum = currentPage * MAX_ALBUMS_PER_PAGE;
      const indexOfFirstAlbum = indexOfLastAlbum - MAX_ALBUMS_PER_PAGE;
      const currentAlbums = albums.slice(indexOfFirstAlbum, indexOfLastAlbum);
      setCurrentAlbums(currentAlbums);
    })
  }, [currentPage]);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(albums.length / MAX_ALBUMS_PER_PAGE); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="app">
      <h1>Greg's Album Manager</h1>
      <EditAlbum album={currentlySelectedAlbum} updateAlbum={updateAlbum}/>
      <Search handleChange={handleChange} handleReset={handleReset}/>
      <Results isInActiveSearch={isInActiveSearch} pageNumbers={pageNumbers} handlePageClick={handlePageClick} albums={currentAlbums} currentPage={currentPage} handleAlbumClick={handleAlbumClick}/>
    </div>
  );
}

export default App;
