import './Results.css';
import NoResults from './NoResults';
import { getReadableConditionName, getAlbumColor } from './../utils';
import PropTypes from 'prop-types';

function Results (props) {
    const { albums, handleAlbumClick, pageNumbers, handlePageClick } = props;
    const{ length: pageNumbersLength } = pageNumbers;
    const renderPageNumbers = pageNumbers.map((pageNumber) => {
            if(pageNumbersLength !== pageNumber) {
                return <span className="page-number" onClick={() => handlePageClick(pageNumber)} key={pageNumber}>Page {pageNumber} | </span>
            }
        return <span className="page-number" onClick={() => handlePageClick(pageNumber)} key={pageNumber}>Page {pageNumber}</span>;
    });
    // For testing null state - make albums above let and uncomment assignment below
    // albums = undefined;
    return (
        <div>
            <h3>Album Results:</h3>
            <p>Click on an album result to open its editing pane.</p>

            <div id="album-container">
                {
                    albums && albums.length > 0 ? albums.map(album => {
                        return (
                            <div key={album.album_title.toString()} className={`album ${getAlbumColor(album.condition)}`} onClick={() => { handleAlbumClick(album) }}>
                                <p>Artist Name: { album.artist.name }</p>
                                <p>Album Title: { album.album_title }</p>
                                <p>Year: { album.year }</p>
                                <p>Record Condition: { getReadableConditionName(album.condition) }</p>
                            </div>
                        )
                    }) :
                    <NoResults />
                }
            </div>
            {/* If in active search, remove pagination */}
            { props.isInActiveSearch ? null : 
                (
                    renderPageNumbers
                )
            }
        </div>
    )
}

Results.propTypes = {
    albums: PropTypes.array,
    handleAlbumClick: PropTypes.func,
    pageNumbers: PropTypes.array,
    handlePageClick: PropTypes.func
}

export default Results;