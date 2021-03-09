import './EditAlbum.css';
import { ALBUM_FIELDS } from './../constants';
import PropTypes from 'prop-types';

function EditAlbum (props) {
    const { album, updateAlbum } = props;

    // setup listeners to close editing pane
    function closeEditPanelListener(e) {
        if(e.code === 'Escape') handleCloseClick();
    }
    document.addEventListener('keydown', closeEditPanelListener);
    function handleCloseClick(){
        const editAlbumPane = document.getElementsByClassName('edit-album-pane')[0];
        if (editAlbumPane) {
            editAlbumPane.className = 'edit-album-pane minimized';
        }
    }

    return (
            <>
                { album &&
                    <div className="edit-album-pane expanded">
                        <button className="close-btn" onClick={handleCloseClick}>x</button>
                        <div id="edit-album-card">
                            <h1>Edit Album</h1>
                            <div className="input-grouping">
                                <label htmlFor="name-input" className="album-label">Artist Name:</label>
                                <input name="name-input" type="text" value={ album.artist.name } onChange={(event) => updateAlbum(ALBUM_FIELDS.NAME, event, album)}/>
                            </div>

                            <div className="input-grouping">
                                <label htmlFor="title-input" className="album-label">Album Title:</label>
                                <input name="title-input" type="text" value={ album.album_title } onChange={(event) => updateAlbum(ALBUM_FIELDS.TITLE, event, album)}/>
                            </div>

                            <div className="input-grouping">
                                <label htmlFor="year-input" className="album-label">Year:</label>
                                <input name="year-input" type="text" value={ album.year } onChange={(event) => updateAlbum(ALBUM_FIELDS.YEAR, event, album)}/>
                            </div>

                            <div className="input-grouping">
                                <label htmlFor="condition-input" className="album-label">Record Condition:</label>
                                <input name="condition" type="text" value={ album.condition } onChange={(event) => updateAlbum(ALBUM_FIELDS.CONDITION, event, album)}/>
                            </div>
                        </div>
                    </div>
                }
            </>

    )
}

EditAlbum.propTypes = {
    album: PropTypes.object,
    updateAlbum: PropTypes.func
}

export default EditAlbum;