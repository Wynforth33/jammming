// Imports
import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList'; // <TrackList />

// Create <PlayList /> ['React'(Component)]
class Playlist extends React.Component {
  constructor(props){
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e){
    this.props.onNameChange(e.target.value);
  }

  handleSave(){
    this.props.onSave();
  }

  handleEnter = (e) => {
    if (e.key === 'Enter') {
      this.handleSave();
    }
  }

  render() {
    return (
      <div className="Playlist">
        <input
            onKeyPress={this.handleEnter}
            value={this.props.playlistName}
            onChange={this.handleNameChange}
             />
        <TrackList
            onRemove={this.props.onRemove}
            isRemoval={true}
            tracklist={this.props.playlistTracks} />
        <a onClick={this.handleSave} className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

// Exports
export default Playlist; // <PlayList />
